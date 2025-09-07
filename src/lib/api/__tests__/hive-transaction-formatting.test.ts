// Test file for transaction formatting with sample data
import { HiveTransactionAPI } from '../hive-api';

// Mock the makeRPCCall function to return sample data
jest.mock('../hive-api', () => {
  const actualModule = jest.requireActual('../hive-api');
  
  return {
    ...actualModule,
    makeRPCCall: jest.fn((method, _params) => {
      if (method === 'condenser_api.get_account_history') {
        // Return the sample data provided by the user
        return Promise.resolve([
          [
            0,
            {
              block: 99005221,
              op: [
                'create_claimed_account',
                {
                  active: {
                    account_auths: [],
                    key_auths: [
                      [
                        'STM7kiqe49pV2PwhEnJPv3XLY2wZB2yMSqsSbUB5zu1buU19YuHNY',
                        1
                      ]
                    ],
                    weight_threshold: 1
                  },
                  creator: 'leo.voter',
                  extensions: [],
                  json_metadata: '[]',
                  memo_key: 'STM8JHebmSBn418SKoG2LL9Xek9GPgQBUBQRYFR234Zh9VUUje37A',
                  new_account_name: 'turag12',
                  owner: {
                    account_auths: [],
                    key_auths: [
                      [
                        'STM5cLAmXf5huXeqH2iQh29T8cBWp3EC5bVR4jpnAxsHpnB7a7qdi',
                        1
                      ]
                    ],
                    weight_threshold: 1
                  },
                  posting: {
                    account_auths: [],
                    key_auths: [
                      [
                        'STM52CuXKcgj8cVtF8GyupUtcE2731CkSdn3MBYRSse1R4nCccCmP',
                        1
                      ]
                    ],
                    weight_threshold: 1
                  }
                }
              ],
              op_in_trx: 0,
              timestamp: '2025-08-31T01:56:18',
              trx_id: '9df95853d99f5324b0152d296919a3cd08f71881',
              trx_in_block: 13,
              virtual_op: false
            }
          ],
          [
            1,
            {
              block: 99005221,
              op: [
                'account_created',
                {
                  creator: 'leo.voter',
                  initial_delegation: '0.000000 VESTS',
                  initial_vesting_shares: '0.000000 VESTS',
                  new_account_name: 'turag12'
                }
              ],
              op_in_trx: 1,
              timestamp: '2025-08-31T01:56:18',
              trx_id: '9df95853d99f5324b0152d296919a3cd08f71881',
              trx_in_block: 13,
              virtual_op: true
            }
          ],
          [
            2,
            {
              block: 99005420,
              op: [
                'account_update',
                {
                  account: 'turag12',
                  json_metadata: '[]',
                  memo_key: 'STM8JHebmSBn418SKoG2LL9Xek9GPgQBUBQRYFR234Zh9VUUje37A',
                  posting: {
                    account_auths: [
                      [
                        'undefined',
                        1
                      ]
                    ],
                    key_auths: [
                      [
                        'STM52CuXKcgj8cVtF8GyupUtcE2731CkSdn3MBYRSse1R4nCccCmP',
                        1
                      ]
                    ],
                    weight_threshold: 1
                  }
                }
              ],
              op_in_trx: 0,
              timestamp: '2025-08-31T02:06:15',
              trx_id: '199072be52678ff0b4b1e7ca8606e2a608cb0768',
              trx_in_block: 4,
              virtual_op: false
            }
          ],
          [
            3,
            {
              block: 99147411,
              op: [
                'account_update',
                {
                  account: 'turag12',
                  active: {
                    account_auths: [],
                    key_auths: [
                      [
                        'STM7kiqe49pV2PwhEnJPv3XLY2wZB2yMSqsSbUB5zu1buU19YuHNY',
                        1
                      ]
                    ],
                    weight_threshold: 1
                  },
                  json_metadata: '[]',
                  memo_key: 'STM8JHebmSBn418SKoG2LL9Xek9GPgQBUBQRYFR234Zh9VUUje37A',
                  posting: {
                    account_auths: [],
                    key_auths: [
                      [
                        'STM52CuXKcgj8cVtF8GyupUtcE2731CkSdn3MBYRSse1R4nCccCmP',
                        1
                      ]
                    ],
                    weight_threshold: 1
                  }
                }
              ],
              op_in_trx: 0,
              timestamp: '2025-09-05T00:33:03',
              trx_id: '8c2564769dc1ed2d84bba2731f48fc9f1eda795e',
              trx_in_block: 3,
              virtual_op: false
            }
          ],
          [
            4,
            {
              block: 99166008,
              op: [
                'vote',
                {
                  author: 'merit.ahama',
                  permlink: 'finding-a-healthy-balance-between',
                  voter: 'turag12',
                  weight: 10000
                }
              ],
              op_in_trx: 0,
              timestamp: '2025-09-05T16:03:48',
              trx_id: 'ea8fe3f36a932976a7c2a4ac2a5e7fa5352418c6',
              trx_in_block: 10,
              virtual_op: false
            }
          ],
          [
            5,
            {
              block: 99166008,
              op: [
                'effective_comment_vote',
                {
                  author: 'merit.ahama',
                  pending_payout: '0.092 HBD',
                  permlink: 'finding-a-healthy-balance-between',
                  rshares: 0,
                  total_vote_weight: '325466918010',
                  voter: 'turag12',
                  weight: 0
                }
              ],
              op_in_trx: 1,
              timestamp: '2025-09-05T16:03:48',
              trx_id: 'ea8fe3f36a932976a7c2a4ac2a5e7fa5352418c6',
              trx_in_block: 10,
              virtual_op: true
            }
          ],
          [
            18,
            {
              block: 99178343,
              op: [
                'comment',
                {
                  author: 'turag12',
                  body: '❤️❤️❤️',
                  json_metadata: '{"tags":["comment"],"app":"hive-token-swap"}',
                  parent_author: 'karoly',
                  parent_permlink: 'altering-a-thread-blouse-passion',
                  permlink: 're-altering-a-thread-blouse-passion-1757125255808-1757125255809',
                  title: ''
                }
              ],
              op_in_trx: 0,
              timestamp: '2025-09-06T02:21:00',
              trx_id: '1444e02257ddd76d10ff160a9587797ba839d99d',
              trx_in_block: 12,
              virtual_op: false
            }
          ]
        ]);
      }
      
      if (method === 'condenser_api.get_dynamic_global_properties') {
        return Promise.resolve({
          total_vesting_shares: '1000000000.000000 VESTS',
          total_vesting_fund_hive: '1000000.000 HIVE'
        });
      }
      
      return Promise.resolve({});
    })
  };
});

