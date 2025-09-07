'use client';

import { KeychainSDK, Login, SignBuffer, KeychainKeyTypes } from 'keychain-sdk';
import React, { useState, useEffect, useMemo } from 'react';

const Page = () => {
    const [keychain, setKeychain] = useState<KeychainSDK | null>(null);
    const [loginResult, setLoginResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<string>('');
    const [currentOperation, setCurrentOperation] = useState<string>('');
    const [logs, setLogs] = useState<string[]>([]);

    // Define alternative RPC nodes
    const rpcNodes = useMemo(() => [
        'https://api.hive.blog',
        'https://anyx.io',
        'https://api.openhive.network',
        'https://api.deathwing.me',
        'https://hived.emre.sh',
        'https://rpc.ecency.com',
        'https://techcoderx.com'
    ], []);

    // Function to add logs
    const addLog = (message: string) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
        console.log(message);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize KeychainSDK with custom RPC options
            const options: { rpc?: string } = {};
            if (rpcNodes[0]) {
                options.rpc = rpcNodes[0];
            }
            const keychainInstance = new KeychainSDK(window, options);
            setKeychain(keychainInstance);
        }
    }, [rpcNodes]);

    // Function to create keychain with specific RPC
    const createKeychainWithRpc = (rpc: string) => {
        return new KeychainSDK(window, { rpc });
    };

    const handleLogin = async () => {
        if (!keychain) return;

        setIsLoading(true);
        setLogs([]);
        setCurrentOperation('Starting login process...');
        addLog("1. Checking if keychain is installed...");

        try {
            // First check if keychain is installed with current RPC
            const isInstalled = await keychain.isKeychainInstalled();
            addLog(`Keychain installed with current RPC: ${isInstalled}`);

            if (!isInstalled) {
                // Try with alternative RPC nodes
                addLog("Keychain not detected, trying alternative RPC nodes...");
                let foundWorkingRpc = false;

                for (const rpc of rpcNodes) {
                    try {
                        addLog(`Trying RPC: ${rpc}`);
                        const testKeychain = createKeychainWithRpc(rpc);
                        const installed = await testKeychain.isKeychainInstalled();
                        if (installed) {
                            addLog(`Keychain found with RPC: ${rpc}`);
                            foundWorkingRpc = true;
                            // Update the main keychain instance
                            setKeychain(testKeychain);
                            break;
                        } else {
                            addLog(`Keychain not found with RPC: ${rpc}`);
                        }
                    } catch (error) {
                        addLog(`Error testing RPC ${rpc}: ${String(error)}`);
                    }
                }

                if (!foundWorkingRpc) {
                    addLog("Hive Keychain extension is not installed or not detected with any RPC.");
                    setLoginResult({
                        success: false,
                        error: "Hive Keychain extension is not installed. Please install it from the browser extension store."
                    });
                    setIsLoading(false);
                    setCurrentOperation('');
                    return;
                }
            }

            addLog("2. Preparing login data...");
            const data = {
                "username": user,
                "message": "{\"login\":\"123\"}",
                "method": KeychainKeyTypes.posting,
                "title": "Login"
            };
            addLog("Login data prepared");

            // Try login with current RPC first
            addLog("3. Requesting signature from wallet...");
            setCurrentOperation('Please approve the signature request in your Hive Keychain extension.');

            try {
                const loginPromise = keychain.login(data as Login);
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Login timeout after 60 seconds - please check if you approved the request in your wallet")), 60000)
                );

                addLog("Waiting for user to approve signature in wallet...");
                const loginResponse = await Promise.race([loginPromise, timeoutPromise]);
                addLog("Signature approved by user, received response from wallet");

                // After wallet approval, the SDK will verify the signature with RPC
                addLog("4. Verifying signature with RPC node...");
                setCurrentOperation('Verifying signature with blockchain...');

                addLog("Login successful with current RPC");
                setLoginResult(loginResponse);
                setIsLoading(false);
                setCurrentOperation('');
                return;
            } catch (error) {
                addLog(`Login failed with current RPC: ${String(error)}`);

                // Try with alternative RPC nodes
                addLog("5. Trying alternative RPC nodes for login...");
                for (const rpc of rpcNodes) {
                    try {
                        addLog(`Attempting login with RPC: ${rpc}`);
                        setCurrentOperation(`Please approve the signature request in your Hive Keychain extension for ${rpc}`);

                        const altKeychain = createKeychainWithRpc(rpc);

                        // Check if keychain is installed with this RPC
                        const isInstalled = await altKeychain.isKeychainInstalled();
                        if (!isInstalled) {
                            addLog(`Keychain not installed with RPC: ${rpc}`);
                            continue;
                        }

                        const loginPromise = altKeychain.login(data as Login);
                        const timeoutPromise = new Promise((_, reject) =>
                            setTimeout(() => reject(new Error("Login timeout after 60 seconds - please check if you approved the request in your wallet")), 60000)
                        );

                        addLog("Waiting for user to approve signature in wallet...");
                        const loginResponse = await Promise.race([loginPromise, timeoutPromise]);
                        addLog("Signature approved by user, received response from wallet");

                        // After wallet approval, the SDK will verify the signature with RPC
                        addLog("Verifying signature with RPC node...");
                        setCurrentOperation('Verifying signature with blockchain...');

                        addLog(`Login successful with RPC: ${rpc}`);
                        setLoginResult(loginResponse);
                        setIsLoading(false);
                        setCurrentOperation('');
                        return;
                    } catch (rpcError) {
                        addLog(`Login failed with RPC ${rpc}: ${String(rpcError)}`);
                    }
                }

                // If all RPCs fail
                addLog("Login failed with all RPC nodes");
                setLoginResult({
                    success: false,
                    error: "Login failed with all available RPC nodes",
                    details: "Tried all RPC nodes without success"
                });
            }
        } catch (error) {
            addLog(`Error during login process: ${String(error)}`);
            setLoginResult({
                success: false,
                error: "Login process failed",
                details: String(error)
            });
        } finally {
            setIsLoading(false);
            setCurrentOperation('');
        }
    };

    const login2 = async () => {
        if (!keychain) return;

        setIsLoading(true);
        setLogs([]);
        setCurrentOperation('Starting sign buffer process...');
        addLog("login2 called - sign buffer method");

        try {
            // First check if keychain is installed
            addLog("1. Checking if keychain is installed...");
            const isInstalled = await keychain.isKeychainInstalled();
            addLog(`Keychain installed: ${isInstalled}`);

            if (!isInstalled) {
                setLoginResult({
                    success: false,
                    error: "Hive Keychain extension is not installed. Please install it from the browser extension store."
                });
                setIsLoading(false);
                setCurrentOperation('');
                return;
            }

            const formParamsAsObject = {
                "data": {
                    "username": user,
                    "message": "sample message to sign",
                    "method": KeychainKeyTypes.posting,
                    "title": "title"
                }
            }

            addLog("2. Requesting signature from wallet...");
            setCurrentOperation('Please approve the signature request in your Hive Keychain extension.');

            // Add timeout to prevent infinite waiting
            const signBufferPromise = keychain.signBuffer(formParamsAsObject.data as SignBuffer);
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("SignBuffer timeout after 60 seconds - please check if you approved the request in your wallet")), 60000)
            );

            addLog("Waiting for user to approve signature in wallet...");
            const signBufferResponse = await Promise.race([signBufferPromise, timeoutPromise]);
            addLog("Signature approved by user, received response from wallet");

            // For signBuffer, there's no automatic RPC verification, but we can show the result
            addLog("SignBuffer successful");
            setLoginResult(signBufferResponse);
        } catch (error) {
            addLog(`SignBuffer failed: ${String(error)}`);
            setLoginResult({ success: false, error: String(error) });
        } finally {
            setIsLoading(false);
            setCurrentOperation('');
        }
    }

    // Function to test different RPC nodes
    const testRpcNodes = async () => {
        setIsLoading(true);
        setLogs([]);
        setCurrentOperation('Testing RPC nodes...');
        addLog("Starting RPC node testing...");
        const results = [];

        for (const rpc of rpcNodes) {
            try {
                addLog(`Testing ${rpc}...`);
                setCurrentOperation(`Testing ${rpc}...`);

                // Create a new KeychainSDK instance with this RPC
                const testKeychain = createKeychainWithRpc(rpc);

                // Test if keychain is installed (this will use the RPC)
                const isInstalled = await testKeychain.isKeychainInstalled();
                results.push({ rpc, status: 'success', installed: isInstalled });
                addLog(`RPC ${rpc} test result: ${isInstalled ? 'Keychain detected' : 'Keychain not detected'}`);
            } catch (error) {
                results.push({ rpc, status: 'failed', error: String(error) });
                addLog(`RPC ${rpc} test failed: ${String(error)}`);
            }
        }

        setLoginResult({ rpcTestResults: results });
        setIsLoading(false);
        setCurrentOperation('');
        addLog("RPC node testing completed");
    }

    // Function to test login with all RPC nodes
    const testLoginWithAllRpcs = async () => {
        if (!user) {
            setLoginResult({ error: "Please enter a username first" });
            return;
        }

        setIsLoading(true);
        setLogs([]);
        setCurrentOperation('Testing login with all RPC nodes...');
        addLog("Starting login test with all RPC nodes...");

        const results = [];
        const loginData = {
            "username": user,
            "message": "{\"login\":\"123\"}",
            "method": KeychainKeyTypes.posting,
            "title": "Login"
        };

        for (const rpc of rpcNodes) {
            try {
                addLog(`Testing login with ${rpc}...`);
                setCurrentOperation(`Testing login with ${rpc}... Please approve in wallet if prompted.`);

                // Create a new KeychainSDK instance with this RPC
                const testKeychain = createKeychainWithRpc(rpc);

                // Check if keychain is installed
                const isInstalled = await testKeychain.isKeychainInstalled();
                if (!isInstalled) {
                    results.push({ rpc, status: 'failed', reason: 'Keychain not installed' });
                    addLog(`Login test with ${rpc} failed: Keychain not installed`);
                    continue;
                }

                // Try login with timeout
                try {
                    addLog(`Requesting signature from wallet for ${rpc}...`);
                    const loginPromise = testKeychain.login(loginData as Login);
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error("Login timeout after 60 seconds - please check if you approved the request in your wallet")), 60000)
                    );

                    addLog("Waiting for user to approve signature in wallet...");
                    const loginResponse = await Promise.race([loginPromise, timeoutPromise]);
                    addLog("Signature approved by user, received response from wallet");

                    // After wallet approval, the SDK will verify the signature with RPC
                    addLog("Verifying signature with RPC node...");
                    setCurrentOperation('Verifying signature with blockchain...');

                    results.push({ rpc, status: 'success', result: loginResponse });
                    addLog(`Login test with ${rpc} successful`);
                } catch (loginError) {
                    results.push({ rpc, status: 'failed', reason: 'Login failed', error: String(loginError) });
                    addLog(`Login test with ${rpc} failed: ${String(loginError)}`);
                }
            } catch (error) {
                results.push({ rpc, status: 'failed', reason: 'General error', error: String(error) });
                addLog(`Login test with ${rpc} failed with general error: ${String(error)}`);
            }
        }

        setLoginResult({ loginTestResults: results });
        setIsLoading(false);
        setCurrentOperation('');
        addLog("Login test with all RPC nodes completed");
    }

    // Function to check wallet connection status
    const checkWalletStatus = async () => {
        if (!keychain) {
            setLoginResult({ error: "Keychain not initialized" });
            return;
        }

        setIsLoading(true);
        setLogs([]);
        setCurrentOperation('Checking wallet status...');
        addLog("Checking wallet connection status...");

        try {
            const isInstalled = await keychain.isKeychainInstalled();
            addLog(`Keychain installed: ${isInstalled}`);

            if (isInstalled) {
                addLog("Wallet is installed and responding");
                setLoginResult({
                    success: true,
                    message: "Hive Keychain is installed and responding",
                    installed: true
                });
            } else {
                addLog("Wallet is not installed or not responding");
                setLoginResult({
                    success: false,
                    error: "Hive Keychain is not installed or not responding",
                    installed: false
                });
            }
        } catch (error) {
            addLog(`Error checking wallet status: ${String(error)}`);
            setLoginResult({
                success: false,
                error: "Error checking wallet status",
                details: String(error)
            });
        } finally {
            setIsLoading(false);
            setCurrentOperation('');
        }
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Hive Keychain Test</h1>

            <div className="mb-4 p-3 bg-yellow-100 border-yellow-300 rounded">
                <p className="text-sm"><strong>How It Works:</strong></p>
                <ol className="text-sm list-decimal list-inside mt-1">
                    <li>You initiate a request (login/sign)</li>
                    <li>Hive Keychain extension prompts you for approval</li>
                    <li>You approve the request in your wallet</li>
                    <li>The extension sends signed data back to the webpage</li>
                    <li>For login, the system verifies the signature with RPC nodes</li>
                    <li>Results are displayed once verification is complete</li>
                </ol>
            </div>

            <div className="mb-4 p-3 bg-blue-10 border-blue-30 rounded">
                <p className="text-sm"><strong>Test Methods:</strong></p>
                <ul className="text-sm list-disc list-inside mt-1">
                    <li><strong>Login Method:</strong> Requests signature and verifies with RPC</li>
                    <li><strong>SignBuffer Method:</strong> Requests signature only (no RPC verification)</li>
                    <li><strong>RPC Test:</strong> Tests RPC node connectivity</li>
                    <li><strong>Login Test (All RPCs):</strong> Tests login with all RPC nodes</li>
                    <li><strong>Wallet Status:</strong> Checks if wallet is installed and responding</li>
                </ul>
            </div>

            {currentOperation && (
                <div className="mb-4 p-3 bg-blue-100 border-blue-300 rounded">
                    <p className="text-sm"><strong>Current Operation:</strong> {currentOperation}</p>
                </div>
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="mb-6"
            >
                <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="username">
                        Hive Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={user || ''}
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Enter your Hive username"
                        required
                    />
                </div>
                <div className="flex gap-4 flex-wrap">
                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
                        type="button"
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login Method'}
                    </button>
                    <button
                        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50'
                        type="button"
                        onClick={login2}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'SignBuffer Method'}
                    </button>
                    <button
                        className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50'
                        type="button"
                        onClick={testRpcNodes}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Testing...' : 'Test RPC Nodes'}
                    </button>
                    <button
                        className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50'
                        type="button"
                        onClick={testLoginWithAllRpcs}
                        disabled={isLoading || !user}
                    >
                        {isLoading ? 'Testing...' : 'Test Login (All RPCs)'}
                    </button>
                    <button
                        className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 disabled:opacity-50'
                        type="button"
                        onClick={checkWalletStatus}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Checking...' : 'Check Wallet Status'}
                    </button>
                </div>
            </form>

            {logs.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Process Logs:</h2>
                    <div className="bg-gray-100 p-3 rounded max-h-60 overflow-y-auto">
                        {logs.map((log, index) => (
                            <div key={index} className="text-sm font-mono">{log}</div>
                        ))}
                    </div>
                </div>
            )}

            {loginResult && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Response:</h2>
                    <div className="text-blue-600">
                        <pre className="mt-2 bg-gray-100 p-4 rounded overflow-auto max-h-96">
                            {JSON.stringify(loginResult, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;