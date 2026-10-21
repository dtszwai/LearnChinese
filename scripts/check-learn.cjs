// Validate lesson data against the real extraction checker and editorial records.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const loadSource = require('../tests/load-source.cjs');
const root = path.resolve(__dirname, '..');
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const index = read('src/data/Learn/index.json');
const sources = read('teaching/learn/sources.json').sources;
const reviews = read('teaching/learn/review.json').lessons;
const moduleExports = loadSource(path.join(root, 'src/components/Learn/checkRegex.tsx'));
const checkRegex = moduleExports.default;
const { findAnswer, normalizeAnswer, getHighlightRegex } = moduleExports;
assert.equal(findAnswer(['動作描寫'], '动作描写'), '動作描寫', 'Simplified short answer');
assert.equal(findAnswer(['頭髮'], ' 头发 '), '頭髮', 'Simplified characters and surrounding whitespace');
assert.equal(findAnswer(['動作描寫'], '心理描写'), undefined, 'Wrong answer must stay wrong');
assert.equal(findAnswer(['動作描寫'], ''), undefined, 'Empty answer must stay wrong');
assert.equal(findAnswer(['動作描寫'], '.*'), undefined, 'Patterns cannot bypass accepted answers');
const literalStep = { content: '甲(乙)+ 甲乙乙 <b>頭髮</b>', suggestedAnswer: ['甲(乙)+'], regexMatch: ['甲(乙)+'] };
assert(checkRegex(literalStep, '甲(乙)+').isSuccess, 'Accepted punctuation is literal text');
assert.deepEqual(
  Array.from(literalStep.content.matchAll(getHighlightRegex(literalStep, '甲(乙)+')), (match) => match[0]),
  ['甲(乙)+'],
);
for (const input of ['[', '(', '\\', '.*', '(a+)+$', '甲|乙', '^甲']) {
  assert(!checkRegex(literalStep, input).isSuccess, 'Regex syntax cannot unlock an answer');
  assert.doesNotThrow(() => getHighlightRegex(literalStep, input), 'Any student input is safe literal text');
}
const separateStep = { content: '原句沒有答案', suggestedAnswer: ['動作描寫'], regexMatch: ['其他標示'] };
assert(checkRegex(separateStep, '动作描写').isSuccess, 'Answer correctness is independent of highlighting');
assert(!checkRegex(separateStep, '动作描写').isMatch, 'Highlighting still reports its own match state');
assert.equal(
  '頭髮'.match(getHighlightRegex({ suggestedAnswer: ['頭髮'] }, '头发'))?.[0],
  '頭髮',
  'Highlight original traditional text',
);

const progressExports = loadSource(path.join(root, 'src/components/Learn/lessonProgress.ts'));
const { readLessonProgress } = progressExports;
const progressEqual = (input, expected) =>
  assert.equal(JSON.stringify(readLessonProgress(input, 21)), JSON.stringify(expected));
for (const invalid of [
  null,
  [],
  '3',
  4,
  {},
  { currentStep: '2', lastStep: NaN },
  { currentStep: 1.5, lastStep: Infinity },
])
  progressEqual(invalid, undefined);
progressEqual({ currentStep: 5, lastStep: 12 }, { currentStep: 5, lastStep: 12 });
progressEqual({ currentStep: 90, lastStep: 100 }, { currentStep: 20, lastStep: 20 });
progressEqual({ currentStep: -5, lastStep: 9 }, { currentStep: 0, lastStep: 9 });
progressEqual({ currentStep: 7 }, { currentStep: 7, lastStep: 7 });
progressEqual({ lastStep: 10 }, { currentStep: 0, lastStep: 10 });
progressEqual({ currentStep: 7, lastStep: 2 }, { currentStep: 7, lastStep: 7 });
const ids = new Set();
const storageKeys = new Set();
let total = 0;
let exercises = 0;
let accepted = 0;

