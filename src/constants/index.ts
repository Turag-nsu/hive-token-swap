// Application constants and configuration

// API Endpoints
export const API_ENDPOINTS = {
  HIVE_ENGINE: 'https://engine-api.rishipanthee.com',
  HIVE_RPC: 'https://anyx.io',
  HIVE_BACKUP_RPC: 'https://api.hive.blog',
  COINGECKO: 'https://api.coingecko.com/api/v3',
} as const;

// Blockchain Configuration
export const HIVE_CONFIG = {
  CHAIN_ID: 'beeab0de00000000000000000000000000000000000000000000000000000000',
  ADDRESS_PREFIX: 'STM',
  CURRENCY_PRECISION: 3,
  HBD_PRECISION: 3,
  VESTS_PRECISION: 6,
  BLOCK_INTERVAL: 3, // seconds
} as const;

// HiveKeychain Configuration
export const KEYCHAIN_CONFIG = {
  REQUEST_ID: 'hive-token-swap',
  EXTENSION_ID: 'jcacnejopjdphbnjgfaaobbfafkihpep',
  DOWNLOAD_URL: 'https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep',
} as const;

// HiveSigner Configuration
export { HIVESIGNER_CONFIG } from './hivesigner';

// Default Token List
export const DEFAULT_TOKENS = [
  {
    symbol: 'HIVE',
    name: 'Hive',
    precision: 3,
    isNative: true,
    icon: '/tokens/hive.svg',
    coingeckoId: 'hive',
  },
  {
    symbol: 'HBD',
    name: 'Hive Backed Dollar',
    precision: 3,
    isNative: true,
    icon: '/tokens/hbd.svg',
    coingeckoId: 'hive_dollar',
  },
  {
    symbol: 'SWAP.HIVE',
    name: 'Hive (Wrapped)',
    precision: 8,
    isNative: false,
    icon: '/tokens/swap-hive.svg',
  },
  {
    symbol: 'LEO',
    name: 'LeoFinance',
    precision: 8,
    isNative: false,
    icon: '/tokens/leo.svg',
  },
  {
    symbol: 'POB',
    name: 'Proof of Brain',
    precision: 8,
    isNative: false,
    icon: '/tokens/pob.svg',
  },
] as const;

// Swap Configuration
export const SWAP_CONFIG = {
  DEFAULT_SLIPPAGE: 0.5, // 0.5%
  MAX_SLIPPAGE: 10, // 10%
  MIN_SLIPPAGE: 0.1, // 0.1%
  SLIPPAGE_OPTIONS: [0.1, 0.5, 1.0, 2.0],
  MIN_TRADE_AMOUNT: 0.001,
  MAX_TRADE_AMOUNT: 1000000,
  PRICE_UPDATE_INTERVAL: 10000, // 10 seconds
  TRANSACTION_TIMEOUT: 30000, // 30 seconds
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  THROTTLE_LIMIT: 1000,
  TOAST_DURATION: 5000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
  },
  GRADIENTS: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    dark: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
  },
  SHADOWS: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
} as const;

// Animation Presets
export const ANIMATIONS = {
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  SLIDE_UP: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  SLIDE_IN_RIGHT: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 },
  },
  SCALE_IN: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  },
  BOUNCE: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_FOUND: 'HiveKeychain wallet not found. Please install the extension.',
  WALLET_LOCKED: 'Wallet is locked. Please unlock your HiveKeychain.',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction.',
  INVALID_AMOUNT: 'Please enter a valid amount.',
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  USER_REJECTED: 'Transaction was rejected by user.',
  SLIPPAGE_TOO_HIGH: 'Slippage tolerance is too high.',
  AMOUNT_TOO_SMALL: 'Amount is too small for swap.',
  AMOUNT_TOO_LARGE: 'Amount is too large for swap.',
  TOKEN_NOT_FOUND: 'Token not found.',
  PAIR_NOT_FOUND: 'Trading pair not found.',
  MARKET_CLOSED: 'Market is currently closed.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully!',
  TRANSACTION_SUBMITTED: 'Transaction submitted successfully!',
  TRANSACTION_CONFIRMED: 'Transaction confirmed!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'hive-swap-preferences',
  TRANSACTION_HISTORY: 'hive-swap-transactions',
  WALLET_CONNECTION: 'hive-swap-wallet',
  WALLET_USERNAME: 'hive-swap-wallet-username',
  THEME: 'hive-swap-theme',
  SLIPPAGE: 'hive-swap-slippage',
} as const;

// Query Keys for React Query
export const QUERY_KEYS = {
  USER_BALANCE: ['user', 'balance'],
  TOKEN_LIST: ['tokens'],
  TOKEN_PRICES: ['prices'],
  MARKET_DATA: ['market'],
  TRANSACTION_HISTORY: ['transactions'],
  SWAP_RATE: ['swap', 'rate'],
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  SWAP: '/swap',
  PORTFOLIO: '/portfolio',
  HISTORY: '/history',
  SETTINGS: '/settings',
  ABOUT: '/about',
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Breakpoints (must match Tailwind config)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Z-Index Levels
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1010,
  BANNER: 1020,
  OVERLAY: 1030,
  MODAL: 1040,
  POPOVER: 1050,
  TOOLTIP: 1060,
  TOAST: 1070,
} as const;

// Network Configuration
export const NETWORK_CONFIG = {
  REQUEST_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  CACHE_TIME: 300000, // 5 minutes
  STALE_TIME: 30000, // 30 seconds
} as const;

// Validation Patterns
export const VALIDATION_PATTERNS = {
  HIVE_USERNAME: /^[a-z0-9-]{3,16}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/.*)?$/,
  NUMBER: /^[0-9]+(\.[0-9]+)?$/,
  POSITIVE_NUMBER: /^[1-9][0-9]*(\.[0-9]+)?$/,
} as const;

// Token Categories for filtering
export const TOKEN_CATEGORIES = {
  ALL: 'all',
  NATIVE: 'native',
  WRAPPED: 'wrapped',
  GAMING: 'gaming',
  DEFI: 'defi',
  SOCIAL: 'social',
  UTILITY: 'utility',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ADVANCED_TRADING: true,
  PRICE_CHARTS: true,
  TRANSACTION_HISTORY: true,
  NOTIFICATION_SYSTEM: true,
  DARK_MODE: true,
  MOBILE_APP_PROMOTION: false,
  BETA_FEATURES: false,
} as const;

// Application Limits
export const APP_LIMITS = {
  MAX_RECENT_TOKENS: 10,
  MAX_FAVORITE_TOKENS: 50,
  MAX_TRANSACTION_HISTORY: 1000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_USERNAME_LENGTH: 16,
  MIN_USERNAME_LENGTH: 3,
} as const;

// Status Colors for UI feedback
export const STATUS_COLORS = {
  SUCCESS: '#10b981',
  ERROR: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#3b82f6',
  PENDING: '#6b7280',
} as const;