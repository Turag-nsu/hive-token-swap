import type { Operation } from '@/types';

/**
 * Builder class for creating Hive blockchain operations
 */
export class OperationBuilder {
  /**
   * Create a transfer operation
   */
  static transfer(
    from: string,
    to: string,
    amount: string,
    memo: string = ''
  ): Operation {
    return [
      'transfer',
      {
        from,
        to,
        amount,
        memo,
      },
    ];
  }

  /**
   * Create a custom JSON operation
   */
  static customJson(
    id: string,
    json: object | string,
    requiredPostingAuths: string[] = [],
    requiredAuths: string[] = []
  ): Operation {
    return [
      'custom_json',
      {
        required_auths: requiredAuths,
        required_posting_auths: requiredPostingAuths,
        id,
        json: typeof json === 'string' ? json : JSON.stringify(json),
      },
    ];
  }

  /**
   * Create a power up (transfer to vesting) operation
   */
  static powerUp(
    from: string,
    to: string,
    amount: string
  ): Operation {
    return [
      'transfer_to_vesting',
      {
        from,
        to,
        amount,
      },
    ];
  }

  /**
   * Create a power down (withdraw vesting) operation
   */
  static powerDown(
    account: string,
    vestingShares: string
  ): Operation {
    return [
      'withdraw_vesting',
      {
        account,
        vesting_shares: vestingShares,
      },
    ];
  }

  /**
   * Create a Hive Engine token transfer operation
   */
  static hiveEngineTransfer(
    from: string,
    to: string,
    symbol: string,
    quantity: string,
    memo: string = ''
  ): Operation {
    return this.customJson(
      'ssc-mainnet-hive',
      {
        contractName: 'tokens',
        contractAction: 'transfer',
        contractPayload: {
          symbol,
          to,
          quantity,
          memo,
        },
      },
      [from]
    );
  }

  /**
   * Create a Hive Engine market buy operation
   */
  static hiveEngineMarketBuy(
    account: string,
    symbol: string,
    quantity: string,
    price: string
  ): Operation {
    return this.customJson(
      'ssc-mainnet-hive',
      {
        contractName: 'market',
        contractAction: 'buy',
        contractPayload: {
          symbol,
          quantity,
          price,
        },
      },
      [account]
    );
  }

  /**
   * Create a Hive Engine market sell operation
   */
  static hiveEngineMarketSell(
    account: string,
    symbol: string,
    quantity: string,
    price: string
  ): Operation {
    return this.customJson(
      'ssc-mainnet-hive',
      {
        contractName: 'market',
        contractAction: 'sell',
        contractPayload: {
          symbol,
          quantity,
          price,
        },
      },
      [account]
    );
  }

  /**
   * Create a Hive Engine market cancel operation
   */
  static hiveEngineMarketCancel(
    account: string,
    type: 'buy' | 'sell',
    id: string
  ): Operation {
    return this.customJson(
      'ssc-mainnet-hive',
      {
        contractName: 'market',
        contractAction: 'cancel',
        contractPayload: {
          type,
          id,
        },
      },
      [account]
    );
  }

  /**
   * Create a Hive Engine token stake operation
   */
  static hiveEngineStake(
    account: string,
    symbol: string,
    quantity: string
  ): Operation {
    return this.customJson(
      'ssc-mainnet-hive',
      {
        contractName: 'tokens',
        contractAction: 'stake',
        contractPayload: {
          symbol,
          quantity,
        },
      },
      [account]
    );
  }

  /**
   * Create a Hive Engine token unstake operation
   */
  static hiveEngineUnstake(
    account: string,
    symbol: string,
    quantity: string
  ): Operation {
    return this.customJson(
      'ssc-mainnet-hive',
      {
        contractName: 'tokens',
        contractAction: 'unstake',
        contractPayload: {
          symbol,
          quantity,
        },
      },
      [account]
    );
  }

