import { Converter } from 'opencc-js';
import type { LessonData } from './types';

// Compare both scripts in one form; retain original text for passage highlighting.
const toSimplified = Converter({ from: 'hk', to: 'cn' });
export const normalizeAnswer = (value: string) => toSimplified(value.normalize('NFKC').trim());
export const findAnswer = (answers: string[], input: string) =>
  answers.find(answer => normalizeAnswer(answer) === normalizeAnswer(input));

// Regex is only a literal text-highlighting implementation detail.
// Use the original accepted text so simplified input highlights a traditional passage.
export function getHighlightRegex(data: Pick<LessonData, 'suggestedAnswer'>, inputValue: string): RegExp | null {
  const text = findAnswer(data.suggestedAnswer ?? [], inputValue) ?? inputValue;
  return text ? new RegExp(`(${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gmi') : null;
}

const checkRegex = (data: LessonData, inputValue: string) => {
  const isSuccess = findAnswer(data.suggestedAnswer ?? [], inputValue) !== undefined;
  const regex = getHighlightRegex(data, inputValue);
  const results = regex ? Array.from((data.content ?? '').matchAll(regex), result => result[0]).sort() : [];
  const expected = [...(data.regexMatch ?? [])].sort();
  const isMatch = data.regexMatch !== undefined && expected.length === results.length &&
    expected.every((text, index) => text === results[index]);
  return { isMatch, isSuccess };
};

export default checkRegex;
