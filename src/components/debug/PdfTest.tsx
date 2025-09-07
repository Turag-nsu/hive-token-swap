'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { generateReportPDF, downloadFile, generateReportText } from '@/utils/pdf-generator';

export function PdfTest() {
  const handleTestPDF = async () => {
    try {
      await generateReportPDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleTestText = () => {
    try {
      const textContent = generateReportText();
      downloadFile(textContent, 'test-report.txt', 'text/plain');
    } catch (error) {
      console.error('Error generating text file:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-blue-400 mb-3">PDF Generation Test</h3>
      <div className="flex flex-wrap gap-3">
        <Button 
          variant="outline" 
          className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
          onClick={handleTestPDF}
        >
          Test PDF Generation
        </Button>
        <Button 
          variant="outline" 
          className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
          onClick={handleTestText}
        >
          Test Text Download
        </Button>
      </div>
    </div>
  );
}