export interface CodeChange {
  filePath: string;
  addedLines: number;
  removedLines: number;
  isTest: boolean;
  complexity: number;
  riskLevel: 'low' | 'medium' | 'high';
  codeSnippet?: string;
  insights?: ChangeInsight[];
}

export interface ChangeInsight {
  type: 'TEST_CODE' | 'BUSINESS_LOGIC' | 'REFACTOR' | 'SECURITY';
  summary: string;
  lines: [number, number];
}

export interface AnalysisReport {
  changes: CodeChange[];
  stats: {
    totalFiles: number;
    testFiles: number;
    businessFiles: number;
    totalComplexity: number;
    averageComplexity: number;
    highRiskFiles: number;
  };
  summary?: string;
}

export interface ClassificationRule {
  patterns: RegExp[];
  labels: string[];
}

export interface ClassificationRuleSet {
  [key: string]: {
    patterns: string[];
    labels: string[];
  };
}