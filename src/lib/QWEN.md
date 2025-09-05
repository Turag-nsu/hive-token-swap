# Lib Directory

This directory contains shared libraries, API clients, blockchain utilities, and core business logic functions used throughout the application.

## Overview

The lib directory provides the foundational layer of the application:
- **API Clients**: Structured API communication with external services
- **Blockchain Utils**: Hive blockchain interaction utilities
- **Data Validation**: Input validation and sanitization
- **Configuration**: Application configuration management
- **Business Logic**: Core application logic and calculations
- **Third-party Integrations**: External service integrations

## Library Structure

```
lib/
├── api/              # API client modules
├── blockchain/       # Hive blockchain utilities  
├── validation/       # Data validation schemas
├── config/           # Configuration management
├── auth/             # Authentication utilities
├── storage/          # Storage abstractions
├── notifications/    # Notification services
└── README.md         # This file
```

## Core Libraries

### API Clients (`api/`)

#### `hive-engine.ts`
Hive Engine API client for token operations:
```typescript
class HiveEngineAPI {
  private baseURL = 'https://engine-api.rishipanthee.com';
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        config.metadata = { startTime: Date.now() };
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        const duration = Date.now() - response.config.metadata.startTime;
        console.log(`API Request took ${duration}ms`);
        return response;
      },
      (error) => {
        this.handleAPIError(error);
        return Promise.reject(error);
      }
    );
  }

  async getTokens(): Promise<HiveEngineToken[]> {
    const response = await this.client.get('/tokens');
    return response.data;
  }

  async getTokenBalances(account: string): Promise<HiveEngineBalance[]> {
    const response = await this.client.get(`/accounts/${account}/balances`);
    return response.data;
  }

  async getMarketData(symbol: string): Promise<Market> {
    const response = await this.client.get(`/market/${symbol}`);
    return response.data;
  }

  async getSwapQuote(
    fromSymbol: string,
    toSymbol: string,
    amount: number
  ): Promise<SwapQuote> {
    const response = await this.client.post('/swap/quote', {
      fromSymbol,
      toSymbol,
      amount,
    });
    return response.data;
  }

  private handleAPIError(error: AxiosError) {
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (error.response?.status >= 500) {
      throw new Error('Service temporarily unavailable. Please try again.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    throw new Error(error.message || 'An unexpected error occurred.');
  }
}

export const hiveEngineAPI = new HiveEngineAPI();
```

#### `hive-rpc.ts`
Direct Hive blockchain RPC client:
```typescript
import { Client, PrivateKey, cryptoUtils } from '@hiveio/dhive';

class HiveRPCClient {
  private client: Client;
  private backupNodes: string[];

  constructor() {
    this.client = new Client([
      'https://anyx.io',
      'https://api.hive.blog',
      'https://hived.privex.io',
    ]);
    
    this.backupNodes = [
      'https://rpc.ecency.com',
      'https://techcoderx.com',
    ];
  }

  async getAccount(username: string): Promise<HiveAccount | null> {
    try {
      const accounts = await this.client.database.getAccounts([username]);
      return accounts[0] || null;
    } catch (error) {
      console.error('Error fetching account:', error);
      return null;
    }
  }

  async getDynamicGlobalProperties(): Promise<any> {
    return await this.client.database.getDynamicGlobalProperties();
  }

  async broadcastTransaction(
    operations: Operation[],
    privateKey?: PrivateKey
  ): Promise<any> {
    if (privateKey) {
      // Direct signing (for testing only)
      return await this.client.broadcast.sendOperations(operations, privateKey);
    }
    
    // Use HiveKeychain for production
    throw new Error('Use HiveKeychain for transaction signing in production');
  }

  async getTransactionHistory(
    account: string,
    from: number = -1,
    limit: number = 100
  ): Promise<any[]> {
    return await this.client.database.getAccountHistory(account, from, limit);
  }

  // Utility methods
  async getCurrentBlockNumber(): Promise<number> {
    const props = await this.getDynamicGlobalProperties();
    return props.head_block_number;
  }

  async estimateResourceCredits(operations: Operation[]): Promise<number> {
    // RC estimation logic
    const rcCost = operations.reduce((total, op) => {
      return total + this.getOperationRCCost(op);
    }, 0);
    
    return rcCost;
  }

  private getOperationRCCost(operation: Operation): number {
    const [opType] = operation;
    
    // Approximate RC costs for different operations
    const rcCosts: Record<string, number> = {
      'transfer': 2640000,
      'custom_json': 1320000,
      'transfer_to_vesting': 2640000,
      'vote': 1320000,
    };

    return rcCosts[opType] || 1320000;
  }
}

export const hiveRPC = new HiveRPCClient();
```

