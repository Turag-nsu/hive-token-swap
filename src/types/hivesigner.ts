// HiveSigner types and interfaces

export interface HiveSignerClientConfig {
  app: string;
  callbackURL: string;
  scope?: string[];
  accessToken?: string;
}

export interface HiveSignerResponse {
  success: boolean;
  message?: string;
  error?: string;
  result?: any;
  data?: any;
}

export interface HiveSignerUser {
  user: string;
  _id: string;
  name: string;
  scope: string[];
  user_metadata: {
    account: string;
    name: string;
    about: string;
    profile_image: string;
    cover_image: string;
    location: string;
    website: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
    discord: string;
    tiktok: string;
    github: string;
    snapchat: string;
    reddit: string;
    linkedin: string;
    mastodon: string;
    twitch: string;
    app: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    birthplace: string;
    occupation: string;
    education: string;
    relationship: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    timezone: string;
    language: string;
    currency: string;
    unit: string;
    theme: string;
    notifications: any;
    created: string;
  };
}

export interface HiveSignerClient {
  // Authentication methods
  login: (callback: (err: any, res: any) => void) => void;
  getLoginURL: (state?: string, select_account?: boolean) => string;
  me: (callback: (err: any, res: HiveSignerUser) => void) => void;
  revokeToken: (callback: (err: any, res: any) => void) => void;
  
  // Transaction methods
  vote: (
    voter: string,
    author: string,
    permlink: string,
    weight: number,
    callback: (err: any, res: any) => void
  ) => void;
  
  comment: (
    parentAuthor: string,
    parentPermlink: string,
    author: string,
    permlink: string,
    title: string,
    body: string,
    jsonMetadata: string,
    callback: (err: any, res: any) => void
  ) => void;
  
  deleteComment: (
    author: string,
    permlink: string,
    callback: (err: any, res: any) => void
  ) => void;
  
  customJson: (
    requiredAuths: string[],
    requiredPostingAuths: string[],
    id: string,
    json: string,
    callback: (err: any, res: any) => void
  ) => void;
  
  reblog: (
    account: string,
    author: string,
    permlink: string,
    callback: (err: any, res: any) => void
  ) => void;
  
  follow: (
    follower: string,
    following: string,
    callback: (err: any, res: any) => void
  ) => void;
  
  unfollow: (
    unfollower: string,
    unfollowing: string,
    callback: (err: any, res: any) => void
  ) => void;
  
  ignore: (
    follower: string,
    following: string,
    callback: (err: any, res: any) => void
  ) => void;
  
  claimRewardBalance: (
    account: string,
    rewardHive: string,
    rewardHbd: string,
    rewardVests: string,
    callback: (err: any, res: any) => void
  ) => void;
}

// HiveSigner global declarations moved to hive.ts to avoid conflicts