import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { AnalysisStats } from './components/AnalysisStats';
import { FileAnalysis } from './components/FileAnalysis';
import type { AnalysisReport } from './types';

const mockReport: AnalysisReport = {
  changes: [
    {
      filePath: 'src/services/auth.js',
      addedLines: 45,
      removedLines: 12,
      isTest: false,
      complexity: 12,
      riskLevel: 'high',
      codeSnippet: `function validateUser(token) {
  // Complex validation logic
  if (token.length < 32) return false;
  const decoded = decodeJWT(token);
  if (!decoded) return false;
  return checkUserPermissions(decoded);
}`,
      insights: [
        {
          type: 'SECURITY',
          summary: 'Added JWT token validation',
          lines: [45, 48]
        },
        {
          type: 'BUSINESS_LOGIC',
          summary: 'User permission check implementation',
          lines: [47, 48]
        }
      ]
    },
    {
      filePath: 'tests/auth.test.js',
      addedLines: 23,
      removedLines: 0,
      isTest: true,
      complexity: 4,
      riskLevel: 'low',
      codeSnippet: `test('should validate user token', () => {
  const token = generateTestToken();
  expect(validateUser(token)).toBe(true);
});`,
      insights: [
        {
          type: 'TEST_CODE',
          summary: 'New test case for token validation',
          lines: [1, 4]
        }
      ]
    }
  ],
  stats: {
    totalFiles: 2,
    testFiles: 1,
    businessFiles: 1,
    totalComplexity: 16,
    averageComplexity: 8,
    highRiskFiles: 1
  },
  summary: `## Key Changes
- Added JWT token validation with security checks
- Implemented user permission verification
- Added corresponding test coverage`
};

function App() {
  const [report] = useState<AnalysisReport>(mockReport);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SiGithub className="w-8 h-8 text-gray-900" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                RepoInsight
              </h1>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Repository
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AnalysisStats stats={report.stats} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">Code Changes Analysis</h2>
          <div className="space-y-4">
            {report.changes.map((change, index) => (
              <FileAnalysis key={index} change={change} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;