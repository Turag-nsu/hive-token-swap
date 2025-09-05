import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_ENDPOINTS, NETWORK_CONFIG } from '@/constants';
import type { 
  HiveEngineToken, 
  HiveEngineBalance, 
  Market, 
  Order, 
  Trade,
  ApiResponse 
} from '@/types';

interface SwapQuote {
  fromSymbol: string;
  toSymbol: string;
  fromAmount: string;
  toAmount: string;
  rate: number;
  priceImpact: number;
  minimumReceived: string;
  route?: string[];
  estimatedGas?: string;
}

class HiveEngineAPI {
  private client: AxiosInstance;
  private baseURL = API_ENDPOINTS.HIVE_ENGINE;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: NETWORK_CONFIG.REQUEST_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor for logging and timing
    this.client.interceptors.request.use(
      (config) => {
        (config as any).metadata = { startTime: Date.now() };
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling and logging
    this.client.interceptors.response.use(
      (response) => {
        const duration = Date.now() - (response.config as any).metadata.startTime;
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
        return response;
      },
      (error: AxiosError) => {
        const duration = Date.now() - ((error.config as any)?.metadata?.startTime || 0);
        console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} (${duration}ms)`, error.message);
        return Promise.reject(this.handleAPIError(error));
      }
    );
  }

  private handleAPIError(error: AxiosError): Error {
    if (error.code === 'ECONNABORTED') {
      return new Error('Request timeout. Please check your connection.');
    }

    if (error.response?.status === 429) {
      return new Error('Rate limit exceeded. Please try again later.');
    }

    if (error.response?.status === 500) {
      return new Error('Service temporarily unavailable. Please try again.');
    }

    if (error.response?.status === 404) {
      return new Error('Resource not found.');
    }

    if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
      // Safely access error.response.data
      const message = error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data 
        ? (error.response.data as { message?: string }).message 
        : null;
      return new Error(message || 'Invalid request.');
    }

    return new Error(error.message || 'An unexpected error occurred.');
  }

  // Token operations
  async getTokens(): Promise<HiveEngineToken[]> {
    try {
      const response = await this.client.get('/tokens');
      return response.data as HiveEngineToken[];
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
      throw error;
    }
  }

  async getToken(symbol: string): Promise<HiveEngineToken | null> {
    try {
      const response = await this.client.get(`/tokens/${symbol}`);
      return response.data as HiveEngineToken;
    } catch (error) {
      console.error(`Failed to fetch token ${symbol}:`, error);
      return null;
    }
  }

  async getTokenBalances(account: string): Promise<HiveEngineBalance[]> {
    try {
      const response = await this.client.get(`/accounts/${account}/balances`);
      return response.data as HiveEngineBalance[];
    } catch (error) {
      console.error(`Failed to fetch balances for ${account}:`, error);
      throw error;
    }
  }

  async getTokenBalance(account: string, symbol: string): Promise<HiveEngineBalance | null> {
    try {
      const response = await this.client.get(`/accounts/${account}/balances/${symbol}`);
      return response.data as HiveEngineBalance;
    } catch (error) {
      console.error(`Failed to fetch ${symbol} balance for ${account}:`, error);
      return null;
    }
  }

  // Market operations
  async getMarkets(): Promise<Market[]> {
    try {
      const response = await this.client.get('/markets');
      return response.data as Market[];
    } catch (error) {
      console.error('Failed to fetch markets:', error);
      throw error;
    }
  }

  async getMarket(symbol: string): Promise<Market | null> {
    try {
      const response = await this.client.get(`/markets/${symbol}`);
      return response.data as Market;
    } catch (error) {
      console.error(`Failed to fetch market for ${symbol}:`, error);
      return null;
    }
  }

  async getOrderBook(symbol: string): Promise<{ buyBook: Order[]; sellBook: Order[] }> {
    try {
      const response = await this.client.get(`/markets/${symbol}/orderbook`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch order book for ${symbol}:`, error);
      throw error;
    }
  }

  async getTradeHistory(symbol: string, limit: number = 100): Promise<Trade[]> {
    try {
      const response = await this.client.get(`/markets/${symbol}/trades`, {
        params: { limit }
      });
      return response.data as Trade[];
    } catch (error) {
      console.error(`Failed to fetch trade history for ${symbol}:`, error);
      throw error;
    }
  }

  // Swap operations
  async getSwapQuote(
    fromSymbol: string,
    toSymbol: string,
    amount: string
  ): Promise<SwapQuote> {
    try {
      const response = await this.client.post('/swap/quote', {
        fromSymbol,
        toSymbol,
        amount,
      });

      const quote = response.data;
      
      // Calculate additional metrics
      const fromAmount = parseFloat(amount);
      const toAmount = parseFloat(quote.toAmount);
      const rate = toAmount / fromAmount;
      
      return {
        fromSymbol,
        toSymbol,
        fromAmount: amount,
        toAmount: quote.toAmount,
        rate,
        priceImpact: quote.priceImpact || 0,
        minimumReceived: quote.minimumReceived || quote.toAmount,
        route: quote.route,
        estimatedGas: quote.estimatedGas,
      };
    } catch (error) {
      console.error('Failed to get swap quote:', error);
      throw error;
    }
  }

  async getSwapRoute(
    fromSymbol: string,
    toSymbol: string
  ): Promise<string[]> {
    try {
      const response = await this.client.get('/swap/route', {
        params: { from: fromSymbol, to: toSymbol }
      });
      return response.data.route || [fromSymbol, toSymbol];
    } catch (error) {
      console.error('Failed to get swap route:', error);
      return [fromSymbol, toSymbol]; // Direct route fallback
    }
  }

  // Price and statistics
  async getTokenPrices(symbols?: string[]): Promise<Record<string, number>> {
    try {
      const params = symbols ? { symbols: symbols.join(',') } : {};
      const response = await this.client.get('/prices', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch token prices:', error);
      throw error;
    }
  }

  async getMarketStats(symbol: string): Promise<any> {
    try {
      const response = await this.client.get(`/markets/${symbol}/stats`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch market stats for ${symbol}:`, error);
      throw error;
    }
  }

  // Utility methods
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.data.status === 'ok';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // Get API status and version
  async getStatus(): Promise<{ version: string; status: string; uptime: number }> {
    try {
      const response = await this.client.get('/status');
      return response.data;
    } catch (error) {
      console.error('Failed to get API status:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
export const hiveEngineAPI = new HiveEngineAPI();
export type { SwapQuote };