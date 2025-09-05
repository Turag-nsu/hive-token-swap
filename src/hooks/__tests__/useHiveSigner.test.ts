// src/hooks/useHiveSigner.test.ts
import { renderHook } from '@testing-library/react';
import { useHiveSignerAuth } from '../useHiveSigner';

// Mock the HiveSigner global object
const mockHiveSigner = {
  me: jest.fn(),
  login: jest.fn(),
  revokeToken: jest.fn(),
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
    const { result } = renderHook(() => useHiveSignerAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});