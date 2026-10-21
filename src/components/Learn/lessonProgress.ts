export type LessonProgress = { currentStep: number; lastStep: number };

export function readLessonProgress(value: unknown, total: number): LessonProgress | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value) || total < 1) return undefined;
  const current = 'currentStep' in value ? value.currentStep : undefined;
  const last = 'lastStep' in value ? value.lastStep : undefined;
  const isIndex = (index: unknown): index is number => typeof index === 'number' && Number.isSafeInteger(index);
  if (!isIndex(current) && !isIndex(last)) return undefined;

  const clamp = (index: number) => Math.min(total - 1, Math.max(0, index));
  const currentStep = isIndex(current) ? clamp(current) : 0;
  const lastStep = Math.max(currentStep, isIndex(last) ? clamp(last) : 0);
  return { currentStep, lastStep };
}
