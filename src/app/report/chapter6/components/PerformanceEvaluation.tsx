import React from 'react';
import { PerformanceBenchmarks } from './PerformanceBenchmarks';
import { PerformanceMetricsDiagrams } from './PerformanceMetricsDiagrams';
import { ScalabilityOptimization } from './ScalabilityOptimization';
import { MonitoringAndAnalytics } from './MonitoringAndAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const PerformanceEvaluation: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">6. Performance Evaluation</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-4">6.1 System Performance</h3>
          <p className="text-gray-300 leading-relaxed">
            The platform demonstrates:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Fast content loading through caching mechanisms</li>
            <li>Efficient API usage with request deduplication</li>
            <li>Smooth user interface interactions</li>
            <li>Responsive design across device types</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">6.2 Blockchain Performance</h3>
          <p className="text-gray-300 leading-relaxed">
            Hive blockchain integration provides:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>3-second block times</li>
            <li>Low transaction fees</li>
            <li>High throughput capabilities</li>
            <li>Reliable API endpoints</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">6.3 User Experience Metrics</h3>
          <p className="text-gray-300 leading-relaxed">
            User experience is optimized through:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Intuitive navigation</li>
            <li>Clear feedback mechanisms</li>
            <li>Loading state indicators</li>
            <li>Error recovery processes</li>
          </ul>
          
          <PerformanceBenchmarks />
          <PerformanceMetricsDiagrams />
          <ScalabilityOptimization />
          <MonitoringAndAnalytics />
        </CardContent>
      </Card>
    </section>
  );
};