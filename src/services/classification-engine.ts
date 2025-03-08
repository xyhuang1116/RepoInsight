import { LRUCache } from 'lru-cache';
import type { ClassificationRuleSet, ClassificationRule } from '../types';

export const RULE_SET: ClassificationRuleSet = {
  TEST_CODE: {
    patterns: [
      /(describe|it|test)\(/.source,
      /render\(.*TestingLibrary/.source
    ],
    labels: ['Test Case', 'Coverage Change']
  },
  BUSINESS_LOGIC: {
    patterns: [
      /class\s+\w+Service/.source,
      /interface\s+\w+Repository/.source,
      /function\s+handle\w+/.source
    ],
    labels: ['Business Logic', 'Domain Model']
  },
  REFACTOR: {
    patterns: [
      /refactor|optimize|improve/.source,
      /extract\w+/.source
    ],
    labels: ['Code Improvement', 'Optimization']
  },
  SECURITY: {
    patterns: [
      /verify|validate|authenticate/.source,
      /encrypt|decrypt|hash/.source
    ],
    labels: ['Security', 'Authentication']
  }
};

// Pre-compile regular expressions
const compiledRules = Object.entries(RULE_SET).reduce((acc, [type, rule]) => {
  acc[type] = {
    patterns: rule.patterns.map(p => new RegExp(p, 'i')),
    labels: rule.labels
  };
  return acc;
}, {} as Record<string, ClassificationRule>);

// Initialize LRU cache
const summaryCache = new LRUCache<string, string>({
  max: 500,
  ttl: 60_000,
  allowStale: false
});

export function detectChangePattern(content: string): string[] {
  const cacheKey = content.trim();
  const cached = summaryCache.get(cacheKey);
  if (cached) return [cached];

  const matches = Object.entries(compiledRules)
    .filter(([, rule]) => 
      rule.patterns.some(pattern => pattern.test(content))
    )
    .map(([type]) => type);

  if (matches.length > 0) {
    summaryCache.set(cacheKey, matches[0]);
  }

  return matches;
}

export function generateNLG(content: string): string {
  const patterns = detectChangePattern(content);
  if (patterns.length === 0) return 'General code changes';

  const pattern = patterns[0];
  const rule = RULE_SET[pattern];
  return rule.labels[0];
}