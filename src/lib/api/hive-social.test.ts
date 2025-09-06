import { hiveSocialAPI } from './hive-social';

// Simple test to verify the HiveSocialAPI methods we're using in the debug page
describe('HiveSocialAPI', () => {
  it('should have getUserProfile method', () => {
    expect(hiveSocialAPI.getUserProfile).toBeDefined();
  });

  it('should have getAccounts method', () => {
    expect(hiveSocialAPI.getAccounts).toBeDefined();
  });

  it('should have getTrendingPosts method', () => {
    expect(hiveSocialAPI.getTrendingPosts).toBeDefined();
  });
});