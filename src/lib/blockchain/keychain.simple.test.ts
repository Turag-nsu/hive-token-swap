import { keychain, hiveKeychainAPI } from './keychain';

// Simple test to verify the keychain functions can be imported
describe('Keychain', () => {
  it('should have keychain instance', () => {
    expect(keychain).toBeDefined();
  });

  it('should have hiveKeychainAPI', () => {
    expect(hiveKeychainAPI).toBeDefined();
  });

  it('should have followUser method', () => {
    expect(hiveKeychainAPI.followUser).toBeDefined();
  });

  it('should have unfollowUser method', () => {
    expect(hiveKeychainAPI.unfollowUser).toBeDefined();
  });
});