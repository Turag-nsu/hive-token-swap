import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const TableOfContents: React.FC = () => {
  return (
    <Card className="mb-12 bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-400">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-2 list-decimal list-inside">
          <li className="hover:text-blue-400 cursor-pointer">Abstract</li>
          <li className="hover:text-blue-400 cursor-pointer">Introduction</li>
          <li className="hover:text-blue-400 cursor-pointer">Background and Related Work</li>
          <li className="hover:text-blue-400 cursor-pointer">System Architecture</li>
          <li className="hover:text-blue-400 cursor-pointer">Technical Implementation</li>
          <li className="hover:text-blue-400 cursor-pointer">Security Considerations</li>
          <li className="hover:text-blue-400 cursor-pointer">Performance Evaluation</li>
          <li className="hover:text-blue-400 cursor-pointer">Results and Discussion</li>
          <li className="hover:text-blue-400 cursor-pointer">Conclusion and Future Work</li>
          <li className="hover:text-blue-400 cursor-pointer">References</li>
        </ol>
      </CardContent>
    </Card>
  );
};