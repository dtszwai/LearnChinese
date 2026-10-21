import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import Panel from '../Panel';
import { LessonData } from '../types';
import styles from './index.module.scss';

type Props = {
  data: LessonData;
  step: { currentStep: number; lastStep: number };
  parentError: boolean;
  onChangeSuccess: (success: boolean) => void;
};

export default function Activities({ data, step, parentError, onChangeSuccess }: Props) {
  const completed = step.currentStep < step.lastStep;
  const [selected, setSelected] = useState(completed ? data.suggestedAnswer[0] : '');
  const [order, setOrder] = useState<string[]>(completed ? data.correctOrder || [] : []);
  const options = data.options || [];
  const sequence = data.interaction === 'sequence';
  const ready = sequence ? order.length === options.length : Boolean(selected);
  const success = sequence
    ? ready && order.every((value, i) => value === data.correctOrder[i])
    : data.suggestedAnswer.includes(selected);

  useEffect(() => {
    onChangeSuccess(success);
  }, [success, onChangeSuccess]);

  const hintAnswers = useMemo(() => data.interaction === 'sequence' ? data.suggestedAnswer :
    (data.options || []).filter((option) => data.suggestedAnswer.includes(option.value)).map((option) => option.label), [data]);

  const optionButton = (value: string, label: string, inline = false) => (
    <button
      key={value}
      type='button'
      aria-pressed={selected === value}
      className={cx(styles.Option, {
        [styles.Inline]: inline,
        [styles.Selected]: selected === value,
        [styles.Correct]: selected === value && success,
        [styles.Incorrect]: selected === value && !success,
      })}
      onClick={() => setSelected(value)}
    >
      {label}
    </button>
  );

  // Literal text selection: pupils click words in the passage, never a pattern.
  const passage = () => {
    const content = data.content || '';
    const parts: React.ReactNode[] = [];
    let cursor = 0;
    while (cursor < content.length) {
      const next = options
        .map((option) => ({ ...option, index: content.indexOf(option.label, cursor) }))
        .filter((option) => option.index >= 0)
        .sort((a, b) => a.index - b.index || b.label.length - a.label.length)[0];
      if (!next) {
        parts.push(content.slice(cursor));
        break;
      }
      parts.push(content.slice(cursor, next.index));
      parts.push(<React.Fragment key={next.index}>{optionButton(next.value, next.label, true)}</React.Fragment>);
      cursor = next.index + next.label.length;
    }
    return parts;
  };

  return (
    <>
    <Panel title='內容' answer={null} step={step}>
    <section className={styles.Activity} aria-label='互動練習'>
      {data.content && <div className={styles.Passage}>{data.interaction === 'passage' ? passage() : data.content}</div>}
      {data.interaction === 'choice' && (
        <div className={styles.Options} role='group' aria-label='選擇答案'>
          {options.map((option) => optionButton(option.value, `${option.value}. ${option.label}`))}
        </div>
      )}
      {sequence && (
        <>
          <p className={styles.Instruction}>按先後次序點選事件；可撤回或重新排列。</p>
          <ol className={styles.Order} aria-label='已排列的事件'>
            {order.map((value) => <li key={value}>{options.find((option) => option.value === value)?.label}</li>)}
          </ol>
          <div className={styles.Options} role='group' aria-label='待排列的事件'>
            {options.map((option) => (
              <button
                className={styles.Option}
                type='button'
                key={option.value}
                disabled={order.includes(option.value)}
                onClick={() => setOrder((previous) => [...previous, option.value])}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className={styles.Actions}>
            <button type='button' disabled={!order.length} onClick={() => setOrder((previous) => previous.slice(0, -1))}>撤回一步</button>
            <button type='button' disabled={!order.length} onClick={() => setOrder([])}>重新排列</button>
          </div>
        </>
      )}
    </section>
    </Panel>
    <Panel title='答案' answer={!data.noHint && hintAnswers} step={step} status={parentError || (ready && !success) ? 'error' : success ? 'correct' : ''}>
      <div className={styles.Feedback} role='status' aria-live='polite'>
        {success ? <><strong>答對了！</strong>{data.explanation && <p>{data.explanation}</p>}</> :
          ready ? '再想一想，留意題目要求和文字線索。你可以修改答案。' :
            sequence ? `已排列 ${order.length} / ${options.length} 項` :
              data.interaction === 'passage' ? '請點選原句中符合題意的詞語。' : '請點選一個答案。'}
      </div>
    </Panel>
    </>
  );
}
