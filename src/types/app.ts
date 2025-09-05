// Application-specific types and interfaces

import { HiveAccount, HiveEngineToken, HiveEngineBalance, SwapTransaction } from './hive';

export interface User {
  username: string;
  account: HiveAccount;
  balances: HiveEngineBalance[];
  isConnected: boolean;
  avatar?: string;
  reputation?: number;
}

export interface WalletState {
  user: User | null;
  isConnecting: boolean;
  error: string | null;
  isKeychainInstalled: boolean;
}

export interface SwapState {
  fromToken: HiveEngineToken | null;
  toToken: HiveEngineToken | null;
  fromAmount: string;
  toAmount: string;
  slippage: number;
  isSwapping: boolean;
  error: string | null;
  estimatedGas?: string;
  priceImpact?: number;
  minimumReceived?: string;
  rate?: number;
}

export interface SwapFormData {
  fromTokenSymbol: string;
  toTokenSymbol: string;
  fromAmount: string;
  slippage: number;
}

export interface TokenSelectProps {
  selectedToken: HiveEngineToken | null;
  onTokenSelect: (token: HiveEngineToken) => void;
  excludeToken?: string;
  label: string;
}

export interface SwapPreviewProps {
  fromToken: HiveEngineToken;
  toToken: HiveEngineToken;
  fromAmount: string;
  toAmount: string;
  rate: number;
  priceImpact: number;
  minimumReceived: string;
  slippage: number;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export interface TransactionHistoryProps {
  transactions: SwapTransaction[];
  isLoading: boolean;
  onRefresh: () => void;
}

export interface PriceDisplayProps {
  fromToken: HiveEngineToken;
  toToken: HiveEngineToken;
  rate: number;
  inverse?: boolean;
  onToggle?: () => void;
}

export interface SlippageSettingsProps {
  slippage: number;
  onSlippageChange: (slippage: number) => void;
}

export interface WalletConnectButtonProps {
  onConnect: () => void;
  isConnecting: boolean;
  className?: string;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface QueryOptions {
  enabled?: boolean;
  refetchInterval?: number;
  staleTime?: number;
  cacheTime?: number;
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | undefined;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  placeholder?: string;
  rules?: ValidationRule;
  options?: { label: string; value: string }[];
}

export interface FormError {
  field: string;
  message: string;
}

// Component prop base types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonVariant {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Export common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};