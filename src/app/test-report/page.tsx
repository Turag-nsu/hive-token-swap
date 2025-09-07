'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PdfTest } from '@/components/debug/PdfTest';

export default function TestReportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-400">Test Report Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              This is a test page to verify that our report functionality is working correctly.
            </p>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
              onClick={() => window.open('/report', '_blank')}
            >
              Open Report Page
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-400">PDF Generation Test</CardTitle>
          </CardHeader>
          <CardContent>
            <PdfTest />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}