#### `price-feeds.ts`
External price feed aggregation:
```typescript
interface PriceFeed {
  source: string;
  symbol: string;
  price: number;
  timestamp: number;
  confidence: number;
}

class PriceFeedAggregator {
  private sources = [
    'coingecko',
    'coinmarketcap', 
    'binance',
    'hive-engine',
  ];

  async getPrice(symbol: string): Promise<number> {
    const feeds = await Promise.allSettled([
      this.getCoingeckoPrice(symbol),
      this.getBinancePrice(symbol),
      this.getHiveEnginePrice(symbol),
    ]);

    const validFeeds = feeds
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<PriceFeed>).value)
      .filter(feed => feed.confidence > 0.7);

    if (validFeeds.length === 0) {
      throw new Error(`No reliable price data found for ${symbol}`);
    }

    // Weighted average based on confidence
    const weightedSum = validFeeds.reduce(
      (sum, feed) => sum + feed.price * feed.confidence,
      0
    );
    const totalWeight = validFeeds.reduce(
      (sum, feed) => sum + feed.confidence,
      0
    );

    return weightedSum / totalWeight;
  }

  private async getCoingeckoPrice(symbol: string): Promise<PriceFeed> {
    const coinIds: Record<string, string> = {
      'HIVE': 'hive',
      'HBD': 'hive_dollar',
    };

    const coinId = coinIds[symbol];
    if (!coinId) throw new Error(`Unsupported symbol: ${symbol}`);

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
    );
    
    const data = await response.json();
    const price = data[coinId]?.usd;
    
    if (!price) throw new Error(`Price not found for ${symbol}`);

    return {
      source: 'coingecko',
      symbol,
      price,
      timestamp: Date.now(),
      confidence: 0.9,
    };
  }

  private async getBinancePrice(symbol: string): Promise<PriceFeed> {
    // Implement Binance API integration
    throw new Error('Binance integration not implemented');
  }

  private async getHiveEnginePrice(symbol: string): Promise<PriceFeed> {
    // Get price from Hive Engine market data
    const marketData = await hiveEngineAPI.getMarketData(symbol);
    
    return {
      source: 'hive-engine',
      symbol,
      price: parseFloat(marketData.lastPrice || '0'),
      timestamp: Date.now(),
      confidence: 0.8,
    };
  }
}

export const priceFeedAggregator = new PriceFeedAggregator();
```

### Blockchain Utilities (`blockchain/`)

#### `operations.ts`
Hive operation builders and validators:
```typescript
export class OperationBuilder {
  static transfer(
    from: string,
    to: string,
    amount: string,
    memo: string = ''
  ): Operation {
    return [
      'transfer',
      {
        from,
        to,
        amount,
        memo,
      },
    ];
  }

  static customJson(
    id: string,
    json: object,
    requiredPostingAuths: string[] = [],
    requiredAuths: string[] = []
  ): Operation {
    return [
      'custom_json',
      {
        required_auths: requiredAuths,
        required_posting_auths: requiredPostingAuths,
        id,
        json: JSON.stringify(json),
      },
    ];
  }

  static hiveEngineTransfer(
    from: string,
    to: string,
    symbol: string,
    quantity: string,
    memo: string = ''
  ): Operation {
    return this.customJson(
      'ssc-mainnet-hive',
      {
        contractName: 'tokens',
        contractAction: 'transfer',
        contractPayload: {
          symbol,
          to,
          quantity,
          memo,
        },
      },
      [from]
    );
  }

  static hiveEngineMarketBuy(
    account: string,
    symbol: string,
    quantity: string,
    price: string
  ): Operation {
    return this.customJson(
      'ssc-mainnet-hive',
      {
        contractName: 'market',
        contractAction: 'buy',
        contractPayload: {
          symbol,
          quantity,
          price,
        },
      },
      [account]
    );
  }

  static validateOperation(operation: Operation): boolean {
    const [opType, opData] = operation;
    
    switch (opType) {
      case 'transfer':
        return this.validateTransfer(opData);
      case 'custom_json':
        return this.validateCustomJson(opData);
      default:
        return false;
    }
  }

  private static validateTransfer(data: any): boolean {
    const required = ['from', 'to', 'amount', 'memo'];
    return required.every(field => field in data);
  }

  private static validateCustomJson(data: any): boolean {
    const required = ['required_auths', 'required_posting_auths', 'id', 'json'];
    return required.every(field => field in data);
  }
}
```

