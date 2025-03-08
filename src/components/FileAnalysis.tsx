import React from 'react';
import { FileCode, AlertTriangle, CheckCircle } from 'lucide-react';
import type { CodeChange } from '../types';
import { InsightPanel } from './InsightPanel';

interface FileAnalysisProps {
  change: CodeChange;
}

export function FileAnalysis({ change }: FileAnalysisProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <FileCode className="w-5 h-5 text-blue-600" />
          <span className="font-medium">{change.filePath}</span>
        </div>
        <div className={`flex items-center ${getRiskColor(change.riskLevel)}`}>
          {change.riskLevel === 'high' ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span className="ml-1 capitalize">{change.riskLevel} Risk</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="text-sm">
          <span className="text-gray-600">Added Lines:</span>
          <span className="ml-2 text-green-600">+{change.addedLines}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Removed Lines:</span>
          <span className="ml-2 text-red-600">-{change.removedLines}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Complexity:</span>
          <span className={`ml-2 ${change.complexity > 10 ? 'text-red-600' : 'text-gray-900'}`}>
            {change.complexity}
          </span>
        </div>
      </div>

      {change.codeSnippet && (
        <div className="mt-2">
          <pre className="bg-gray-50 rounded p-2 text-sm overflow-x-auto">
            {change.codeSnippet}
          </pre>
        </div>
      )}

      {change.insights && change.insights.length > 0 && (
        <InsightPanel insights={change.insights} />
      )}
    </div>
  );
}