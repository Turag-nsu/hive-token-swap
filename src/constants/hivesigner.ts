// HiveSigner Configuration
export const HIVESIGNER_CONFIG = {
  // App configuration - for development, use a test account or leave empty
  APP_NAME: '', // In production, this should be a valid Hive account
  CALLBACK_URL: 'http://localhost:3000',
  SCOPE: ['login', 'vote', 'comment', 'custom_json', 'transfer'],
  
  // API endpoints
  API_URL: 'https://hivesigner.com',
  REDIRECT_URL: 'https://hivesigner.com/oauth/authorize',
  
  // Default permissions
  DEFAULT_SCOPE: ['login'],
  FULL_SCOPE: ['login', 'vote', 'comment', 'custom_json', 'transfer'],
} as const;