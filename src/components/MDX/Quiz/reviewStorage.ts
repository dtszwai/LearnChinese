export type ReviewRecord = { checked: true; response: number; isCorrect: boolean };
export type ReviewRecords = Record<string, unknown>;

// Preserve other documents' records, including fields from earlier versions.
export function readReviewRecords(value: unknown): ReviewRecords {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? { ...value } : {};
}

export function readReviewResponse(value: unknown, optionCount: number): number | undefined {
  if (value === null || typeof value !== 'object' || !('response' in value)) return undefined;
  const response = value.response;
  return typeof response === 'number' && Number.isInteger(response) && response >= 0 && response < optionCount
    ? response
    : undefined;
}