describe('HiveTransactionAPI', () => {
  describe('getTransactionHistory', () => {
    it('should format transaction history correctly', async () => {
      const username = 'turag12';
      const transactions = await HiveTransactionAPI.getTransactionHistory(username, 20);
      
      // Check that we have the expected number of transactions
      expect(transactions).toHaveLength(7);
      
      // Check create_claimed_account transaction
      const createClaimedAccountTx = transactions.find(tx => tx.type === 'account_creation');
      expect(createClaimedAccountTx).toBeDefined();
      expect(createClaimedAccountTx?.description).toBe('Created claimed account: turag12');
      expect(createClaimedAccountTx?.from).toBe('leo.voter');
      expect(createClaimedAccountTx?.to).toBe('turag12');
      expect(createClaimedAccountTx?.tags).toContain('account_creation');
      
      // Check account_created transaction
      const accountCreatedTx = transactions.find(tx => tx.type === 'account_created');
      expect(accountCreatedTx).toBeDefined();
      expect(accountCreatedTx?.description).toBe('Account created by: leo.voter');
      expect(accountCreatedTx?.from).toBe('leo.voter');
      expect(accountCreatedTx?.to).toBe('turag12');
      expect(accountCreatedTx?.tags).toContain('account_created');
      
      // Check account_update transactions
      const accountUpdateTxs = transactions.filter(tx => tx.type === 'account_update');
      expect(accountUpdateTxs).toHaveLength(2);
      expect(accountUpdateTxs[0]?.description).toBe('Updated account turag12 (posting key, metadata)');
      expect(accountUpdateTxs[0]?.tags).toContain('account_update');
      
      // Check vote transaction
      const voteTx = transactions.find(tx => tx.type === 'vote');
      expect(voteTx).toBeDefined();
      expect(voteTx?.description).toBe('Voted on @merit.ahama/finding-a-healthy-balance-between (100%)');
      expect(voteTx?.from).toBe('turag12');
      expect(voteTx?.to).toBe('merit.ahama');
      expect(voteTx?.tags).toContain('vote');
      
      // Check effective_comment_vote transaction
      const effectiveVoteTx = transactions.find(tx => tx.type === 'effective_vote');
      expect(effectiveVoteTx).toBeDefined();
      // For the case where turag12 is the author (earning the payout)
      expect(effectiveVoteTx?.description).toBe('Earned vote payout on @merit.ahama/finding-a-healthy-balance-between (0.092 HBD)');
      expect(effectiveVoteTx?.amount).toBe('0.092 HBD');
      expect(effectiveVoteTx?.currency).toBe('HBD');
      expect(effectiveVoteTx?.tags).toContain('effective_vote');
      expect(effectiveVoteTx?.category).toBe('income');
      
      // Check comment transaction
      const commentTx = transactions.find(tx => tx.type === 'content');
      expect(commentTx).toBeDefined();
      expect(commentTx?.description).toBe('Commented on @karoly/altering-a-thread-blouse-passion: re-altering-a-thread-blouse-passion-1757125255808-1757125255809');
      expect(commentTx?.from).toBe('turag12');
      expect(commentTx?.to).toBe('karoly');
      expect(commentTx?.tags).toContain('content');
    });
  });
});