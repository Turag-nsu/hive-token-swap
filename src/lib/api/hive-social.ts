import { Client } from '@hiveio/dhive';
import { CommentData, VoteData, SocialFeedItem, UserProfile } from '@/types/social';

// Use a single stable RPC node to avoid switching issues
const HIVE_NODE = 'https://api.hive.blog';

// Custom fetch function to avoid "Illegal invocation" errors
const customFetch = (url: string, options?: RequestInit): Promise<Response> => {
  // Only use in browser environment
  if (typeof window === 'undefined') {
    throw new Error('HiveSocialAPI can only be used in browser environment');
  }
  
  // Bind fetch to window context to avoid "Illegal invocation" errors
  // This is the proper way to fix the fetch context issue
  if (window.fetch && typeof window.fetch === 'function') {
    // Check if already bound to avoid double-binding
    if (!window.fetch.name || window.fetch.name !== 'bound fetch') {
      const boundFetch = window.fetch.bind(window);
      
      // Mark as bound to prevent re-binding
      Object.defineProperty(boundFetch, 'name', {
        value: 'bound fetch',
        configurable: true
      });
      
      window.fetch = boundFetch;
      return boundFetch(url, options);
    }
  }
  
  return fetch(url, options);
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
            // The get_blog API returns entries with different structure
            // We need to extract the author and permlink from the entry
            const postAuthor = entry.author || entry.comment?.author || author;
            const postPermlink = entry.permlink || entry.comment?.permlink;
            
            // Skip if we don't have valid author/permlink
            if (!postAuthor || !postPermlink) {
              console.warn('Skipping blog entry with missing author/permlink:', entry);
              return null;
            }
            
            return await this.getContent(postAuthor, postPermlink);
          } catch (error) {
            console.warn(`Failed to get content for blog entry:`, entry, error);
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





  // Get post with votes and replies
  async getPostWithVotesAndReplies(author: string, permlink: string): Promise<SocialFeedItem> {
    try {
      // Get the main post content
      const content = await this.getContent(author, permlink);
      
      // Get active votes
      const votes = await this.getActiveVotes(author, permlink);
      
      // Get replies
      const replies = await this.getContentReplies(author, permlink);
      
      // Transform content to SocialFeedItem
      const post: SocialFeedItem = {
        id: `${content.author}/${content.permlink}`,
        author: content.author,
        permlink: content.permlink,
        title: content.title,
        body: content.body,
        created: content.created,
        payout: (parseFloat(content.pending_payout_value) || 0).toString(),
        upvotes: votes.filter((vote: any) => vote.percent > 0).length,
        downvotes: votes.filter((vote: any) => vote.percent < 0).length,
        reputation: content.author_reputation,
        tags: content.json_metadata && content.json_metadata.tags ? content.json_metadata.tags : [],
        active_votes: votes,
        children: content.children,
        category: content.category || (content.json_metadata && content.json_metadata.tags ? content.json_metadata.tags[0] : ''),
        replies: replies.map((reply: any) => ({
          id: `${reply.author}/${reply.permlink}`,
          author: reply.author,
          permlink: reply.permlink,
          title: reply.title,
          body: reply.body,
          created: reply.created,
          payout: (parseFloat(reply.pending_payout_value) || 0).toString(),
          upvotes: reply.active_votes ? reply.active_votes.filter((vote: any) => vote.percent > 0).length : 0,
          downvotes: reply.active_votes ? reply.active_votes.filter((vote: any) => vote.percent < 0).length : 0,
          reputation: reply.author_reputation,
          tags: reply.json_metadata && reply.json_metadata.tags ? reply.json_metadata.tags : [],
          active_votes: reply.active_votes || [],
          children: reply.children,
          category: reply.category || (reply.json_metadata && reply.json_metadata.tags ? reply.json_metadata.tags[0] : '')
        }))
      };
      
      return post;
    } catch (error) {
      console.error(`Error fetching post with votes and replies for ${author}/${permlink}:`, error);
      throw error;
    }
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
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        throw new Error('HiveSocialAPI can only be used in browser environment');
      }

      console.log('Fetching user profile for:', username);
      
      // Use Condenser API to get account information
      const accounts = await this.getAccounts([username]);
      if (!accounts || accounts.length === 0) {
        console.log('No account found for username:', username);
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
      let hivePower = 0;
      try {
        const globalProps = await this.getDynamicGlobalProperties();
        const totalVestingFund = parseFloat(globalProps.total_vesting_fund_hive.toString().split(' ')[0]);
        const totalVestingShares = parseFloat(globalProps.total_vesting_shares.toString().split(' ')[0]);
        hivePower = (effectiveVestingShares * totalVestingFund) / totalVestingShares;
      } catch (globalPropsError) {
        console.warn('Failed to calculate Hive Power:', globalPropsError);
        hivePower = 0;
      }

      // Calculate voting power
      let votingPower = 100;
      let downvotePower = 100;
      
      try {
        // Calculate voting power based on last vote time and current mana
        const lastVoteTime = new Date(account.last_vote_time + 'Z').getTime();
        const currentTime = Date.now();
        const secondsSinceLastVote = (currentTime - lastVoteTime) / 1000;
        
        // Voting mana regenerates at 10000 units per day (100% per day)
        const regeneratedMana = (secondsSinceLastVote / 86400) * 10000;
        const currentMana = parseInt(account.voting_manabar.current_mana) + regeneratedMana;
        votingPower = Math.min(100, (currentMana / 10000) * 100);
        
        // Downvote power calculation
        const downvoteMana = parseInt(account.downvote_manabar.current_mana) + regeneratedMana;
        downvotePower = Math.min(100, (downvoteMana / 10000) * 100);
      } catch (votingPowerError) {
        console.warn('Failed to calculate voting power:', votingPowerError);
      }

      const userProfile: UserProfile = {
        username: account.name,
        displayName: profile.name || account.name,
        about: profile.about || '',
        website: profile.website || '',
        location: profile.location || '',
        coverImage: profile.cover_image || '',
        profileImage: profile.profile_image || '',
        reputation: this.parseReputation(account.reputation),
        followersCount: 0, // Would need separate API call
        followingCount: 0, // Would need separate API call
        postCount: account.post_count || 0,
        hiveBalance: account.balance || '0.000 HIVE',
        hbdBalance: account.hbd_balance || '0.000 HBD',
        hp: `${hivePower.toFixed(3)} HP`,
        votingPower: Math.round(votingPower),
        downvotePower: Math.round(downvotePower),
        joinDate: account.created || null // Add join date
      };

      console.log('User profile fetched successfully:', userProfile);
      return userProfile;
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
    // Only execute in browser environment
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }

    return new Promise((resolve, reject) => {
      console.log('📝 Submitting post via HiveKeychain:', postData);

      // Check if HiveKeychain is available
      if (!(window as any).hive_keychain) {
        reject(new Error('HiveKeychain not installed or not available'));
        return;
      }

      const keychain = (window as any).hive_keychain;

      // Create comment operation
      const commentOperation = [
        'comment',
        {
          parent_author: postData.parent_author,
          parent_permlink: postData.parent_permlink,
          author: postData.author,
          permlink: postData.permlink,
          title: postData.title,
          body: postData.body,
          json_metadata: postData.json_metadata
        }
      ];

      console.log('📝 Comment operation:', commentOperation);

      // Request HiveKeychain to broadcast the comment
      keychain.requestBroadcast(
        postData.author,
        [commentOperation],
        'Posting',
        (response: any) => {
          console.log('🔗 HiveKeychain response:', response);

          if (response.success) {
            console.log('✅ Post submission successful!', response);
            resolve(true);
          } else {
            console.error('❌ Post submission failed:', response.message || response.error);
            reject(new Error(response.message || response.error || 'Post submission failed'));
          }
        }
      );
    });
  }

  // Vote on a post via Hive Keychain
  async votePost(voteData: VoteData): Promise<boolean> {
    // Only execute in browser environment
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }

    return new Promise((resolve, reject) => {
      console.log('🗳️ Submitting vote via HiveKeychain:', voteData);

      // Check if HiveKeychain is available
      if (!(window as any).hive_keychain) {
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
  transformCondenserToSocialFeedItem = (post: any): SocialFeedItem => {
    console.log('🔍 Transforming Condenser API post:', {
      author: post.author,
      permlink: post.permlink,
      title: post.title,
      hasActiveVotes: !!post.active_votes,
      activeVotesLength: post.active_votes?.length,
      netVotes: post.net_votes,
      children: post.children,
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
        sampleVotes: post.active_votes.slice(0, 3).map((v: any) => ({ voter: v.voter, percent: v.percent }))
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
      reputation: this.parseReputation(post.author_reputation),
      tags,
      images,
      active_votes: post.active_votes,
      children: post.children || 0 // Added children count
    };
  }

  // Transform account data to UserProfile
  async transformUserProfile(account: any): Promise<UserProfile> {
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
    let hivePower = 0;
    try {
      const globalProps = await this.getDynamicGlobalProperties();
      const totalVestingFund = parseFloat(globalProps.total_vesting_fund_hive.toString().split(' ')[0]);
      const totalVestingShares = parseFloat(globalProps.total_vesting_shares.toString().split(' ')[0]);
      hivePower = (effectiveVestingShares * totalVestingFund) / totalVestingShares;
    } catch (globalPropsError) {
      console.warn('Failed to calculate Hive Power:', globalPropsError);
      hivePower = 0;
    }

    // Calculate voting power
    let votingPower = 100;
    let downvotePower = 100;
    
    try {
      // Calculate voting power based on last vote time and current mana
      const lastVoteTime = new Date(account.last_vote_time + 'Z').getTime();
      const currentTime = Date.now();
      const secondsSinceLastVote = (currentTime - lastVoteTime) / 1000;
      
      // Voting mana regenerates at 10000 units per day (100% per day)
      const regeneratedMana = (secondsSinceLastVote / 86400) * 10000;
      const currentMana = parseInt(account.voting_manabar.current_mana) + regeneratedMana;
      votingPower = Math.min(100, (currentMana / 10000) * 100);
      
      // Downvote power calculation
      const downvoteMana = parseInt(account.downvote_manabar.current_mana) + regeneratedMana;
      downvotePower = Math.min(100, (downvoteMana / 10000) * 100);
    } catch (votingPowerError) {
      console.warn('Failed to calculate voting power:', votingPowerError);
    }

    return {
      username: account.name,
      displayName: profile.name || account.name,
      about: profile.about || '',
      website: profile.website || '',
      location: profile.location || '',
      coverImage: profile.cover_image || '',
      profileImage: profile.profile_image || '',
      reputation: this.parseReputation(account.reputation),
      followersCount: 0, // Would need separate API call
      followingCount: 0, // Would need separate API call
      postCount: account.post_count || 0,
      hiveBalance: account.balance || '0.000 HIVE',
      hbdBalance: account.hbd_balance || '0.000 HBD',
      hp: `${hivePower.toFixed(3)} HP`,
      votingPower: Math.round(votingPower),
      downvotePower: Math.round(downvotePower),
      joinDate: account.created || null // Add join date
    };
  }

  // Update user profile metadata using account_update2 operation
  async updateProfileMetadata(username: string, profileData: Partial<UserProfile>): Promise<boolean> {
    // Only execute in browser environment
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }

    return new Promise((resolve, reject) => {
      console.log('📝 Updating profile metadata via HiveKeychain:', { username, profileData });

      // Check if HiveKeychain is available
      if (!(window as any).hive_keychain) {
        reject(new Error('HiveKeychain not installed or not available'));
        return;
      }

      const keychain = (window as any).hive_keychain;

      // Get current account data to preserve existing metadata
      this.getUserAccount(username).then(account => {
        if (!account) {
          reject(new Error('Failed to fetch account data'));
          return;
        }

        // Parse existing metadata
        let existingMetadata: any = {};
        try {
          const metadataSource = account.posting_json_metadata || account.json_metadata || '{}';
          if (typeof metadataSource === 'string') {
            existingMetadata = JSON.parse(metadataSource);
          } else if (typeof metadataSource === 'object' && metadataSource !== null) {
            existingMetadata = metadataSource;
          }
        } catch (e) {
          console.warn('Failed to parse existing metadata:', e);
        }

        // Update profile data
        const updatedProfile = {
          ...existingMetadata.profile,
          name: profileData.displayName || existingMetadata.profile?.name || username,
          about: profileData.about || existingMetadata.profile?.about || '',
          website: profileData.website || existingMetadata.profile?.website || '',
          location: profileData.location || existingMetadata.profile?.location || '',
          cover_image: profileData.coverImage || existingMetadata.profile?.cover_image || '',
          profile_image: profileData.profileImage || existingMetadata.profile?.profile_image || ''
        };

        // Create updated metadata
        const updatedMetadata = {
          ...existingMetadata,
          profile: updatedProfile
        };

        // Create account_update2 operation
        const accountUpdateOperation = [
          'account_update2',
          {
            account: username,
            json_metadata: account.json_metadata || '', // Keep existing json_metadata
            posting_json_metadata: JSON.stringify(updatedMetadata),
            extensions: []
          }
        ];

        console.log('📝 Account update operation:', accountUpdateOperation);

        // Request HiveKeychain to broadcast the account update
        keychain.requestBroadcast(
          username,
          [accountUpdateOperation],
          'Posting', // Posting authority is sufficient for updating profile metadata
          (response: any) => {
            console.log('🔗 HiveKeychain response:', response);

            if (response.success) {
              console.log('✅ Profile update successful!', response);
              resolve(true);
            } else {
              console.error('❌ Profile update failed:', response.message || response.error);
              reject(new Error(response.message || response.error || 'Profile update failed'));
            }
          }
        );
      }).catch(error => {
        console.error('Error fetching account data:', error);
        reject(new Error('Failed to fetch account data: ' + error.message));
      });
    });
  }

  // Calculate reputation from raw reputation value
  parseReputation(rawReputation: string | number): number {
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
    return `${parseFloat(value || '0').toFixed(3)} ${currency}`;
  }

  // Get global properties
  async getGlobalProperties() {
    try {
      return await this.getDynamicGlobalProperties();
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

// Create singleton instance with lazy initialization
let hiveSocialAPIInstance: HiveSocialAPI | null = null;

// Enhanced singleton with window check
export const hiveSocialAPI = {
  getInstance(): HiveSocialAPI {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }

    if (!hiveSocialAPIInstance) {
      hiveSocialAPIInstance = new HiveSocialAPI();
    }
    return hiveSocialAPIInstance;
  },

  // Proxy all methods to the singleton instance with window checks
  async getPostWithVotesAndReplies(author: string, permlink: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getPostWithVotesAndReplies(author, permlink);
  },

  async getContent(author: string, permlink: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getContent(author, permlink);
  },

  async getContentReplies(author: string, permlink: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getContentReplies(author, permlink);
  },

  async getActiveVotes(author: string, permlink: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getActiveVotes(author, permlink);
  },

  async getDiscussionsByTrending(query: any) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getDiscussionsByTrending(query);
  },

  async getDiscussionsByCreated(query: any) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getDiscussionsByCreated(query);
  },

  async getDiscussionsByHot(query: any) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getDiscussionsByHot(query);
  },

  async getAccounts(accountNames: string[]) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getAccounts(accountNames);
  },

  async getDynamicGlobalProperties() {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getDynamicGlobalProperties();
  },

  async getTrendingPosts(tag?: string, limit?: number, startAuthor?: string, startPermlink?: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getTrendingPosts(tag, limit, startAuthor, startPermlink);
  },

  async getRecentPosts(tag?: string, limit?: number, startAuthor?: string, startPermlink?: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getRecentPosts(tag, limit, startAuthor, startPermlink);
  },

  async getHotPosts(tag?: string, limit?: number, startAuthor?: string, startPermlink?: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getHotPosts(tag, limit, startAuthor, startPermlink);
  },

  async getPostsByAuthor(author: string, limit?: number) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getPostsByAuthor(author, limit);
  },

  async getPost(author: string, permlink: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getPost(author, permlink);
  },

  async getCommentDiscussions(author: string, permlink: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getCommentDiscussions(author, permlink);
  },

  async getPostWithComments(author: string, permlink: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getPostWithComments(author, permlink);
  },

  async getFeedHistory() {
    // Not implemented
    return null;
  },

  async getCurrentMedianHistoryPrice() {
    // Not implemented
    return null;
  },

  async getConversionRequests(_account: string) {
    // Not implemented
    return [];
  },

  async getOrderBook(_limit?: number) {
    // Not implemented
    return { bids: [], asks: [] };
  },

  async getOpenOrders(_account: string) {
    // Not implemented
    return [];
  },

  async getLiquidityQueue(_account: string, _limit?: number) {
    // Not implemented
    return [];
  },

  async getSavingsWithdrawFrom(_account: string) {
    // Not implemented
    return [];
  },

  async getSavingsWithdrawTo(_account: string) {
    // Not implemented
    return [];
  },

  async getVestingDelegations(_account: string, _from?: string, _limit?: number) {
    // Not implemented
    return [];
  },

  async getExpiringVestingDelegations(_account: string, _from?: string, _limit?: number) {
    // Not implemented
    return [];
  },

  async getEscrow(_from: string, _escrowId: number) {
    // Not implemented
    return null;
  },

  async getWithdrawRoutes(_account: string, _type?: 'incoming' | 'outgoing' | 'all') {
    // Not implemented
    return [];
  },

  async getAccountBandwidth(_account: string, _type?: 'market' | 'forum' | 'post') {
    // Not implemented
    return null;
  },

  async getFeed(_accountName: string, _limit?: number, _startAuthor?: string, _startPermlink?: string) {
    // Not implemented
    return [];
  },

  async getBlog(_author: string, _startEntryId?: number, _limit?: number) {
    // Not implemented
    return [];
  },

  async getAccountPosts(_accountName: string, _limit?: number, _startAuthor?: string, _startPermlink?: string) {
    // Not implemented
    return [];
  },

  async getAccountComments(_accountName: string, _limit?: number, _startAuthor?: string, _startPermlink?: string) {
    // Not implemented
    return [];
  },

  async getAccountReplies(_accountName: string, _limit?: number, _startAuthor?: string, _startPermlink?: string) {
    // Not implemented
    return [];
  },

  async getTrendingTags(_afterTag?: string, _limit?: number) {
    // Not implemented
    return [];
  },

  async getDiscussions(_sortBy: string, _query: any) {
    // Not implemented
    return [];
  },

  async getState(_path: string) {
    // Not implemented
    return null;
  },

  async getMarketHistory(_bucketSeconds: number, _start: string, _end: string) {
    // Not implemented
    return [];
  },

  async getMarketHistoryBuckets() {
    // Not implemented
    return [];
  },

  // Add the missing getUserProfile method
  async getUserProfile(username: string): Promise<UserProfile | null> {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getUserProfile(username);
  },

  // Add the missing submitPost method
  async submitPost(postData: CommentData): Promise<boolean> {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().submitPost(postData);
  },

  // Add the missing votePost method
  async votePost(voteData: VoteData): Promise<boolean> {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().votePost(voteData);
  },

  parseReputation(rawReputation: number | string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().parseReputation(rawReputation);
  },

  generatePermlink(title: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().generatePermlink(title);
  },

  formatHiveAmount(amount: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().formatHiveAmount(amount);
  },

  async getGlobalProperties() {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getGlobalProperties();
  },

  hasUserVoted(post: any, username: string) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().hasUserVoted(post, username);
  },

  transformCondenserToSocialFeedItem(post: any) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().transformCondenserToSocialFeedItem(post);
  },

  transformUserProfile(account: any) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().transformUserProfile(account);
  },

  // Add the updateProfileMetadata method to the singleton
  async updateProfileMetadata(username: string, profileData: Partial<UserProfile>): Promise<boolean> {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().updateProfileMetadata(username, profileData);
  },

  async getFollowing(follower: string, startFollowing?: string, followType?: string, limit?: number) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getFollowing(follower, startFollowing, followType, limit);
  },

  async getFollowers(following: string, startFollower?: string, followType?: string, limit?: number) {
    if (typeof window === 'undefined') {
      throw new Error('HiveSocialAPI can only be used in browser environment');
    }
    return this.getInstance().getFollowers(following, startFollower, followType, limit);
  }
};