  /**
   * Create a swap operation using a DEX
   */
  static createSwapOperation(
    account: string,
    fromSymbol: string,
    toSymbol: string,
    fromAmount: string,
    minimumToAmount: string,
    slippage: number
  ): Operation {
    // This is a hypothetical swap operation - actual implementation
    // would depend on the specific DEX protocol being used
    return this.customJson(
      'hive-swap-dex',
      {
        contractName: 'swap',
        contractAction: 'swapExactTokensForTokens',
        contractPayload: {
          tokenIn: fromSymbol,
          tokenOut: toSymbol,
          amountIn: fromAmount,
          amountOutMin: minimumToAmount,
          slippageTolerance: slippage,
          deadline: Math.floor(Date.now() / 1000) + 300, // 5 minutes
        },
      },
      [account]
    );
  }

  /**
   * Validate an operation structure
   */
  static validateOperation(operation: Operation): boolean {
    try {
      if (!Array.isArray(operation) || operation.length !== 2) {
        return false;
      }

      const [opType, opData] = operation;
      
      if (typeof opType !== 'string' || !opData || typeof opData !== 'object') {
        return false;
      }

      // Specific validation for each operation type
      switch (opType) {
        case 'transfer':
          return this.validateTransfer(opData);
        case 'custom_json':
          return this.validateCustomJson(opData);
        case 'transfer_to_vesting':
          return this.validateTransferToVesting(opData);
        case 'withdraw_vesting':
          return this.validateWithdrawVesting(opData);
        default:
          // Allow unknown operation types to pass basic validation
          return true;
      }
    } catch (error) {
      console.error('Operation validation failed:', error);
      return false;
    }
  }

  private static validateTransfer(data: any): boolean {
    const required = ['from', 'to', 'amount', 'memo'];
    return required.every(field => field in data);
  }

  private static validateCustomJson(data: any): boolean {
    const required = ['required_auths', 'required_posting_auths', 'id', 'json'];
    return required.every(field => field in data) &&
           Array.isArray(data.required_auths) &&
           Array.isArray(data.required_posting_auths);
  }

  private static validateTransferToVesting(data: any): boolean {
    const required = ['from', 'to', 'amount'];
    return required.every(field => field in data);
  }

  private static validateWithdrawVesting(data: any): boolean {
    const required = ['account', 'vesting_shares'];
    return required.every(field => field in data);
  }

  /**
   * Estimate the Resource Credits (RC) cost of operations
   */
  static estimateRCCost(operations: Operation[]): number {
    // Approximate RC costs for different operations (in microchains)
    const rcCosts: Record<string, number> = {
      'transfer': 2640000,
      'custom_json': 1320000,
      'transfer_to_vesting': 2640000,
      'withdraw_vesting': 1320000,
      'vote': 1320000,
      'comment': 6600000,
      'comment_options': 1320000,
      'delete_comment': 1320000,
    };

    return operations.reduce((total, op) => {
      const [opType] = op;
      const baseCost = rcCosts[opType] || 1320000;
      
      // Add extra cost for custom_json based on size
      if (opType === 'custom_json') {
        const [, opData] = op;
        const jsonSize = JSON.stringify(opData.json).length;
        const sizeCost = Math.floor(jsonSize / 100) * 100000; // 100k RC per 100 bytes
        return total + baseCost + sizeCost;
      }
      
      return total + baseCost;
    }, 0);
  }

  /**
   * Create a batch of operations
   */
  static createBatch(operations: Operation[]): Operation[] {
    // Validate all operations in the batch
    const validOperations = operations.filter(op => this.validateOperation(op));
    
    if (validOperations.length !== operations.length) {
      console.warn(`${operations.length - validOperations.length} invalid operations filtered out`);
    }
    
    return validOperations;
  }

  /**
   * Get the required authority type for an operation
   */
  static getRequiredAuthority(operation: Operation): 'posting' | 'active' | 'owner' {
    const [opType] = operation;
    
    // Operations that require active key
    const activeKeyOps = [
      'transfer',
      'transfer_to_vesting',
      'withdraw_vesting',
      'limit_order_create',
      'limit_order_cancel',
      'convert',
      'collateralized_convert',
    ];
    
    // Operations that require owner key
    const ownerKeyOps = [
      'account_update',
      'account_witness_vote',
      'recover_account',
      'change_recovery_account',
    ];
    
    if (activeKeyOps.includes(opType)) {
      return 'active';
    }
    
    if (ownerKeyOps.includes(opType)) {
      return 'owner';
    }
    
    // Default to posting key
    return 'posting';
  }
}