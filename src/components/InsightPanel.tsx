import React from 'react';
import { Lightbulb } from 'lucide-react';
import type { ChangeInsight } from '../types';

interface InsightPanelProps {
  insights: ChangeInsight[];
}

export function InsightPanel({ insights }: InsightPanelProps) {
  return (
    <div className="mt-4 bg-blue-50 rounded-lg p-4">
      <div className="flex items-center mb-2">
        <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="font-medium text-blue-900">AI Insights</h3>
      </div>
      <div className="space-y-2">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
            <div>
              <span className="font-medium text-blue-900">{insight.type}</span>
              <p className="text-sm text-blue-700">{insight.summary}</p>
              <span className="text-xs text-blue-600">
                Lines {insight.lines[0]}-{insight.lines[1]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}