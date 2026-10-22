import React, { useState, useEffect, useRef } from 'react';
import Hint from '../Hint';
import tagWrapper from '@site/src/utils/tagWrapper';
import checkRegex, { findAnswer, getHighlightRegex } from '../checkRegex';
import cx from 'clsx';
import styles from './index.module.scss';
import type { LessonData } from '../types';
import type { LessonProgress } from '../lessonProgress';

type Props = {
  data: LessonData;
  step: LessonProgress;
  parentError: boolean;
  onChangeSuccess: (success: boolean) => void;
};

export default function Interactive({ data, step, parentError, onChangeSuccess }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  // Step is keyed by the parent: initialize once for a new or revisited question.
  const [inputValue, setInputValue] = useState(
    () => (step.currentStep < step.lastStep ? data.suggestedAnswer?.[0] : data.initialValue) || '',
  );
  const result =
    data.applyRegex === false
      ? {
          isSuccess: findAnswer(data.suggestedAnswer ?? [], inputValue) !== undefined,
          isMatch: findAnswer(data.suggestedAnswer ?? [], inputValue) !== undefined,
        }
      : checkRegex(data, inputValue);
  const { isSuccess: success, isMatch: match } = result;
  const error = !(success || match);
  const highlightRegex = data.applyRegex === false ? undefined : getHighlightRegex(data, inputValue);
  const content = highlightRegex
    ? tagWrapper({ value: data.content || '', regex: highlightRegex, attributes: { class: styles.ResultTag } })
    : data.content || '';
  const readableContent = content.replace(/\n/gm, '<br />');
  useEffect(() => {
    onChangeSuccess(success);
  }, [success, onChangeSuccess]);

  return (
    <div
      className={cx({
        [styles.Error]: Boolean(inputValue && error),
        [styles.Match]: match,
        [styles.Success]: success,
        [styles.ParentError]: parentError,
      })}
    >
      <div className={styles.BlockContent} data-title='內容' dangerouslySetInnerHTML={{ __html: readableContent }} />
      <div className={styles.BlockRegex} data-title='答案'>
        {!data.noHint && <Hint answer={data.suggestedAnswer ?? []} step={step} />}
        <div className={styles.InputWrapper}>
          {data.prefix}
          <input
            ref={inputRef}
            type='text'
            className={styles.Input}
            style={{
              width: `calc(${Math.max([...inputValue].length, data?.placeholder?.length || 0, 3)} * 1.1em + 12px)`,
            }}
            aria-label='你的答案'
            aria-invalid={Boolean(inputValue && error)}
            autoComplete='off'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={data?.placeholder}
          />
          {data.suffix}
        </div>
      </div>
    </div>
  );
}
