import { hiveSocialAPI } from '../hive-social';

// Mock window object for testing
Object.defineProperty(global, 'window', {
  value: {
    fetch: jest.fn(),
  },
  writable: true,
});

describe('HiveSocialAPI', () => {
  describe('parseReputation', () => {
    it('should calculate reputation correctly for positive values', () => {
      // Test with a known value
      const result = hiveSocialAPI.parseReputation('9223372036854775807');
      expect(result).toBe(125);
    });

    it('should return 25 for zero reputation', () => {
      const result = hiveSocialAPI.parseReputation('0');
      expect(result).toBe(25);
    });

    it('should handle negative reputation values', () => {
      const result = hiveSocialAPI.parseReputation('-9223372036854775807');
      expect(result).toBe(-75); // Negative reputation should be negative
    });

    it('should handle numeric input', () => {
      const result = hiveSocialAPI.parseReputation(1000000);
      expect(typeof result).toBe('number');
    });
  });
});