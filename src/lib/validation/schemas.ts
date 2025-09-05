import { z } from 'zod';
import { VALIDATION_PATTERNS, SWAP_CONFIG, APP_LIMITS } from '@/constants';

// Base validation schemas
export const hiveUsernameSchema = z
  .string()
  .min(APP_LIMITS.MIN_USERNAME_LENGTH, `Username must be at least ${APP_LIMITS.MIN_USERNAME_LENGTH} characters`)
  .max(APP_LIMITS.MAX_USERNAME_LENGTH, `Username must be at most ${APP_LIMITS.MAX_USERNAME_LENGTH} characters`)
  .regex(VALIDATION_PATTERNS.HIVE_USERNAME, 'Username can only contain lowercase letters, numbers, and hyphens')
  .refine((username) => !username.startsWith('-') && !username.endsWith('-'), {
    message: 'Username cannot start or end with a hyphen',
  })
  .refine((username) => !username.includes('--'), {
    message: 'Username cannot contain consecutive hyphens',
  });

export const tokenAmountSchema = z
  .string()
  .min(1, 'Amount is required')
  .regex(VALIDATION_PATTERNS.POSITIVE_NUMBER, 'Amount must be a positive number')
  .refine((amount) => {
    const num = parseFloat(amount);
    return num >= SWAP_CONFIG.MIN_TRADE_AMOUNT;
  }, `Minimum amount is ${SWAP_CONFIG.MIN_TRADE_AMOUNT}`)
  .refine((amount) => {
    const num = parseFloat(amount);
    return num <= SWAP_CONFIG.MAX_TRADE_AMOUNT;
  }, `Maximum amount is ${SWAP_CONFIG.MAX_TRADE_AMOUNT}`);

export const slippageSchema = z
  .number()
  .min(SWAP_CONFIG.MIN_SLIPPAGE, `Minimum slippage is ${SWAP_CONFIG.MIN_SLIPPAGE}%`)
  .max(SWAP_CONFIG.MAX_SLIPPAGE, `Maximum slippage is ${SWAP_CONFIG.MAX_SLIPPAGE}%`);

export const emailSchema = z
  .string()
  .regex(VALIDATION_PATTERNS.EMAIL, 'Please enter a valid email address');

export const urlSchema = z
  .string()
  .regex(VALIDATION_PATTERNS.URL, 'Please enter a valid URL');

// Token schemas
export const tokenSymbolSchema = z
  .string()
  .min(1, 'Token symbol is required')
  .max(20, 'Token symbol must be at most 20 characters')
  .regex(/^[A-Z0-9._]+$/, 'Token symbol can only contain uppercase letters, numbers, dots, and underscores');

export const tokenSchema = z.object({
  symbol: tokenSymbolSchema,
  name: z.string().min(1, 'Token name is required').max(100, 'Token name is too long'),
  precision: z.number().int().min(0).max(18, 'Precision must be between 0 and 18'),
  maxSupply: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER, 'Max supply must be a positive number'),
  supply: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER, 'Supply must be a positive number'),
  circulatingSupply: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER, 'Circulating supply must be a positive number'),
  issuer: hiveUsernameSchema,
  icon: urlSchema.optional(),
  url: urlSchema.optional(),
});

export const balanceSchema = z.object({
  account: hiveUsernameSchema,
  symbol: tokenSymbolSchema,
  balance: z.string().regex(VALIDATION_PATTERNS.NUMBER, 'Balance must be a valid number'),
  stake: z.string().regex(VALIDATION_PATTERNS.NUMBER, 'Stake must be a valid number').optional(),
  pendingUnstake: z.string().regex(VALIDATION_PATTERNS.NUMBER, 'Pending unstake must be a valid number').optional(),
  delegationsIn: z.string().regex(VALIDATION_PATTERNS.NUMBER, 'Delegations in must be a valid number').optional(),
  delegationsOut: z.string().regex(VALIDATION_PATTERNS.NUMBER, 'Delegations out must be a valid number').optional(),
});

// Form schemas
export const swapFormSchema = z
  .object({
    fromToken: tokenSymbolSchema,
    toToken: tokenSymbolSchema,
    fromAmount: tokenAmountSchema,
    slippage: slippageSchema,
  })
  .refine((data) => data.fromToken !== data.toToken, {
    message: 'From and to tokens must be different',
    path: ['toToken'],
  });

export const walletConnectSchema = z.object({
  username: hiveUsernameSchema,
  keyType: z.enum(['posting', 'active']).default('posting'),
});

export const transactionSchema = z.object({
  operations: z.array(z.any()).min(1, 'At least one operation is required'),
  keyType: z.enum(['posting', 'active']).default('posting'),
});

export const transferSchema = z.object({
  from: hiveUsernameSchema,
  to: hiveUsernameSchema,
  amount: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER, 'Amount must be a positive number'),
  memo: z.string().max(2048, 'Memo is too long').optional().default(''),
});

