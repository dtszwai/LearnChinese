const assert = require('node:assert/strict');
const { test } = require('node:test');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
const React = require('react');
const { render, fireEvent, cleanup } = require('@testing-library/react');
test.afterEach(cleanup);
const loadSource = require('./load-source.cjs');
const lessons = ['description', 'lyricism', 'narrative', 'argumentation', 'classical-chinese'].flatMap((slug) =>
  require('../src/data/Learn/' + slug + '.json'),
);
const Panel = ({ children }) => React.createElement('section', null, children);
const Activities = loadSource('src/components/Learn/Activities/index.tsx', { '../Panel': Panel }).default;

for (const kind of ['choice', 'passage', 'sequence']) {
  test(`${kind}: real lesson buttons lock/unlock and allow correction`, () => {
    const data = lessons.find((step) => step.interaction === kind);
    assert(data, `Missing ${kind} fixture`);
    let success;
    const view = render(
      React.createElement(Activities, {
        data,
        step: { currentStep: 0, lastStep: 0 },
        parentError: false,
        onChangeSuccess: (value) => {
          success = value;
        },
      }),
    );
    assert.equal(success, false);
    const click = (label) => {
      const button = view.getAllByRole('button').find((button) => button.textContent.endsWith(label));
      assert(button, `Button ${label} exists`);
      fireEvent.click(button);
    };
    if (kind === 'sequence') {
      for (const value of data.correctOrder) click(data.options.find((option) => option.value === value).label);
      assert.equal(success, true);
      const remove = view.getByRole('button', { name: '撤回一步' });
      assert(remove);
      fireEvent.click(remove);
      assert.equal(success, false);
    } else {
      const wrong = data.options.find((option) => !data.suggestedAnswer.includes(option.value));
      click(wrong.label);
      assert.equal(success, false);
      click(data.options.find((option) => data.suggestedAnswer.includes(option.value)).label);
      assert.equal(success, true);
      click(wrong.label);
      assert.equal(success, false);
    }
    view.unmount();
  });
}

test('prefilled demonstration remains editable and clearing/wrong answer relocks it', () => {
  const checker = loadSource('src/components/Learn/checkRegex.tsx');
  const Interactive = loadSource('src/components/Learn/Interactive/index.tsx', {
    '../Hint': () => null,
    '../checkRegex': { __esModule: true, ...checker },
    '@site/src/utils/tagWrapper': { __esModule: true, ...loadSource('src/utils/tagWrapper.tsx') },
  }).default;
  const data = lessons.find((step) => step.initialValue);
  let success;
  const view = render(
    React.createElement(Interactive, {
      data,
      step: { currentStep: 1, lastStep: 1 },
      parentError: false,
      onChangeSuccess: (value) => {
        success = value;
      },
    }),
  );
  assert.equal(success, true);
  const input = () => view.getByRole('textbox');
  for (const value of ['錯', '', '动作描写']) {
    fireEvent.change(input(), { target: { value } });
    assert.equal(success, value === '动作描写');
    assert.equal(input().value, value);
  }
  view.unmount();
});

test('Review accepts valid legacy indices and preserves unrelated records', () => {
  const { readReviewRecords, readReviewResponse } = loadSource('src/components/MDX/Quiz/reviewStorage.ts');
  for (const value of [null, [], 1, 'bad']) assert.equal(Object.keys(readReviewRecords(value)).length, 0);
  for (const response of [-1, 4, 1.5, '1', null, Infinity])
    assert.equal(readReviewResponse({ response }, 4), undefined);
  assert.equal(readReviewResponse({ checked: true, response: 1, isCorrect: true }, 4), 1);
  const other = { unknown: { answer: 'keep' } };
  assert.equal(JSON.stringify(readReviewRecords(other)), JSON.stringify(other));
});

test('quiz JSON boundary validates every existing quiz and rejects malformed answers', () => {
  const fs = require('node:fs');
  const { readQuizData } = loadSource('src/components/MDX/Quiz/types.ts');
  for (const name of fs.readdirSync('src/data/Quiz').filter((name) => name.endsWith('.json'))) {
    const quiz = JSON.parse(fs.readFileSync('src/data/Quiz/' + name, 'utf8'));
    assert.equal(readQuizData(quiz).questions.length, quiz.questions.length, name);
  }
  for (const value of [null, {}, { questions: [] }, { questions: [{ questionText: 'x', answerOptions: [{}] }] }]) {
    assert.throws(() => readQuizData(value));
  }
});
