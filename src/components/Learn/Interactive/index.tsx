import React, { useState, useEffect, useRef } from 'react';
import Hint from '../Hint';
import tagWrapper from '@site/src/utils/tagWrapper';
import checkRegex, { findAnswer, getHighlightRegex } from '../checkRegex';
import cx from 'classnames';
import styles from './index.module.scss';

export default ({ data, step, parentError, onChangeSuccess, setIsOpenModal }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(data?.initialValue || '');
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState(false);

  const applyRegex = () => {
    if (data.applyRegex === false) {
      const isCorrect = findAnswer(data.suggestedAnswer, inputValue) !== undefined;
      setMatch(isCorrect);
      setSuccess(isCorrect);
      onChangeSuccess(isCorrect);
      setError(!isCorrect);
      return;
    }
    const { isSuccess, isMatch } = checkRegex(data, inputValue);
    setMatch(isMatch);
    setSuccess(isSuccess);
    onChangeSuccess(isSuccess);
    setError(!(isSuccess || isMatch));
    const highlightRegex = getHighlightRegex(data, inputValue);
    setContent(highlightRegex ? tagWrapper({
        value: data.content,
        regex: highlightRegex,
        attributes: { class: styles.ResultTag },
      }) : data.content);
  };

  const resetStep = () => {
    setInputValue(data?.initialValue || '');
    setContent('');
    setError(false);
    setSuccess(false);
    onChangeSuccess(false);
    setMatch(false);
  };

  useEffect(() => {
    resetStep();
    const isCompletedStep = step.currentStep < step.lastStep;
    const currentRegex = isCompletedStep ? data.suggestedAnswer[0] : data.initialValue;

    setInputValue(currentRegex || '');
    inputRef?.current?.blur();
  }, [step]);

  useEffect(() => {
    applyRegex();
  }, [inputValue, step, data]);

  const readableContent = (content || data.content || '').replace(/\n/gm, '<br />');

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
        {!data.noHint && <Hint answer={data.suggestedAnswer} step={step} />}
        <div className={styles.InputWrapper}>
          {data.prefix}
          <input
            ref={inputRef}
            type='text'
            className={styles.Input}
            style={{ width: `calc(${Math.max([...inputValue].length, data?.placeholder?.length || 0, 3)} * 1.1em + 12px)` }}
            aria-label='你的答案'
            aria-invalid={Boolean(inputValue && error)}
            autoComplete='off'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={data?.placeholder}
          />
          {data.suffix}
        </div>
        {data.videoURL && (
          <div className={styles.WatchButton} onClick={() => setIsOpenModal(true)}>
            📹 觀看影片
          </div>
        )}
      </div>
    </div>
  );
};
