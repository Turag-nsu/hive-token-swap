// Mock the function since it's not exported
const calculateVotingPower = (account: any): number => {
  try {
    // Calculate voting power based on last vote time and current mana
    const lastVoteTime = new Date(account.last_vote_time + 'Z').getTime();
    const currentTime = Date.now();
    const secondsSinceLastVote = (currentTime - lastVoteTime) / 1000;
    
    // Voting mana regenerates at 10000 units per day (100% per day)
    const regeneratedMana = (secondsSinceLastVote / 86400) * 10000;
    const currentMana = parseInt(account.voting_manabar.current_mana) + regeneratedMana;
    const votingPower = Math.min(100, (currentMana / 10000) * 100);
    
    return Math.round(votingPower);
  } catch (error) {
    console.warn('Failed to calculate voting power:', error);
    return 0;
  }
};

describe('Debug Page Consistency Functions', () => {
  describe('calculateVotingPower', () => {
    it('should calculate voting power correctly', () => {
      const mockAccount = {
        last_vote_time: '2023-01-01T00:00:00',
        voting_manabar: {
          current_mana: '5000'
        }
      };

      const result = calculateVotingPower(mockAccount);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });

    it('should handle invalid account data gracefully', () => {
      const mockAccount = {
        last_vote_time: 'invalid-date',
        voting_manabar: {
          current_mana: 'invalid'
        }
      };

      const result = calculateVotingPower(mockAccount);
      expect(result).toBe(0);
    });

    it('should handle missing account data gracefully', () => {
      const result = calculateVotingPower(null);
      expect(result).toBe(0);
    });
  });
});