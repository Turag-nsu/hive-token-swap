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
  id?: number;
  name: string;
  owner?: any;
  active?: {
    key_auths: [string, number][];
    account_auths: [string, number][];
  };
  posting?: {
    key_auths: [string, number][];
    account_auths: [string, number][];
  };
  memo_key?: string;
  json_metadata?: string;
  posting_json_metadata?: string;
  proxy?: string;
  last_owner_update?: string;
  last_account_update?: string;
  created?: string;
  mined?: boolean;
  recovery_account?: string;
  last_account_recovery?: string;
  reset_account?: string;
  comment_count?: number;
  lifetime_vote_count?: number;
  post_count?: number;
  can_vote?: boolean;
  voting_manabar?: { current_mana: string; last_update_time: number };
  downvote_manabar?: { current_mana: string; last_update_time: number };
  balance: string;
  savings_balance?: string;
  hbd_balance: string;
  hbd_savings_balance?: string;
  savings_withdraw_requests?: number;
  reward_hbd_balance?: string;
  reward_hive_balance?: string;
  reward_vesting_balance?: string;
  reward_vesting_hive?: string;
  vesting_shares: string;
  delegated_vesting_shares: string;
  received_vesting_shares: string;
  vesting_withdraw_rate?: string;
  next_vesting_withdrawal?: string;
  withdrawn?: number;
  to_withdraw?: number;
  withdraw_routes?: number;
  curation_rewards?: number;
  posting_rewards?: number;
  proxied_vsf_votes?: any[];
  witnesses_voted_for?: number;
  last_post?: string;
  last_root_post?: string;
  last_vote_time?: string;
  post_bandwidth?: number;
  pending_claimed_accounts?: number;
  reputation?: string;
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