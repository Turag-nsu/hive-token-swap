import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers with proper decimal places and thousand separators
 */
export function formatNumber(
  value: number | string,
  options: {
    decimals?: number;
    compact?: boolean;
    currency?: string;
    percentage?: boolean;
  } = {}
): string {
  const {
    decimals = 6,
    compact = false,
    currency,
    percentage = false,
  } = options;

  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '0';

  if (percentage) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  }

  if (currency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: decimals,
    }).format(numValue);
  }

  if (compact && numValue >= 1000) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 2,
    }).format(numValue);
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(numValue);
}

/**
 * Format token amounts with appropriate precision
 */
export function formatTokenAmount(
  amount: string | number,
  precision: number = 6,
  symbol?: string
): string {
  const formattedAmount = formatNumber(amount, { decimals: precision });
  return symbol ? `${formattedAmount} ${symbol}` : formattedAmount;
}

/**
 * Parse and validate numeric input
 */
export function parseNumericInput(value: string): {
  isValid: boolean;
  numValue: number;
  error?: string;
} {
  if (!value || value.trim() === '') {
    return { isValid: false, numValue: 0, error: 'Value is required' };
  }

  // Remove any non-numeric characters except decimal point
  const cleanValue = value.replace(/[^0-9.]/g, '');
  
  // Check for multiple decimal points
  const decimalCount = (cleanValue.match(/\./g) || []).length;
  if (decimalCount > 1) {
    return { isValid: false, numValue: 0, error: 'Invalid number format' };
  }

  const numValue = parseFloat(cleanValue);
  
  if (isNaN(numValue)) {
    return { isValid: false, numValue: 0, error: 'Invalid number' };
  }

  if (numValue < 0) {
    return { isValid: false, numValue: 0, error: 'Value must be positive' };
  }

  return { isValid: true, numValue };
}

/**
 * Calculate slippage amount
 */
export function calculateSlippage(
  amount: string | number,
  slippagePercent: number
): number {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return numAmount * (slippagePercent / 100);
}

/**
 * Calculate minimum received amount after slippage
 */
export function calculateMinimumReceived(
  amount: string | number,
  slippagePercent: number
): number {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const slippageAmount = calculateSlippage(numAmount, slippagePercent);
  return Math.max(0, numAmount - slippageAmount);
}

/**
 * Calculate price impact percentage
 */
export function calculatePriceImpact(
  inputAmount: number,
  outputAmount: number,
  marketPrice: number
): number {
  if (marketPrice === 0 || inputAmount === 0) return 0;
  
  const expectedOutput = inputAmount * marketPrice;
  const priceImpact = ((expectedOutput - outputAmount) / expectedOutput) * 100;
  return Math.max(0, priceImpact);
}

/**
 * Debounce function for input handling
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for frequent operations
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generate unique ID for transactions and components
 */
export function generateId(prefix: string = 'id'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Truncate account name or address
 */
export function truncateAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Validate Hive username format
 */
export function validateHiveUsername(username: string): {
  isValid: boolean;
  error?: string;
} {
  if (!username || username.trim() === '') {
    return { isValid: false, error: 'Username is required' };
  }

  const cleanUsername = username.trim().toLowerCase();

  // Check length
  if (cleanUsername.length < 3 || cleanUsername.length > 16) {
    return { isValid: false, error: 'Username must be 3-16 characters long' };
  }

  // Check format
  const pattern = /^[a-z0-9-]+$/;
  if (!pattern.test(cleanUsername)) {
    return { 
      isValid: false, 
      error: 'Username can only contain lowercase letters, numbers, and hyphens' 
    };
  }

  // Check for invalid patterns
  if (cleanUsername.startsWith('-') || cleanUsername.endsWith('-')) {
    return { isValid: false, error: 'Username cannot start or end with a hyphen' };
  }

  if (cleanUsername.includes('--')) {
    return { isValid: false, error: 'Username cannot contain consecutive hyphens' };
  }

  return { isValid: true };
}

/**
 * Format time duration (e.g., "2 hours ago", "5 minutes ago")
 */
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  
  if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  
  if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  
  return seconds < 30 ? 'Just now' : `${seconds} seconds ago`;
}

/**
 * Format date to readable string
 */
export function formatDate(
  date: Date | number,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };

  const dateObj = typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj);
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Format percentage with + or - sign
 */
export function formatPercentageChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${formatNumber(change, { percentage: true })}`;
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if a value is a valid number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Sleep function for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry an async operation with exponential backoff
 */
export async function retry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      const delay = initialDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }
  
  throw lastError!;
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target } as T;
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || ({} as T[Extract<keyof T, string>]), source[key] as Partial<T[Extract<keyof T, string>]>);
    } else {
      result[key] = source[key] as T[Extract<keyof T, string>];
    }
  }
  
  return result;
}

/**
 * Get safe property from object with dot notation
 */
export function get<T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T {
  const keys = path.split('.');
  let result: any = obj;
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue as T;
    }
    result = result[key];
  }
  
  return result !== undefined ? result as T : (defaultValue as T);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';
      document.body.prepend(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      return true;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
}

/**
 * Check if running in browser environment
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (!isBrowser) return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get color from CSS variable
 */
export function getCSSVariable(name: string): string {
  if (!isBrowser) return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

/**
 * Set CSS variable
 */
export function setCSSVariable(name: string, value: string): void {
  if (!isBrowser) return;
  document.documentElement.style.setProperty(name, value);
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format time relative to now (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return new Date(timestamp).toLocaleDateString();
}

/**
 * Validate Hive account name
 */
export function validateHiveAccountName(name: string): {
  isValid: boolean;
  error?: string;
} {
  if (!name || name.length === 0) {
    return { isValid: false, error: 'Account name is required' };
  }

  if (name.length < 3 || name.length > 16) {
    return { isValid: false, error: 'Account name must be 3-16 characters' };
  }

  // Hive account names can only contain lowercase letters, numbers, and hyphens
  const validPattern = /^[a-z0-9-]+$/;
  if (!validPattern.test(name)) {
    return { 
      isValid: false, 
      error: 'Account name can only contain lowercase letters, numbers, and hyphens' 
    };
  }

  // Cannot start or end with hyphen
  if (name.startsWith('-') || name.endsWith('-')) {
    return { isValid: false, error: 'Account name cannot start or end with hyphen' };
  }

  // Cannot have consecutive hyphens
  if (name.includes('--')) {
    return { isValid: false, error: 'Account name cannot have consecutive hyphens' };
  }

  return { isValid: true };
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(
  json: string,
  fallback: T
): T {
  try {
    const parsed = JSON.parse(json);
    return typeof parsed === 'object' && parsed !== null ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
