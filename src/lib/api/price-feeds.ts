import axios from 'axios';
import { API_ENDPOINTS, NETWORK_CONFIG } from '@/constants';
import { retry } from '@/utils';

interface PriceFeed {
  source: string;
  symbol: string;
  price: number;
  timestamp: number;
  confidence: number;
  volume24h?: number;
  marketCap?: number;
  priceChange24h?: number;
}

interface CoingeckoResponse {
  [key: string]: {
    usd: number;
    usd_24h_change?: number;
    usd_market_cap?: number;
    usd_24h_vol?: number;
  };
}

interface BinanceTickerResponse {
  symbol: string;
  price: string;
  priceChange: string;
  priceChangePercent: string;
  volume: string;
  quoteVolume: string;
}

class PriceFeedAggregator {
  

  private readonly coinGeckoIds: Record<string, string> = {
    'HIVE': 'hive',
    'HBD': 'hive_dollar',
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'BNB': 'binancecoin',
  };

  private readonly binanceSymbols: Record<string, string> = {
    'HIVE': 'HIVEUSDT',
    'BTC': 'BTCUSDT',
    'ETH': 'ETHUSDT',
    'BNB': 'BNBUSDT',
  };

  async getPrice(symbol: string): Promise<number> {
    const feeds = await this.getAllPriceFeeds(symbol);
    
    if (feeds.length === 0) {
      throw new Error(`No price data found for ${symbol}`);
    }

    // Calculate weighted average based on confidence
    const weightedSum = feeds.reduce(
      (sum, feed) => sum + feed.price * feed.confidence,
      0
    );
    const totalWeight = feeds.reduce(
      (sum, feed) => sum + feed.confidence,
      0
    );

    return weightedSum / totalWeight;
  }

  async getPrices(symbols: string[]): Promise<Record<string, number>> {
    const results: Record<string, number> = {};
    
    // Process in batches to avoid overwhelming APIs
    const batchSize = 10;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      const promises = batch.map(async (symbol) => {
        try {
          const price = await this.getPrice(symbol);
          return { symbol, price };
        } catch (error) {
          console.warn(`Failed to get price for ${symbol}:`, error);
          return { symbol, price: 0 };
        }
      });
      
      const batchResults = await Promise.all(promises);
      batchResults.forEach(({ symbol, price }) => {
        results[symbol] = price;
      });
    }
    