// Settings schemas
export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  slippage: slippageSchema.default(SWAP_CONFIG.DEFAULT_SLIPPAGE),
  autoConnect: z.boolean().default(true),
  compactMode: z.boolean().default(false),
  animationsEnabled: z.boolean().default(true),
  soundEnabled: z.boolean().default(false),
  currency: z.enum(['USD', 'EUR', 'GBP']).default('USD'),
  language: z.enum(['en', 'es', 'fr', 'de']).default('en'),
  notifications: z.object({
    transactions: z.boolean().default(true),
    priceAlerts: z.boolean().default(true),
    news: z.boolean().default(false),
  }).default({}),
  privacy: z.object({
    analytics: z.boolean().default(false),
    crashReports: z.boolean().default(true),
  }).default({}),
});

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  timestamp: z.number().optional(),
});

export const paginatedResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: z.array(dataSchema),
    pagination: z.object({
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
      total: z.number().int().nonnegative(),
      totalPages: z.number().int().positive(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
    error: z.string().optional(),
    message: z.string().optional(),
  });

// Market data schemas
export const marketDataSchema = z.object({
  symbol: tokenSymbolSchema,
  price: z.number().positive(),
  priceChange24h: z.number(),
  priceChangePercent24h: z.number(),
  volume24h: z.number().nonnegative(),
  high24h: z.number().positive(),
  low24h: z.number().positive(),
  marketCap: z.number().nonnegative().optional(),
  circulatingSupply: z.number().nonnegative().optional(),
  totalSupply: z.number().nonnegative().optional(),
  lastUpdated: z.number(),
});

export const priceHistorySchema = z.object({
  timestamp: z.number(),
  price: z.number().positive(),
  volume: z.number().nonnegative(),
});

// Swap quote schema
export const swapQuoteSchema = z.object({
  fromSymbol: tokenSymbolSchema,
  toSymbol: tokenSymbolSchema,
  fromAmount: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER),
  toAmount: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER),
  rate: z.number().positive(),
  priceImpact: z.number().min(0).max(100),
  minimumReceived: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER),
  route: z.array(tokenSymbolSchema).optional(),
  estimatedGas: z.string().regex(VALIDATION_PATTERNS.NUMBER).optional(),
  validUntil: z.number().optional(),
});

// Transaction history schema
export const transactionHistorySchema = z.object({
  id: z.string(),
  from: hiveUsernameSchema,
  to: hiveUsernameSchema,
  fromToken: tokenSymbolSchema,
  toToken: tokenSymbolSchema,
  fromAmount: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER),
  toAmount: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER),
  rate: z.string().regex(VALIDATION_PATTERNS.POSITIVE_NUMBER),
  timestamp: z.number(),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled']),
  txHash: z.string().optional(),
  blockNumber: z.number().int().positive().optional(),
  fee: z.string().regex(VALIDATION_PATTERNS.NUMBER).optional(),
  slippage: z.number().min(0).max(100).optional(),
});

// Export validation functions
export const validateSwapForm = (data: unknown) => {
  return swapFormSchema.safeParse(data);
};

export const validateHiveUsername = (username: string) => {
  return hiveUsernameSchema.safeParse(username);
};

export const validateTokenAmount = (amount: string) => {
  return tokenAmountSchema.safeParse(amount);
};

export const validateSlippage = (slippage: number) => {
  return slippageSchema.safeParse(slippage);
};

export const validateUserPreferences = (preferences: unknown) => {
  return userPreferencesSchema.safeParse(preferences);
};

export const validateApiResponse = (response: unknown) => {
  return apiResponseSchema.safeParse(response);
};

export const validateToken = (token: unknown) => {
  return tokenSchema.safeParse(token);
};

export const validateBalance = (balance: unknown) => {
  return balanceSchema.safeParse(balance);
};

// Custom validation helpers
export const validateMinimumAmount = (amount: string, minimum: number) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= minimum;
};

export const validateMaximumAmount = (amount: string, maximum: number) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num <= maximum;
};

export const validatePrecision = (amount: string, precision: number) => {
  const parts = amount.split('.');
  if (parts.length === 1) return true; // No decimal part
  return parts[1] !== undefined ? parts[1].length <= precision : true;
};

export const validateSufficientBalance = (amount: string, balance: string) => {
  const amountNum = parseFloat(amount);
  const balanceNum = parseFloat(balance);
  return !isNaN(amountNum) && !isNaN(balanceNum) && amountNum <= balanceNum;
};

// Type exports for TypeScript
export type SwapFormData = z.infer<typeof swapFormSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type TransactionData = z.infer<typeof transactionSchema>;
export type TokenData = z.infer<typeof tokenSchema>;
export type BalanceData = z.infer<typeof balanceSchema>;
export type SwapQuoteData = z.infer<typeof swapQuoteSchema>;
export type TransactionHistoryData = z.infer<typeof transactionHistorySchema>;
export type MarketData = z.infer<typeof marketDataSchema>;
export type PriceHistoryData = z.infer<typeof priceHistorySchema>;
export type ApiResponseData<T = any> = z.infer<typeof apiResponseSchema> & { data?: T };