#### `keychain.ts`
HiveKeychain integration utilities:
```typescript
interface KeychainRequest {
  username: string;
  message?: string;
  method?: string;
  params?: any;
  type: 'Posting' | 'Active' | 'Memo';
  callback: (response: KeychainResponse) => void;
}

export class KeychainManager {
  private static instance: KeychainManager;
  private keychain: any;

  constructor() {
    this.keychain = (window as any).hive_keychain;
  }

  static getInstance(): KeychainManager {
    if (!KeychainManager.instance) {
      KeychainManager.instance = new KeychainManager();
    }
    return KeychainManager.instance;
  }

  isInstalled(): boolean {
    return !!(window as any).hive_keychain;
  }

  async requestHandshake(): Promise<string> {
    if (!this.isInstalled()) {
      throw new Error('HiveKeychain not installed');
    }

    return new Promise((resolve, reject) => {
      this.keychain.requestHandshake((response: KeychainResponse) => {
        if (response.success) {
          resolve(response.data.username);
        } else {
          reject(new Error(response.message || 'Handshake failed'));
        }
      });
    });
  }

  async requestBroadcast(
    username: string,
    operations: Operation[],
    keyType: 'Posting' | 'Active' = 'Posting'
  ): Promise<any> {
    if (!this.isInstalled()) {
      throw new Error('HiveKeychain not installed');
    }

    return new Promise((resolve, reject) => {
      this.keychain.requestBroadcast(
        username,
        operations,
        keyType,
        (response: KeychainResponse) => {
          if (response.success) {
            resolve(response.result);
          } else {
            reject(new Error(response.message || 'Transaction failed'));
          }
        }
      );
    });
  }

  async requestSignBuffer(
    username: string,
    message: string,
    keyType: 'Posting' | 'Active' = 'Posting'
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.keychain.requestSignBuffer(
        username,
        message,
        keyType,
        (response: KeychainResponse) => {
          if (response.success) {
            resolve(response.result);
          } else {
            reject(new Error(response.message || 'Signing failed'));
          }
        }
      );
    });
  }

  async requestEncodeMessage(
    username: string,
    recipient: string,
    message: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.keychain.requestEncodeMessage(
        username,
        recipient,
        message,
        'Memo',
        (response: KeychainResponse) => {
          if (response.success) {
            resolve(response.result);
          } else {
            reject(new Error(response.message || 'Encoding failed'));
          }
        }
      );
    });
  }
}

export const keychain = KeychainManager.getInstance();
```

### Configuration Management (`config/`)

#### `app-config.ts`
Application-wide configuration:
```typescript
interface AppConfig {
  api: {
    hiveEngine: string;
    hiveRpc: string[];
    priceFeeds: string[];
  };
  blockchain: {
    chainId: string;
    addressPrefix: string;
    blockInterval: number;
  };
  features: {
    enableAdvancedTrading: boolean;
    enablePriceAlerts: boolean;
    enableLiquidityMining: boolean;
  };
  ui: {
    defaultTheme: 'light' | 'dark';
    animationsEnabled: boolean;
    compactMode: boolean;
  };
  trading: {
    defaultSlippage: number;
    maxSlippage: number;
    minTradeAmount: number;
    maxTradeAmount: number;
  };
}

class ConfigManager {
  private config: AppConfig;
  private readonly defaultConfig: AppConfig = {
    api: {
      hiveEngine: 'https://engine-api.rishipanthee.com',
      hiveRpc: [
        'https://anyx.io',
        'https://api.hive.blog',
        'https://hived.privex.io',
      ],
      priceFeeds: [
        'https://api.coingecko.com/api/v3',
        'https://api.binance.com/api/v3',
      ],
    },
    blockchain: {
      chainId: 'beeab0de00000000000000000000000000000000000000000000000000000000',
      addressPrefix: 'STM',
      blockInterval: 3,
    },
    features: {
      enableAdvancedTrading: true,
      enablePriceAlerts: true,
      enableLiquidityMining: false,
    },
    ui: {
      defaultTheme: 'light',
      animationsEnabled: true,
      compactMode: false,
    },
    trading: {
      defaultSlippage: 0.5,
      maxSlippage: 10,
      minTradeAmount: 0.001,
      maxTradeAmount: 1000000,
    },
  };

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): AppConfig {
    try {
      const savedConfig = localStorage.getItem('app-config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        return { ...this.defaultConfig, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load saved config:', error);
    }
    
    return { ...this.defaultConfig };
  }

  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  set<K extends keyof AppConfig>(key: K, value: AppConfig[K]): void {
    this.config[key] = value;
    this.saveConfig();
  }

  update(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
  }

  reset(): void {
    this.config = { ...this.defaultConfig };
    this.saveConfig();
  }

  private saveConfig(): void {
    try {
      localStorage.setItem('app-config', JSON.stringify(this.config));
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  }
}

export const appConfig = new ConfigManager();
```

