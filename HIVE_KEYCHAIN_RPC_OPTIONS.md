# Hive Keychain SDK RPC Configuration Options

## Overview

The Hive Keychain SDK uses RPC (Remote Procedure Call) nodes to communicate with the Hive blockchain for certain operations like signature verification. By default, the SDK uses a predefined set of RPC nodes, but these can sometimes be slow or unresponsive, causing operations to hang.

## Default RPC Nodes

The Keychain SDK uses the following default RPC nodes in order:
1. `https://api.hive.blog`
2. `https://api.openhive.network`
3. `https://api.deathwing.me`

## Alternative RPC Nodes

If you're experiencing hanging issues with the default RPC nodes, you can configure the Keychain SDK to use alternative RPC nodes. Here are some reliable alternatives:

1. `https://anyx.io`
2. `https://hived.emre.sh`
3. `https://rpc.ecency.com`
4. `https://techcoderx.com`
5. `https://api.pharesim.me`
6. `https://hived.privex.io`

## How to Configure Alternative RPC Nodes

### 1. Initialize KeychainSDK with Custom RPC

When creating a new KeychainSDK instance, you can pass an options object with a custom RPC URL:

```typescript
import { KeychainSDK } from 'keychain-sdk';

// Initialize with a specific RPC node
const keychain = new KeychainSDK(window, { 
    rpc: 'https://anyx.io' 
});
```

### 2. Test Multiple RPC Nodes

You can test different RPC nodes to find the fastest one for your users:

```typescript
const rpcNodes = [
    'https://api.hive.blog',
    'https://anyx.io',
    'https://api.openhive.network',
    'https://api.deathwing.me',
    'https://hived.emre.sh',
    'https://rpc.ecency.com',
    'https://techcoderx.com'
];

async function findBestRpc() {
    for (const rpc of rpcNodes) {
        try {
            const testKeychain = new KeychainSDK(window, { rpc });
            const isInstalled = await testKeychain.isKeychainInstalled();
            if (isInstalled) {
                console.log(`RPC ${rpc} is working`);
                return rpc;
            }
        } catch (error) {
            console.log(`RPC ${rpc} failed: ${error}`);
        }
    }
    return null;
}
```

### 3. Fallback RPC Configuration

You can implement a fallback mechanism to automatically switch to alternative RPC nodes if the primary one fails:

```typescript
class KeychainManager {
    private rpcNodes = [
        'https://api.hive.blog',
        'https://anyx.io',
        'https://api.openhive.network',
        'https://api.deathwing.me'
    ];
    
    private currentRpcIndex = 0;
    
    async createKeychain() {
        const rpc = this.rpcNodes[this.currentRpcIndex];
        try {
            const keychain = new KeychainSDK(window, { rpc });
            // Test the connection
            await keychain.isKeychainInstalled();
            return keychain;
        } catch (error) {
            // If this RPC fails, try the next one
            if (this.currentRpcIndex < this.rpcNodes.length - 1) {
                this.currentRpcIndex++;
                return this.createKeychain();
            } else {
                throw new Error('All RPC nodes failed');
            }
        }
    }
}
```

## Best Practices

1. **Test Multiple RPC Nodes**: Implement a mechanism to test different RPC nodes and select the fastest one.

2. **Implement Timeouts**: Always use timeouts when making RPC calls to prevent hanging operations.

3. **Provide User Feedback**: Show loading states and current operations to users during RPC communication.

4. **Log Errors**: Log RPC errors to help diagnose issues.

5. **Fallback Strategy**: Have a fallback strategy for when primary RPC nodes fail.

## Example Implementation

Here's a complete example of how to implement RPC node selection with fallbacks:

```typescript
import { KeychainSDK, Login, SignBuffer, KeychainKeyTypes } from 'keychain-sdk';

const RPC_NODES = [
    'https://api.hive.blog',
    'https://anyx.io',
    'https://api.openhive.network',
    'https://api.deathwing.me',
    'https://hived.emre.sh',
    'https://rpc.ecency.com'
];

class HiveKeychainService {
    private keychain: KeychainSDK | null = null;
    private currentRpcIndex = 0;
    
    async initialize() {
        await this.createKeychainWithFallback();
    }
    
    private async createKeychainWithFallback(): Promise<void> {
        for (let i = 0; i < RPC_NODES.length; i++) {
            try {
                const rpc = RPC_NODES[i];
                console.log(`Trying RPC node: ${rpc}`);
                
                this.keychain = new KeychainSDK(window, { rpc });
                
                // Test the connection
                await this.keychain.isKeychainInstalled();
                
                console.log(`Successfully connected to RPC node: ${rpc}`);
                this.currentRpcIndex = i;
                return;
            } catch (error) {
                console.log(`Failed to connect to RPC node ${RPC_NODES[i]}: ${error}`);
                continue;
            }
        
        throw new Error('Failed to connect to any RPC node');
    }
    
    async login(data: Login) {
        if (!this.keychain) {
            throw new Error('Keychain not initialized');
        }
        
        try {
            return await this.keychain.login(data);
        } catch (error) {
            // If the error might be RPC-related, try with a different RPC
            if (this.isRpcError(error)) {
                console.log('RPC error detected, trying fallback...');
                await this.createKeychainWithFallback();
                if (this.keychain) {
                    return await this.keychain.login(data);
                }
            }
            throw error;
        }
    }
    
    private isRpcError(error: any): boolean {
        // Check if the error is related to RPC communication
        const errorMessage = String(error).toLowerCase();
        return errorMessage.includes('timeout') || 
               errorMessage.includes('network') || 
               errorMessage.includes('rpc') ||
               errorMessage.includes('fetch');
    }
}

// Usage
const hiveService = new HiveKeychainService();
await hiveService.initialize();

const loginData = {
    username: 'your-username',
    message: '{"login":"123"}',
    method: KeychainKeyTypes.posting,
    title: 'Login'
};

try {
    const result = await hiveService.login(loginData);
    console.log('Login successful:', result);
} catch (error) {
    console.error('Login failed:', error);
}
```

## Troubleshooting

### Hanging Operations

If operations are hanging:

1. Check if the RPC node is responsive by making a simple API call
2. Try switching to an alternative RPC node
3. Implement timeouts to prevent indefinite waiting
4. Add logging to identify where the operation is hanging

### Timeout Errors

If you're getting timeout errors:

1. Increase the timeout duration
2. Switch to a faster RPC node
3. Check your network connection
4. Verify that the Hive Keychain extension is properly installed and configured

### Connection Errors

If you're getting connection errors:

1. Verify that the RPC URL is correct
2. Check if the RPC node is online
3. Try alternative RPC nodes
4. Ensure there are no firewall or proxy issues

## Conclusion

Configuring alternative RPC nodes for the Hive Keychain SDK can significantly improve the reliability and performance of your application. By implementing proper error handling, timeouts, and fallback mechanisms, you can provide a better user experience and reduce the likelihood of hanging operations.