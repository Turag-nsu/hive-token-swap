// src/app/test-api/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Loader2, Server, Monitor, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ClientSideHiveExample } from '@/components/examples/ClientSideHiveExample';

export default function TestApiPage() {
    const [serverResults, setServerResults] = useState<any>(null);
    const [serverLoading, setServerLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const testServerApi = async () => {
        setServerLoading(true);
        setServerError(null);
        setServerResults(null);
        
        try {
            console.log('🖥️ Testing server-side API...');
            
            const response = await fetch('/api/test-hive');
            
            if (!response.ok) {
                throw new Error(`Server returned ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('✅ Server API response:', data);
            setServerResults(data);
            
        } catch (err) {
            console.error('❌ Server API error:', err);
            setServerError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setServerLoading(false);
        }
    };

    // Auto-test server API on component mount
    useEffect(() => {
        testServerApi();
    }, []);

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Hive API Test Page</h1>
                <p className="text-muted-foreground">
                    Compare server-side API routes vs client-side HiveSocialAPI usage
                </p>
            </div>

            {/* Server-side API Test */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Server className="h-5 w-5" />
                        Server-Side API Test
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        This calls our Next.js API route which uses dhive directly on the server
                    </p>
                </CardHeader>
                <CardContent>
                    <Button 
                        onClick={testServerApi} 
                        disabled={serverLoading}
                        className="mb-4"
                    >
                        {serverLoading ? (
                            <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Testing...</>
                        ) : (
                            'Test Server API'
                        )}
                    </Button>

                    {serverError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                <p className="text-red-700 font-medium">Error: {serverError}</p>
                            </div>
                        </div>
                    )}

                    {serverResults && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Badge variant={serverResults.success ? 'default' : 'destructive'}>
                                    {serverResults.success ? 'Success' : 'Failed'}
                                </Badge>
                                <span className="text-sm">
                                    {serverResults.message || 'API Response'}
                                </span>
                            </div>
                            
                            {serverResults.data && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Data ({serverResults.data.postsCount || 0} posts)</h4>
                                    <div className="space-y-3 max-h-96 overflow-auto">
                                        {serverResults.data.posts?.map((post: any, index: number) => (
                                            <div key={index} className="border-l-4 border-l-green-500 pl-3 py-1">
                                                <p className="font-medium text-sm line-clamp-1">{post.title}</p>
                                                <div className="flex gap-2 text-xs text-muted-foreground">
                                                    <span>@{post.author}</span>
                                                    <span>{post.votes || 0} votes</span>
                                                    <span>{new Date(post.created).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!serverResults && !serverError && !serverLoading && (
                        <p className="text-muted-foreground text-center py-4">
                            Click "Test Server API" to run the test
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Client-side API Test */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Monitor className="h-5 w-5" />
                        Client-Side API Test
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        This uses HiveSocialAPI directly in the browser (recommended approach)
                    </p>
                </CardHeader>
                <CardContent>
                    <ClientSideHiveExample />
                </CardContent>
            </Card>

            {/* Usage Guidelines */}
            <Card>
                <CardHeader>
                    <CardTitle>Usage Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 className="font-medium text-green-800 mb-2">✅ Client-Side (Recommended)</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                                <li>• Use HiveSocialAPI in React components</li>
                                <li>• Works in browser environment</li>
                                <li>• Proper fetch context handling</li>
                                <li>• Rich API with transformations</li>
                                <li>• Handles failover automatically</li>
                            </ul>
                        </div>
                        
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">ℹ️ Server-Side (Limited)</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Use dhive Client directly in API routes</li>
                                <li>• No window object dependencies</li>
                                <li>• Basic API calls only</li>
                                <li>• Good for simple data fetching</li>
                                <li>• Avoids CORS issues</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">⚠️ Important Notes</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• HiveSocialAPI should ONLY be used in client-side components (with "use client" directive)</li>
                            <li>• Server-side API routes should use dhive directly without browser context</li>
                            <li>• Never import HiveSocialAPI in server components or API routes</li>
                            <li>• CORS errors in browser console are expected when calling external APIs directly</li>
                        </ul>
                    </div>
                    
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-2">🛡️ Safety Measures</h4>
                        <ul className="text-sm text-purple-700 space-y-1">
                            <li>• HiveSocialAPI now throws explicit errors if used outside browser environment</li>
                            <li>• All methods check for window availability before execution</li>
                            <li>• Custom fetch binding prevents "Illegal invocation" errors</li>
                            <li>• Lazy initialization ensures client is only created when needed</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}