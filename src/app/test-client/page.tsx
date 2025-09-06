// src/app/test-client/page.tsx
"use client";

import { SimpleClientTest } from '@/components/examples/SimpleClientTest';

export default function TestClientPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Client-Side Hive API Test</h1>
      <p className="mb-6 text-muted-foreground">
        This page demonstrates the proper usage of HiveSocialAPI in client-side components only.
      </p>
      
      <SimpleClientTest />
    </div>
  );
}