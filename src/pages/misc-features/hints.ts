// hints.ts
export const HINTS: Record<string, string[]> = {
  challenge_1: ['Try using a loop', 'Remember base case for recursion'],
  challenge_2: ['Consider edge cases', 'Use memoization for optimization'],
  // Add hints for each challenge as needed
};

export function fetchHints(challengeId: string): string[] {
  return HINTS[challengeId] || ['No hints available for this challenge'];
}