for (const [slug, lesson] of Object.entries(index)) {
  assert.equal(lesson.slug, slug, `${slug}: route slug`);
  assert(!storageKeys.has(lesson.key), `${slug}: duplicate storage key`);
  storageKeys.add(lesson.key);
  const steps = read(`src/data/Learn/${slug}.json`);
  assert(steps.length > 0, `${slug}: empty lesson`);
  const reviewById = new Map((reviews[slug] || []).map((item) => [item.stepId, item]));
  if (reviews[slug]) {
    assert.equal(reviewById.size, steps.length, `${slug}: one review record per step`);
    assert.equal(steps[0].interactive, false, `${slug}: needs introduction`);
    assert.equal(steps.at(-1).interactive, false, `${slug}: needs completion page`);
    assert(steps.at(-1).title.includes('已完成'), `${slug}: completed ending`);
    assert(
      steps.some((step) => step.initialValue),
      `${slug}: needs editable worked example`,
    );
    assert(
      steps.some((step) => /辨|混淆/.test(step.title)),
      `${slug}: needs contrast case`,
    );
  }
  for (const [i, step] of steps.entries()) {
    const label = `${slug} step ${i + 1}`;
    total++;
    assert.equal(typeof step.title, 'string', `${label}: title`);
    if (step.image) assert(fs.existsSync(path.join(root, 'static', step.image)), `${label}: image`);
    if (reviews[slug]) {
      assert(step.id && !ids.has(step.id), `${label}: unique step ID`);
      ids.add(step.id);
      const review = reviewById.get(step.id);
      assert(review, `${label}: missing review`);
      assert(review.rationale?.length > 0, `${label}: answer rationale`);
      assert(review.sources.length > 0, `${label}: source required`);
      for (const source of review.sources)
        assert(sources[source]?.url?.startsWith('https://'), `${label}: unknown source ${source}`);
      if (step.interactive !== false)
        assert.deepEqual(review.acceptedAnswers, step.suggestedAnswer, `${label}: stale answer review`);
    }
    if (step.interactive === false) continue;
    exercises++;
    assert.equal(typeof step.content, 'string', `${label}: content`);
    assert(step.suggestedAnswer?.length > 0, `${label}: accepted answers`);
    assert.equal(new Set(step.suggestedAnswer).size, step.suggestedAnswer.length, `${label}: duplicate answer`);
    for (const answer of step.suggestedAnswer) {
      accepted++;
      assert(typeof answer === 'string' && answer.trim().length > 0, `${label}: nonempty answer`);
      assert.equal(answer, answer.trim(), `${label}: accidental whitespace`);
      if (step.applyRegex !== false) {
        const result = checkRegex(step, answer);
        assert(!result.err && result.isSuccess, `${label}: accepted answer cannot unlock: ${answer}`);
        assert(result.isMatch, `${label}: original passage highlighting changed: ${answer}`);
        assert(
          checkRegex(step, normalizeAnswer(answer)).isSuccess,
          `${label}: simplified extraction answer cannot unlock: ${answer}`,
        );
        assert(
          checkRegex(step, normalizeAnswer(answer)).isMatch,
          `${label}: simplified input must highlight the original text: ${answer}`,
        );
      }
      assert(
        findAnswer(step.suggestedAnswer, normalizeAnswer(answer)) !== undefined,
        `${label}: simplified answer rejected`,
      );
    }
    assert(!step.readOnly, `${label}: answers must remain editable, including demonstrations`);
    if (step.initialValue)
      assert(step.suggestedAnswer.includes(step.initialValue), `${label}: demonstration cannot unlock`);
    if (step.applyRegex !== false) {
      for (const wrong of ['', '錯誤答案', '[']) {
        assert(!checkRegex(step, wrong).isSuccess, `${label}: wrong answer unlocks`);
      }
    }
    if (step.interaction) {
      assert(step.options?.length >= 2, `${label}: meaningful options required`);
      assert.equal(
        new Set(step.options.map((option) => option.value)).size,
        step.options.length,
        `${label}: duplicate options`,
      );
      assert(
        step.options.every((option) => option.label && option.value),
        `${label}: empty option`,
      );
      assert(step.explanation?.length > 0, `${label}: feedback required`);
      const values = step.options.map((option) => option.value);
      if (step.interaction === 'sequence') {
        assert.deepEqual(
          [...step.correctOrder].sort(),
          [...values].sort(),
          `${label}: ordering must use every event once`,
        );
        assert.notDeepEqual(step.correctOrder, values, `${label}: events already in answer order`);
      } else {
        assert(values.includes(step.suggestedAnswer[0]), `${label}: correct option missing`);
        assert(
          values.some((value) => !step.suggestedAnswer.includes(value)),
          `${label}: needs a distractor`,
        );
      }
      if (step.interaction === 'passage') {
        for (const option of step.options)
          assert(step.content.includes(option.label), `${label}: clickable text absent`);
      }
    }
  }
  console.log(`${slug}: ${steps.length} steps validated`);
}
assert(
  Object.keys(reviews).every((slug) => index[slug]),
  'Orphan lesson reviews',
);
console.log(
  `PASS: ${total} steps, ${exercises} interactive steps, ${accepted} accepted answers; source mappings and extraction checks passed.`,
);
