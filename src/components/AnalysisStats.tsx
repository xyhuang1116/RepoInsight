import React from 'react';
import { BarChart2, FileText, TestTube2, Brain } from 'lucide-react';
import type { AnalysisReport } from '../types';

interface AnalysisStatsProps {
  stats: AnalysisReport['stats'];
}

export function AnalysisStats({ stats }: AnalysisStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium">Total Files</h3>
        </div>
        <p className="text-2xl font-bold">{stats.totalFiles}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-2 mb-2">
          <TestTube2 className="w-5 h-5 text-purple-600" />
          <h3 className="font-medium">Test Coverage</h3>
        </div>
        <p className="text-2xl font-bold">
          {((stats.testFiles / stats.totalFiles) * 100).toFixed(1)}%
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="w-5 h-5 text-green-600" />
          <h3 className="font-medium">Avg Complexity</h3>
        </div>
        <p className="text-2xl font-bold">{stats.averageComplexity.toFixed(1)}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart2 className="w-5 h-5 text-red-600" />
          <h3 className="font-medium">High Risk Files</h3>
        </div>
        <p className="text-2xl font-bold">{stats.highRiskFiles}</p>
      </div>
    </div>
  );
}