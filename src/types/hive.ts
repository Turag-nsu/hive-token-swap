// Hive blockchain types and interfaces

export interface HiveKeychain {
  requestSignBuffer: (
    account: string,
    message: string,
    type: 'Posting' | 'Active',
    callback: (response: KeychainResponse) => void
  ) => void;
  requestBroadcast: (
    account: string,
    operations: Operation[],
    type: 'Posting' | 'Active',
    callback: (response: KeychainResponse) => void
  ) => void;
  requestSignedCall: (
    account: string,
    method: string,
    params: Record<string, unknown>,
    type: 'Posting' | 'Active',
    callback: (response: KeychainResponse) => void
  ) => void;
  requestHandshake: (callback: (response: KeychainResponse) => void) => void;
}

export interface KeychainResponse {
  success: boolean;
  message?: string;
  error?: string;
  result?: unknown;
  data?: unknown;
  publicKey?: string;
  username?: string;
}

export interface HiveAccount {
  name: string;
  balance: string;
  hbd_balance: string;
  vesting_shares: string;
  delegated_vesting_shares: string;
  received_vesting_shares: string;
  posting?: {
    key_auths: [string, number][];
    account_auths: [string, number][];
  };
  active?: {
    key_auths: [string, number][];
    account_auths: [string, number][];
  };
}

export interface HiveEngineToken {
  symbol: string;
  name: string;
  precision: number;
  maxSupply: string;
  supply: string;
  circulatingSupply: string;
  issuer: string;
  icon?: string;
  url?: string;
}

export interface HiveEngineBalance {
  account: string;
  symbol: string;
  balance: string;
  stake?: string;
  pendingUnstake?: string;
  delegationsIn?: string;
  delegationsOut?: string;
}

export interface SwapTransaction {
  id: string;
  from: string;
  to: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  rate: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  txHash?: string;
  blockNumber?: number;
}

export interface TokenPair {
  baseToken: HiveEngineToken;
  quoteToken: HiveEngineToken;
  liquidity?: string;
  volume24h?: string;
  price?: string;
  priceChange24h?: string;
}

export interface Market {
  symbol: string;
  precision: number;
  minTradeQuantity: string;
  maxTradeQuantity: string;
  tickSize: string;
}

export interface Order {
  _id: string;
  txId: string;
  timestamp: number;
  account: string;
  type: 'buy' | 'sell';
  quantity: string;
  price: string;
  tokensLocked: string;
  expiration?: number;
}

export interface Trade {
  _id: string;
  type: 'buy' | 'sell';
  buyer: string;
  seller: string;
  symbol: string;
  quantity: string;
  price: string;
  timestamp: number;
  volume: string;
}

export type Operation = 
  | ['transfer', TransferOperation]
  | ['custom_json', CustomJsonOperation]
  | ['transfer_to_vesting', TransferToVestingOperation]
  | ['withdraw_vesting', WithdrawVestingOperation]
  | ['vote', VoteOperation];

export interface VoteOperation {
  voter: string;
  author: string;
  permlink: string;
  weight: number;
}

export interface TransferOperation {
  from: string;
  to: string;
  amount: string;
  memo: string;
}

export interface CustomJsonOperation {
  required_auths: string[];
  required_posting_auths: string[];
  id: string;
  json: string;
}

export interface TransferToVestingOperation {
  from: string;
  to: string;
  amount: string;
}

export interface WithdrawVestingOperation {
  account: string;
  vesting_shares: string;
}

// Global window extension for HiveKeychain and HiveSigner
declare global {
  interface Window {
    hive_keychain?: HiveKeychain;
    hivesigner?: any;
  }
}