### Validation Schemas (`validation/`)

#### `schemas.ts`
Zod validation schemas:
```typescript
import { z } from 'zod';

// Base schemas
export const hiveUsernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(16, 'Username must be at most 16 characters')
  .regex(/^[a-z0-9-]+$/, 'Username can only contain lowercase letters, numbers, and hyphens')
  .refine((username) => !username.startsWith('-') && !username.endsWith('-'), {
    message: 'Username cannot start or end with a hyphen',
  })
  .refine((username) => !username.includes('--'), {
    message: 'Username cannot contain consecutive hyphens',
  });

export const tokenAmountSchema = z
  .string()
  .min(1, 'Amount is required')
  .refine((amount) => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  }, 'Amount must be a positive number')
  .refine((amount) => {
    const num = parseFloat(amount);
    return num <= 1000000;
  }, 'Amount is too large');

export const slippageSchema = z
  .number()
  .min(0.1, 'Minimum slippage is 0.1%')
  .max(10, 'Maximum slippage is 10%');

// Form schemas
export const swapFormSchema = z
  .object({
    fromToken: z.string().min(1, 'Please select a token to swap from'),
    toToken: z.string().min(1, 'Please select a token to swap to'),
    fromAmount: tokenAmountSchema,
    slippage: slippageSchema,
  })
  .refine((data) => data.fromToken !== data.toToken, {
    message: 'From and to tokens must be different',
    path: ['toToken'],
  });

export const walletConnectSchema = z.object({
  username: hiveUsernameSchema,
  keyType: z.enum(['posting', 'active']),
});

export const transactionSchema = z.object({
  operations: z.array(z.any()).min(1, 'At least one operation is required'),
  keyType: z.enum(['posting', 'active']).default('posting'),
});

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export const tokenSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  precision: z.number().int().min(0).max(18),
  maxSupply: z.string(),
  supply: z.string(),
  circulatingSupply: z.string(),
  issuer: z.string(),
  icon: z.string().url().optional(),
  url: z.string().url().optional(),
});

export const balanceSchema = z.object({
  account: hiveUsernameSchema,
  symbol: z.string(),
  balance: z.string(),
  stake: z.string().optional(),
  pendingUnstake: z.string().optional(),
  delegationsIn: z.string().optional(),
  delegationsOut: z.string().optional(),
});

// Validation utilities
export const validateSwapForm = (data: unknown) => {
  return swapFormSchema.safeParse(data);
};

export const validateHiveUsername = (username: string) => {
  return hiveUsernameSchema.safeParse(username);
};

export const validateTokenAmount = (amount: string) => {
  return tokenAmountSchema.safeParse(amount);
};
```

## Testing Libraries

### Test Utilities (`test-utils.ts`)
```typescript
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';

// Mock providers for testing
const AllTheProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Mock utilities
export const mockHiveKeychain = {
  requestHandshake: jest.fn(),
  requestBroadcast: jest.fn(),
  requestSignBuffer: jest.fn(),
};

export const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Test data factories
export const createMockToken = (overrides?: Partial<HiveEngineToken>): HiveEngineToken => ({
  symbol: 'TEST',
  name: 'Test Token',
  precision: 8,
  maxSupply: '1000000',
  supply: '500000',
  circulatingSupply: '400000',
  issuer: 'testuser',
  ...overrides,
});

export const createMockAccount = (overrides?: Partial<HiveAccount>): HiveAccount => ({
  name: 'testuser',
  balance: '100.000 HIVE',
  hbd_balance: '50.000 HBD',
  vesting_shares: '1000000.000000 VESTS',
  delegated_vesting_shares: '0.000000 VESTS',
  received_vesting_shares: '0.000000 VESTS',
  ...overrides,
});
```

## Performance Optimization

### Caching Strategy
- Implement multi-layer caching (memory, localStorage, IndexedDB)
- Use React Query for server state caching
- Implement cache invalidation strategies
- Monitor cache hit rates and performance

### Bundle Optimization
- Code splitting for large libraries
- Dynamic imports for optional features
- Tree shaking for unused code
- Compression and minification

### API Optimization
- Request deduplication
- Response compression
- Connection pooling
- Rate limiting and retry strategies

## Future Enhancements

Planned improvements:
- WebSocket integration for real-time updates
- Service Worker for offline functionality
- Enhanced error recovery mechanisms
- Performance monitoring and analytics
- Advanced caching strategies
- Modular plugin architecture