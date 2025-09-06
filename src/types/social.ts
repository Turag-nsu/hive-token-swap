// Types for the social media mini-app

export interface HivePost {
  id: string;
  author: string;
  permlink: string;
  title: string;
  body: string;
  created: string;
  last_update: string;
  depth: number;
  children: number;
  net_rshares: number;
  net_votes: number;
  pending_payout_value: string;
  total_payout_value: string;
  curator_payout_value: string;
  author_payout_value: string;
  url: string;
  category: string;
  json_metadata: string;
  active_votes: HiveVote[];
  author_reputation: number;
  stats?: {
    total_votes: number;
    flag_weight: number;
    gray: boolean;
    hide: boolean;
    is_grayed?: boolean;
  };
}

export interface HiveVote {
  voter: string;
  weight: number;
  rshares: number;
  percent: number;
  time: string;
  reputation?: number;
}

export interface HiveAccount {
  id: number;
  name: string;
  owner: any;
  active: any;
  posting: any;
  memo_key: string;
  json_metadata: string;
  posting_json_metadata: string;
  proxy: string;
  last_owner_update: string;
  last_account_update: string;
  created: string;
  mined: boolean;
  recovery_account: string;
  last_account_recovery: string;
  reset_account: string;
  comment_count: number;
  lifetime_vote_count: number;
  post_count: number;
  can_vote: boolean;
  voting_manabar: {
    current_mana: string;
    last_update_time: number;
  };
  downvote_manabar: {
    current_mana: string;
    last_update_time: number;
  };
  balance: string;
  savings_balance: string;
  hbd_balance: string;
  hbd_savings_balance: string;
  savings_withdraw_requests: number;
  reward_hbd_balance: string;
  reward_hive_balance: string;
  reward_vesting_balance: string;
  reward_vesting_hive: string;
  vesting_shares: string;
  delegated_vesting_shares: string;
  received_vesting_shares: string;
  vesting_withdraw_rate: string;
  next_vesting_withdrawal: string;
  withdrawn: number;
  to_withdraw: number;
  withdraw_routes: number;
  curation_rewards: number;
  posting_rewards: number;
  proxied_vsf_votes: any[];
  witnesses_voted_for: number;
  last_post: string;
  last_root_post: string;
  last_vote_time: string;
  post_bandwidth: number;
  pending_claimed_accounts: number;
  reputation: string;
}

export interface SocialFeedItem {
  id: string;
  author: string;
  permlink: string;
  title: string;
  body: string;
  created: string;
  category: string;
  upvotes: number;
  downvotes: number;
  payout: string;
  isUpvoted?: boolean;
  isDownvoted?: boolean;
  reputation: number;
  tags: string[];
  images?: string[];
  active_votes?: HiveVote[];
  children?: number; // Added comment count
}

export interface UserProfile {
  username: string;
  displayName?: string;
  about?: string;
  website?: string;
  location?: string;
  coverImage?: string;
  profileImage?: string;
  reputation: number;
  hiveBalance: string;
  hbdBalance: string;
  hp: string;
  votingPower: number;
  downvotePower: number;
  followersCount?: number;
  followingCount?: number;
  postCount: number;
  joinDate?: string; // Add join date field
}

export interface NewPost {
  title: string;
  body: string;
  tags: string[];
  beneficiaries?: Array<{
    account: string;
    weight: number;
  }>;
}

export interface CommentData {
  parent_author: string;
  parent_permlink: string;
  author: string;
  permlink: string;
  title: string;
  body: string;
  json_metadata: string;
}

export interface VoteData {
  voter: string;
  author: string;
  permlink: string;
  weight: number; // -10000 to 10000 (100% = 10000)
}

export interface SocialStats {
  totalPosts: number;
  totalAuthors: number;
  totalVotes: number;
  totalPayout: string;
  topAuthors: Array<{
    author: string;
    posts: number;
    totalPayout: string;
  }>;
  trending: Array<{
    title: string;
    author: string;
    permlink: string;
    payout: string;
    votes: number;
  }>;
}

export interface FeedFilters {
  tag?: string;
  author?: string;
  sortBy: 'created' | 'trending' | 'payout' | 'votes';
  timeframe?: '24h' | '7d' | '30d' | 'all';
  limit: number;
  startAuthor?: string;
  startPermlink?: string;
}

export interface NotificationItem {
  id: string;
  type: 'vote' | 'comment' | 'mention' | 'follow' | 'reblog';
  from: string;
  message: string;
  timestamp: string;
  read: boolean;
  url?: string;
  data?: any;
}