    return results;
  }

  async getAllPriceFeeds(symbol: string): Promise<PriceFeed[]> {
    const promises = [
      this.getCoingeckoPrice(symbol),
      this.getBinancePrice(symbol),
      this.getHiveEnginePrice(symbol),
    ];

    const results = await Promise.allSettled(promises);
    
    return results
      .filter((result): result is PromiseFulfilledResult<PriceFeed> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value)
      .filter(feed => feed.confidence > 0.5); // Only use feeds with decent confidence
  }

  private async getCoingeckoPrice(symbol: string): Promise<PriceFeed | null> {
    try {
      const coinId = this.coinGeckoIds[symbol];
      if (!coinId) {
        return null;
      }

      const response = await retry(
        () => axios.get(
          `${API_ENDPOINTS.COINGECKO}/simple/price`,
          {
            params: {
              ids: coinId,
              vs_currencies: 'usd',
              include_24hr_change: 'true',
              include_market_cap: 'true',
              include_24hr_vol: 'true',
            },
            timeout: NETWORK_CONFIG.REQUEST_TIMEOUT,
          }
        ),
        NETWORK_CONFIG.MAX_RETRIES,
        NETWORK_CONFIG.RETRY_DELAY
      );

      const data: CoingeckoResponse = response.data;
      const coinData = data[coinId];

      if (!coinData || !coinData.usd) {
        return null;
      }

      return {
        source: 'coingecko',
        symbol,
        price: coinData.usd,
        timestamp: Date.now(),
        confidence: 0.9, // High confidence for CoinGecko
        ...(coinData.usd_24h_vol !== undefined && { volume24h: coinData.usd_24h_vol }),
        ...(coinData.usd_market_cap !== undefined && { marketCap: coinData.usd_market_cap }),
        ...(coinData.usd_24h_change !== undefined && { priceChange24h: coinData.usd_24h_change }),
      };
    } catch (error) {
      console.warn(`CoinGecko price fetch failed for ${symbol}:`, error);
      return null;
    }
  }

  private async getBinancePrice(symbol: string): Promise<PriceFeed | null> {
    try {
      const binanceSymbol = this.binanceSymbols[symbol];
      if (!binanceSymbol) {
        return null;
      }

      const response = await retry(
        () => axios.get(
          `https://api.binance.com/api/v3/ticker/24hr`,
          {
            params: { symbol: binanceSymbol },
            timeout: NETWORK_CONFIG.REQUEST_TIMEOUT,
          }
        ),
        NETWORK_CONFIG.MAX_RETRIES,
        NETWORK_CONFIG.RETRY_DELAY
      );

      const data: BinanceTickerResponse = response.data;

      if (!data || !data.price) {
        return null;
      }

      return {
        source: 'binance',
        symbol,
        price: parseFloat(data.price),
        timestamp: Date.now(),
        confidence: 0.85, // Good confidence for Binance
        ...(data.quoteVolume && { volume24h: parseFloat(data.quoteVolume) }),
        ...(data.priceChangePercent && { priceChange24h: parseFloat(data.priceChangePercent) }),
      };
    } catch (error) {
      console.warn(`Binance price fetch failed for ${symbol}:`, error);
      return null;
    }
  }

  private async getHiveEnginePrice(symbol: string): Promise<PriceFeed | null> {
    try {
      // This would integrate with your Hive Engine API
      // For now, returning null as the implementation depends on the specific API
      return null;
    } catch (error) {
      console.warn(`Hive Engine price fetch failed for ${symbol}:`, error);
      return null;
    }
  }

  async getHistoricalPrices(
    symbol: string,
    days: number = 7
  ): Promise<{ timestamp: number; price: number }[]> {
    try {
      const coinId = this.coinGeckoIds[symbol];
      if (!coinId) {
        throw new Error(`No CoinGecko ID found for ${symbol}`);
      }

      const response = await retry(
        () => axios.get(
          `${API_ENDPOINTS.COINGECKO}/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days,
              interval: days <= 1 ? 'hourly' : 'daily',
            },
            timeout: NETWORK_CONFIG.REQUEST_TIMEOUT,
          }
        ),
        NETWORK_CONFIG.MAX_RETRIES,
        NETWORK_CONFIG.RETRY_DELAY
      );

      const prices = response.data.prices || [];
      
      return prices.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        price,
      }));
    } catch (error) {
      console.error(`Failed to fetch historical prices for ${symbol}:`, error);
      return [];
    }
  }

  async getMarketData(symbol: string): Promise<{
    price: number;
    marketCap?: number;
    volume24h?: number;
    priceChange24h?: number;
    high24h?: number;
    low24h?: number;
    circulatingSupply?: number;
    totalSupply?: number;
  } | null> {
    try {
      const coinId = this.coinGeckoIds[symbol];
      if (!coinId) {
        return null;
      }

      const response = await retry(
        () => axios.get(
          `${API_ENDPOINTS.COINGECKO}/coins/${coinId}`,
          {
            params: {
              localization: 'false',
              tickers: 'false',
              market_data: 'true',
              community_data: 'false',
              developer_data: 'false',
              sparkline: 'false',
            },
            timeout: NETWORK_CONFIG.REQUEST_TIMEOUT,
          }
        ),
        NETWORK_CONFIG.MAX_RETRIES,
        NETWORK_CONFIG.RETRY_DELAY
      );

      const data = response.data;
      const marketData = data.market_data;

      if (!marketData) {
        return null;
      }

      return {
        price: marketData.current_price?.usd || 0,
        marketCap: marketData.market_cap?.usd,
        volume24h: marketData.total_volume?.usd,
        priceChange24h: marketData.price_change_percentage_24h,
        high24h: marketData.high_24h?.usd,
        low24h: marketData.low_24h?.usd,
        circulatingSupply: marketData.circulating_supply,
        totalSupply: marketData.total_supply,
      };
    } catch (error) {
      console.error(`Failed to fetch market data for ${symbol}:`, error);
      return null;
    }
  }

  async healthCheck(): Promise<{ source: string; healthy: boolean; latency: number }[]> {
    const sources = [
      { name: 'coingecko', url: `${API_ENDPOINTS.COINGECKO}/ping` },
      { name: 'binance', url: 'https://api.binance.com/api/v3/ping' },
    ];

    const results = await Promise.allSettled(
      sources.map(async (source) => {
        const startTime = Date.now();
        try {
          await axios.get(source.url, { timeout: 5000 });
          const latency = Date.now() - startTime;
          return { source: source.name, healthy: true, latency };
        } catch (error) {
          console.error(`Health check failed for source ${source.name}:`, error);
          const latency = Date.now() - startTime;
          return { source: source.name, healthy: false, latency };
        }
      })
    );

    return results.map((result) => 
      result.status === 'fulfilled' 
        ? result.value 
        : { source: 'unknown', healthy: false, latency: 0 }
    );
  }

  // Cache management
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly cacheTimeout = 30000; // 30 seconds

  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getCachedPrice(symbol: string): Promise<number> {
    const cacheKey = `price:${symbol}`;
    const cached = this.getCached<number>(cacheKey);
    
    if (cached !== null) {
      return cached;
    }
    
    const price = await this.getPrice(symbol);
    this.setCache(cacheKey, price);
    
    return price;
  }
}

// Create and export singleton instance
export const priceFeedAggregator = new PriceFeedAggregator();
export type { PriceFeed };