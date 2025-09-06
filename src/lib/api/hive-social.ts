import { Client } from '@hiveio/dhive';
import { CommentData, VoteData, SocialFeedItem, UserProfile } from '@/types/social';

// Use a single stable RPC node to avoid switching issues
const HIVE_NODE = 'https://api.hive.blog';

// Custom fetch function to avoid "Illegal invocation" errors
const customFetch = (url: string, options?: RequestInit): Promise<Response> => {
  return fetch.call(window, url, options);
};

export class HiveSocialAPI {
  private client: Client;
  
  constructor() {
    // Configure dhive client with proper fetch and timeout settings
    this.client = new Client(HIVE_NODE, {
      timeout: 15000,
      failoverThreshold: 0,
      consoleOnFailover: false,
      // Use custom agent to avoid fetch context issues
      agent: typeof window !== 'undefined' ? undefined : undefined
    });
  }

  // Direct API call with custom fetch for Bridge API
  private async callBridgeAPI(method: string, params: any): Promise<any> {
    const body = {
      jsonrpc: '2.0',
      method: `bridge.${method}`,
      params,
      id: 1
    };

    try {
      const response = await customFetch(HIVE_NODE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
        
      if (data.error) {
        throw new Error(`API Error: ${data.error.message || JSON.stringify(data.error)}`);
      }

      // Successful response
      return data.result;
    } catch (error) {
      console.error(`Bridge API call failed for ${method}:`, error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  // Direct Condenser API call with custom fetch
  private async callCondenserAPI(method: string, params: any[] = []): Promise<any> {
    const body = {
      jsonrpc: '2.0',
      method: `condenser_api.${method}`,
      params,
      id: 1
    };

    try {
      const response = await customFetch(HIVE_NODE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
        
      if (data.error) {
        throw new Error(`API Error: ${data.error.message || JSON.stringify(data.error)}`);
      }

      return data.result;
    } catch (error) {
      console.error(`Condenser API call failed for ${method}:`, error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  // Get content using direct Condenser API call
  async getContent(author: string, permlink: string): Promise<any> {
    try {
      return await this.callCondenserAPI('get_content', [author, permlink]);
    } catch (error) {
      console.error(`Error fetching content for ${author}/${permlink}:`, error);
      throw error;
    }
  }

  // Get content replies using direct Condenser API call
  async getContentReplies(author: string, permlink: string): Promise<any[]> {
    try {
      return await this.callCondenserAPI('get_content_replies', [author, permlink]);
    } catch (error) {
      console.error(`Error fetching replies for ${author}/${permlink}:`, error);
      return [];
    }
  }

  // Get active votes using direct Condenser API call
  async getActiveVotes(author: string, permlink: string): Promise<any[]> {
    try {
      return await this.callCondenserAPI('get_active_votes', [author, permlink]);
    } catch (error) {
      console.error(`Error fetching votes for ${author}/${permlink}:`, error);
      return [];
    }
  }

  // Get discussions by trending using direct Condenser API call
  async getDiscussionsByTrending(query: any): Promise<any[]> {
    try {
      return await this.callCondenserAPI('get_discussions_by_trending', [query]);
    } catch (error) {
      console.error('Error fetching trending discussions:', error);
      return [];
    }
  }

  // Get discussions by created using direct Condenser API call  
  async getDiscussionsByCreated(query: any): Promise<any[]> {
    try {
      return await this.callCondenserAPI('get_discussions_by_created', [query]);
    } catch (error) {
      console.error('Error fetching created discussions:', error);
      return [];
    }
  }

  // Get discussions by hot using direct Condenser API call
  async getDiscussionsByHot(query: any): Promise<any[]> {
    try {
      return await this.callCondenserAPI('get_discussions_by_hot', [query]);
    } catch (error) {
      console.error('Error fetching hot discussions:', error);
      return [];
    }
  }

  // Get account information using direct Condenser API call
  async getAccounts(accountNames: string[]): Promise<any[]> {
    try {
      return await this.callCondenserAPI('get_accounts', [accountNames]);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      return [];
    }
  }

  // Get followers using direct Condenser API call
  async getFollowers(following: string, startFollower: string = '', followType: string = 'blog', limit: number = 100): Promise<any[]> {
    try {
      return await this.callCondenserAPI('get_followers', [following, startFollower, followType, limit]);
    } catch (error) {
      console.error('Error fetching followers:', error);
      return [];
    }
  }

  // Get following using direct Condenser API call
  async getFollowing(follower: string, startFollowing: string = '', followType: string = 'blog', limit: number = 100): Promise<any[]> {
    try {
      return await this.callCondenserAPI('get_following', [follower, startFollowing, followType, limit]);
    } catch (error) {
      console.error('Error fetching following:', error);
      return [];
    }
  }

  // Get blog entries using direct Condenser API call
  async getBlog(author: string, startEntryId: number = 0, limit: number = 20): Promise<any[]> {
    try {
      return await this.callCondenserAPI('get_blog', [author, startEntryId, limit]);
    } catch (error) {
      console.error('Error fetching blog:', error);
      return [];
    }
  }

  // Get dynamic global properties using direct Condenser API call
  async getDynamicGlobalProperties(): Promise<any> {
    try {
      return await this.callCondenserAPI('get_dynamic_global_properties', []);
    } catch (error) {
      console.error('Error fetching dynamic global properties:', error);
      throw error;
    }
  }

  // Get trending posts using Condenser API instead of Bridge API
  async getTrendingPosts(tag: string = '', limit: number = 20, startAuthor?: string, startPermlink?: string): Promise<SocialFeedItem[]> {
    try {
      const query: any = {
        tag: tag,
        limit: limit,
        truncate_body: 1000
      };
      
      if (startAuthor && startPermlink) {
        query.start_author = startAuthor;
        query.start_permlink = startPermlink;
      }
      
      console.log('🚀 Calling condenser_api.get_discussions_by_trending with query:', query);
      const posts = await this.getDiscussionsByTrending(query);
      
      console.log('📦 Received posts from Condenser API:', {
        count: posts?.length || 0,
        firstPost: posts?.[0] ? {
          author: posts[0].author,
          permlink: posts[0].permlink,
          activeVotes: posts[0].active_votes,
          availableFields: Object.keys(posts[0])
        } : null
      });

      return (posts || []).map(this.transformCondenserToSocialFeedItem);
    } catch (error) {
      console.error('Error fetching trending posts:', error);
      throw error;
    }
  }

  // Get recent posts using Condenser API
  async getRecentPosts(tag: string = '', limit: number = 20, startAuthor?: string, startPermlink?: string): Promise<SocialFeedItem[]> {
    try {
      const query: any = {
        tag: tag,
        limit: limit,
        truncate_body: 1000
      };
      
      if (startAuthor && startPermlink) {
        query.start_author = startAuthor;
        query.start_permlink = startPermlink;
      }
      
      console.log('🚀 Calling condenser_api.get_discussions_by_created with query:', query);
      const posts = await this.getDiscussionsByCreated(query);
      
      return (posts || []).map(this.transformCondenserToSocialFeedItem);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      throw error;
    }
  }

  // Get hot posts using Condenser API
  async getHotPosts(tag: string = '', limit: number = 20, startAuthor?: string, startPermlink?: string): Promise<SocialFeedItem[]> {
    try {
      const query: any = {
        tag: tag,
        limit: limit,
        truncate_body: 1000
      };
      
      if (startAuthor && startPermlink) {
        query.start_author = startAuthor;
        query.start_permlink = startPermlink;
      }
      
      console.log('🚀 Calling condenser_api.get_discussions_by_hot with query:', query);
      const posts = await this.getDiscussionsByHot(query);
      
      return (posts || []).map(this.transformCondenserToSocialFeedItem);
    } catch (error) {
      console.error('Error fetching hot posts:', error);
      throw error;
    }
  }

  // Get posts by specific author using Condenser API
  async getPostsByAuthor(author: string, limit: number = 20): Promise<SocialFeedItem[]> {
    try {
      const blog = await this.getBlog(author, 0, limit);
      
      // Get full content for each blog entry
      const posts = await Promise.all(
        blog.map(async (entry: any) => {
          try {
            return await this.getContent(entry.author, entry.permlink);
          } catch (error) {
            console.warn(`Failed to get content for ${entry.author}/${entry.permlink}:`, error);
            return null;
          }
        })
      );

      return posts.filter(Boolean).map(this.transformCondenserToSocialFeedItem);
    } catch (error) {
      console.error('Error fetching posts by author:', error);
      throw error;
    }
  }

  // Get a single post using Condenser API
  async getPost(author: string, permlink: string): Promise<SocialFeedItem | null> {
    try {
      const post = await this.getContent(author, permlink);
      if (!post || !post.author) {
        return null;
      }
      return this.transformCondenserToSocialFeedItem(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }

  // Get comment discussions using Condenser API
  async getCommentDiscussions(author: string, permlink: string): Promise<SocialFeedItem[]> {
    try {
      console.log('🚀 Fetching comments for:', `${author}/${permlink}`);
      const replies = await this.getContentReplies(author, permlink);
      
      console.log('📦 Received replies from Condenser API:', {
        count: replies?.length || 0,
        firstReply: replies?.[0] ? {
          author: replies[0].author,
          permlink: replies[0].permlink,
          body: replies[0].body?.substring(0, 100),
          hasActiveVotes: !!replies[0].active_votes
        } : null
      });

      return replies.map(this.transformCondenserToSocialFeedItem);
    } catch (error) {
      console.error('Error fetching comment discussions:', error);
      return [];
    }
  }

  // Get post with comments using Condenser API
  async getPostWithComments(author: string, permlink: string): Promise<{ post: SocialFeedItem | null; comments: SocialFeedItem[] }> {
    try {
      const [post, comments] = await Promise.all([
        this.getPost(author, permlink),
        this.getCommentDiscussions(author, permlink)
      ]);

      return {
        post,
        comments
      };
    } catch (error) {
      console.error('Error fetching post with comments:', error);
      return {
        post: null,
        comments: []
      };
    }
  }

  // Get post with full vote data using Condenser API
  private async getPostWithVotes(author: string, permlink: string): Promise<any> {
    try {
      const response = await this.client.call('condenser_api', 'get_content', [author, permlink]);
      return response;
    } catch (error) {
      console.warn(`Failed to get vote data for ${author}/${permlink}:`, error);
      return null;
    }
  }

  // Enhance posts with vote data
  private async enhancePostsWithVotes(posts: any[]): Promise<any[]> {
    console.log('🔍 Enhancing posts with vote data...');
    
    // For now, let's enhance just the first few posts to avoid too many API calls
    const postsToEnhance = posts.slice(0, 5);
    const enhancedPosts = [];
    
    for (const post of postsToEnhance) {
      if (!post.active_votes || post.active_votes.length === 0) {
        console.log(`📊 Getting vote data for ${post.author}/${post.permlink}`);
        const fullPost = await this.getPostWithVotes(post.author, post.permlink);
        if (fullPost && fullPost.active_votes) {
          enhancedPosts.push({ ...post, active_votes: fullPost.active_votes });
          console.log(`✅ Enhanced ${post.author}/${post.permlink} with ${fullPost.active_votes.length} votes`);
        } else {
          enhancedPosts.push(post);
        }
      } else {
        enhancedPosts.push(post);
      }
    }
    
    // Add the remaining posts without enhancement
    enhancedPosts.push(...posts.slice(5));
    
    return enhancedPosts;
  }
  async getUserAccount(username: string): Promise<any> {
    try {
      // Use the database_api.find_accounts method as documented
      const result = await this.client.call('database_api', 'find_accounts', {
        accounts: [username]
      });
      
      return result?.accounts?.[0] || null;
    } catch (error) {
      console.error('Error fetching user account via find_accounts, trying fallback:', error);
      try {
        // Fallback to the dhive client method
        const accounts = await this.client.database.getAccounts([username]);
        return accounts[0] || null;
      } catch (fallbackError) {
        console.error('Error fetching user account via fallback:', fallbackError);
        return null;
      }
    }
  }

  // Get user profile with calculated stats using Condenser API
  async getUserProfile(username: string): Promise<UserProfile | null> {
    try {
      // Use Condenser API to get account information
      const accounts = await this.getAccounts([username]);
      if (!accounts || accounts.length === 0) {
        return null;
      }

      const account = accounts[0];
      let metadata: any = {};
      
      try {
        // Parse posting_json_metadata first, then fallback to json_metadata
        const metadataSource = account.posting_json_metadata || account.json_metadata || '{}';
        if (typeof metadataSource === 'string') {
          metadata = JSON.parse(metadataSource);
        } else if (typeof metadataSource === 'object' && metadataSource !== null) {
          metadata = metadataSource;
        } else {
          metadata = {};
        }
      } catch (e) {
        console.warn('Failed to parse user metadata:', e);
        metadata = {};
      }

      const profile = metadata.profile || {};

      // Calculate Hive Power
      const userVestingShares = parseFloat(account.vesting_shares.split(' ')[0]);
      const delegatedVestingShares = parseFloat(account.delegated_vesting_shares.split(' ')[0]);
      const receivedVestingShares = parseFloat(account.received_vesting_shares.split(' ')[0]);
      const effectiveVestingShares = userVestingShares - delegatedVestingShares + receivedVestingShares;

      // Get dynamic global properties for HP calculation
      const globalProps = await this.getDynamicGlobalProperties();
      const totalVestingFund = parseFloat(globalProps.total_vesting_fund_hive.toString().split(' ')[0]);
      const totalVestingShares = parseFloat(globalProps.total_vesting_shares.toString().split(' ')[0]);
      const hivePower = (effectiveVestingShares * totalVestingFund) / totalVestingShares;

      // For now, simplify the profile data to avoid complex calculations
      // These can be enhanced later once the basic functionality is working
      return {
        username: account.name,
        displayName: profile.name || account.name,
        about: profile.about || '',
        website: profile.website || '',
        location: profile.location || '',
        coverImage: profile.cover_image || '',
        profileImage: profile.profile_image || '',
        reputation: this.calculateReputation(account.reputation),
        followersCount: 0, // Would need separate API call
        followingCount: 0, // Would need separate API call
        postCount: account.post_count || 0,
        joinDate: account.created,
        votingPower: 100, // Simplified for now
        balance: account.balance || '0.000 HIVE',
        hbdBalance: account.hbd_balance || '0.000 HBD',
        vestingShares: account.vesting_shares || '0.000000 VESTS'
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Get comments for a post using Condenser API
  async getComments(author: string, permlink: string): Promise<SocialFeedItem[]> {
    try {
      const replies = await this.getContentReplies(author, permlink);
      return replies.map(this.transformCondenserToSocialFeedItem);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  // Submit a new post via Hive Keychain
  async submitPost(postData: CommentData): Promise<boolean> {
    try {
      // For now, simulate successful post submission
      console.log('Post submission simulated:', postData);
      return true;
    } catch (error) {
      console.error('Error submitting post:', error);
      throw error;
    }
  }

  // Vote on a post via Hive Keychain
  async votePost(voteData: VoteData): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('🗳️ Submitting vote via HiveKeychain:', voteData);

      // Check if HiveKeychain is available
      if (typeof window === 'undefined' || !(window as any).hive_keychain) {
        reject(new Error('HiveKeychain not installed or not available'));
        return;
      }

      const keychain = (window as any).hive_keychain;

      // Create vote operation
      const voteOperation = [
        'vote',
        {
          voter: voteData.voter,
          author: voteData.author,
          permlink: voteData.permlink,
          weight: voteData.weight
        }
      ];

      console.log('📝 Vote operation:', voteOperation);

      // Request HiveKeychain to broadcast the vote
      keychain.requestBroadcast(
        voteData.voter,
        [voteOperation],
        'Posting',
        (response: any) => {
          console.log('🔗 HiveKeychain response:', response);
          
          if (response.success) {
            console.log('✅ Vote broadcast successful!', response);
            resolve(true);
          } else {
            console.error('❌ Vote broadcast failed:', response.message || response.error);
            reject(new Error(response.message || response.error || 'Vote failed'));
          }
        }
      );
    });
  }

  // Transform Condenser API post to social feed item
  private transformCondenserToSocialFeedItem = (post: any): SocialFeedItem => {
    console.log('🔍 Transforming Condenser API post:', {
      author: post.author,
      permlink: post.permlink,
      title: post.title,
      hasActiveVotes: !!post.active_votes,
      activeVotesLength: post.active_votes?.length,
      netVotes: post.net_votes,
      availableFields: Object.keys(post)
    });

    let metadata: any = {};
    try {
      // Parse JSON metadata
      if (typeof post.json_metadata === 'string') {
        metadata = JSON.parse(post.json_metadata || '{}');
      } else if (typeof post.json_metadata === 'object' && post.json_metadata !== null) {
        metadata = post.json_metadata;
      } else {
        metadata = {};
      }
    } catch (e) {
      console.warn('Failed to parse post metadata:', e);
      metadata = {};
    }

    const tags = metadata.tags || [];
    const images = metadata.image || [];

    // Calculate payout
    const pendingPayout = parseFloat(post.pending_payout_value?.split(' ')[0] || '0');
    const totalPayout = parseFloat(post.total_payout_value?.split(' ')[0] || '0');
    const curatorPayout = parseFloat(post.curator_payout_value?.split(' ')[0] || '0');
    const payout = (pendingPayout + totalPayout + curatorPayout).toFixed(3);

    // Count votes from Condenser API active_votes
    let upvotes = 0;
    let downvotes = 0;

    if (post.active_votes && Array.isArray(post.active_votes)) {
      // Condenser API provides active_votes with percent values
      upvotes = post.active_votes.filter((vote: any) => vote.percent > 0).length;
      downvotes = post.active_votes.filter((vote: any) => vote.percent < 0).length;
      
      console.log('📊 Condenser vote data:', { 
        upvotes, 
        downvotes, 
        totalVotes: post.active_votes.length,
        sampleVotes: post.active_votes.slice(0, 3).map(v => ({ voter: v.voter, percent: v.percent }))
      });
    } else if (typeof post.net_votes === 'number') {
      // Fallback to net_votes
      upvotes = Math.max(0, post.net_votes);
      downvotes = Math.max(0, -post.net_votes);
      console.log('📊 Using net_votes fallback:', { upvotes, downvotes, netVotes: post.net_votes });
    } else {
      // Final fallback
      upvotes = 0;
      downvotes = 0;
      console.log('⚠️ No vote data available in Condenser API response');
    }

    console.log('✅ Final Condenser vote counts:', { upvotes, downvotes, postId: `${post.author}/${post.permlink}` });

    return {
      id: `${post.author}/${post.permlink}`,
      author: post.author,
      permlink: post.permlink,
      title: post.title || '',
      body: post.body || '',
      created: post.created,
      category: post.category || tags[0] || '',
      upvotes,
      downvotes,
      payout: payout + ' HBD',
      reputation: this.calculateReputation(post.author_reputation),
      tags,
      images
    };
  }

  // Transform Hive post to social feed item (Legacy Bridge API)
  private transformToSocialFeedItem = (post: any): SocialFeedItem => {
    console.log('🔍 Transforming post data:', {
      author: post.author,
      permlink: post.permlink,
      title: post.title,
      hasActiveVotes: !!post.active_votes,
      activeVotesLength: post.active_votes?.length,
      hasStats: !!post.stats,
      stats: post.stats,
      netVotes: post.net_votes,
      availableFields: Object.keys(post)
    });

    let metadata: any = {};
    try {
      // Check if json_metadata is already an object or needs parsing
      if (typeof post.json_metadata === 'string') {
        metadata = JSON.parse(post.json_metadata || '{}');
      } else if (typeof post.json_metadata === 'object' && post.json_metadata !== null) {
        metadata = post.json_metadata;
      } else {
        metadata = {};
      }
    } catch (e) {
      console.warn('Failed to parse post metadata:', e);
      metadata = {};
    }

    const tags = metadata.tags || [];
    const images = metadata.image || [];

    // Calculate payout
    const pendingPayout = parseFloat(post.pending_payout_value?.split(' ')[0] || '0');
    const totalPayout = parseFloat(post.total_payout_value?.split(' ')[0] || '0');
    const curatorPayout = parseFloat(post.curator_payout_value?.split(' ')[0] || '0');
    const payout = (pendingPayout + totalPayout + curatorPayout).toFixed(3);

    // Count votes - Bridge API uses different format than expected
    let upvotes = 0;
    let downvotes = 0;
    let voteSource = 'none';

    if (post.active_votes && Array.isArray(post.active_votes)) {
      // Bridge API response with active_votes array
      // Bridge API uses rshares instead of percent
      upvotes = post.active_votes.filter((vote: any) => {
        // Check for positive rshares (upvotes) or positive percent
        return (vote.rshares && vote.rshares > 0) || (vote.percent && vote.percent > 0);
      }).length;
      
      downvotes = post.active_votes.filter((vote: any) => {
        // Check for negative rshares (downvotes) or negative percent  
        return (vote.rshares && vote.rshares < 0) || (vote.percent && vote.percent < 0);
      }).length;
      
      voteSource = 'active_votes';
      console.log('📊 Vote data from active_votes:', { 
        upvotes, 
        downvotes, 
        totalVotes: post.active_votes.length,
        sampleVotes: post.active_votes.slice(0, 3).map(v => ({ voter: v.voter, rshares: v.rshares, percent: v.percent }))
      });
    } else if (post.stats) {
      // Bridge API response with stats object
      upvotes = post.stats.total_votes || 0;
      downvotes = 0; // Bridge API doesn't separate downvotes easily
      voteSource = 'stats';
      console.log('📊 Vote data from stats:', { upvotes, downvotes, stats: post.stats });
    } else if (typeof post.net_votes === 'number') {
      // Bridge API also provides net_votes
      upvotes = Math.max(0, post.net_votes);
      downvotes = Math.max(0, -post.net_votes);
      voteSource = 'net_votes';
      console.log('📊 Vote data from net_votes:', { upvotes, downvotes, netVotes: post.net_votes });
    } else {
      // Fallback to zero if no vote data available
      upvotes = 0;
      downvotes = 0;
      voteSource = 'fallback';
      console.log('⚠️ No vote data available, using fallback');
    }

    console.log('✅ Final vote counts:', { upvotes, downvotes, voteSource, postId: `${post.author}/${post.permlink}` });

    return {
      id: `${post.author}/${post.permlink}`,
      author: post.author,
      permlink: post.permlink,
      title: post.title || '',
      body: post.body || '',
      created: post.created,
      category: post.category || tags[0] || '',
      upvotes,
      downvotes,
      payout: payout + ' HBD',
      reputation: this.calculateReputation(post.author_reputation),
      tags,
      images
    };
  }

  // Calculate reputation from raw reputation value
  private calculateReputation(rawReputation: string | number): number {
    const rep = typeof rawReputation === 'string' ? parseInt(rawReputation) : rawReputation;
    if (rep === 0) return 25;
    
    const neg = rep < 0;
    let reputationLevel = Math.log10(Math.abs(rep));
    reputationLevel = Math.max(reputationLevel - 9, 0);
    reputationLevel = (neg ? -1 : 1) * reputationLevel;
    reputationLevel = reputationLevel * 9 + 25;
    
    return Math.round(reputationLevel);
  }

  // Generate a unique permlink for new posts
  generatePermlink(title: string): string {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const timestamp = Date.now().toString();
    return slug ? `${slug}-${timestamp}` : `post-${timestamp}`;
  }

  // Format Hive/HBD amounts
  formatHiveAmount(amount: string): string {
    const [value, currency] = amount.split(' ');
    return `${parseFloat(value).toFixed(3)} ${currency}`;
  }

  // Get global properties
  async getGlobalProperties() {
    try {
      return await this.client.database.getDynamicGlobalProperties();
    } catch (error) {
      console.error('Error fetching global properties:', error);
      throw error;
    }
  }

  // Check if user has voted on a post
  hasUserVoted(post: SocialFeedItem, username: string): { hasVoted: boolean; voteWeight: number } {
    // Check if user has voted by looking through active_votes
    const userVote = post.active_votes?.find(vote => vote.voter === username);
    if (userVote) {
      return { hasVoted: true, voteWeight: userVote.weight };
    }
    return { hasVoted: false, voteWeight: 0 };
  }
}

// Create singleton instance
export const hiveSocialAPI = new HiveSocialAPI();
