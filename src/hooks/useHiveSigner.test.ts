// src/hooks/useHiveSigner.test.ts
import { renderHook, act } from '@testing-library/react';
import { useHiveSignerAuth, useHiveSignerOperations } from './useHiveSigner';
import { HiveSignerProvider } from '@/providers/HiveSignerProvider';

// Mock the HiveSigner global object
const mockHiveSigner = {
  me: jest.fn(),
  login: jest.fn(),
  revokeToken: jest.fn(),
  vote: jest.fn(),
  comment: jest.fn(),
  customJson: jest.fn(),
  reblog: jest.fn(),
  follow: jest.fn(),
  unfollow: jest.fn(),
};

describe('useHiveSignerAuth', () => {
  beforeAll(() => {
    // Mock the global hivesigner object
    Object.defineProperty(window, 'hivesigner', {
      value: mockHiveSigner,
      writable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHiveSignerAuth(), {
      wrapper: HiveSignerProvider,
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });

  it('should handle login', async () => {
    const mockUser = {
      user: 'testuser',
      _id: '123',
      name: 'Test User',
      scope: ['login'],
      user_metadata: {
        account: 'testuser',
        name: 'Test User',
        about: '',
        profile_image: '',
        cover_image: '',
        location: '',
        website: '',
        twitter: '',
        facebook: '',
        instagram: '',
        youtube: '',
        discord: '',
        tiktok: '',
        github: '',
        snapchat: '',
        reddit: '',
        linkedin: '',
        mastodon: '',
        twitch: '',
        app: '',
        email: '',
        phone: '',
        gender: '',
        birthday: '',
        birthplace: '',
        occupation: '',
        education: '',
        relationship: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        timezone: '',
        language: '',
        currency: '',
        unit: '',
        theme: '',
        notifications: {},
        created: '2023-01-01T00:00:00Z',
      },
    };

    mockHiveSigner.me.mockImplementation((callback) => {
      callback(null, mockUser);
    });

    const { result } = renderHook(() => useHiveSignerAuth(), {
      wrapper: HiveSignerProvider,
    });

    // Wait for initial load to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle logout', async () => {
    mockHiveSigner.revokeToken.mockImplementation((callback) => {
      callback(null, { success: true });
    });

    const { result } = renderHook(() => useHiveSignerAuth(), {
      wrapper: HiveSignerProvider,
    });

    await act(async () => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});

describe('useHiveSignerOperations', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'hivesigner', {
      value: mockHiveSigner,
      writable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should execute vote operation', async () => {
    const mockResponse = { success: true, id: 'vote123' };
    mockHiveSigner.vote.mockImplementation((voter, author, permlink, weight, callback) => {
      callback(null, mockResponse);
    });

    const { result } = renderHook(() => useHiveSignerOperations());

    let response;
    await act(async () => {
      response = await result.current.vote('voter', 'author', 'permlink', 10000);
    });

    expect(response).toEqual(mockResponse);
    expect(result.current.isOperationLoading).toBe(false);
    expect(result.current.operationError).toBeNull();
  });

  it('should handle operation errors', async () => {
    const mockError = new Error('Operation failed');
    mockHiveSigner.vote.mockImplementation((voter, author, permlink, weight, callback) => {
      callback(mockError, null);
    });

    const { result } = renderHook(() => useHiveSignerOperations());

    await act(async () => {
      try {
        await result.current.vote('voter', 'author', 'permlink', 10000);
      } catch (error) {
        // Expected error
      }
    });

    expect(result.current.isOperationLoading).toBe(false);
    expect(result.current.operationError).toBe('Operation failed');
  });
});