import React, { useState, useEffect, useRef } from 'react';
import Hint from '../Hint';
import tagWrapper from '@site/src/utils/tagWrapper';
import checkRegex from '../checkRegex';
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
      const isCorrect = data.suggestedAnswer.includes(inputValue);
      setMatch(isCorrect);
      setSuccess(isCorrect);
      onChangeSuccess(isCorrect);
      setError(isCorrect);
      return;
    }
    const { isSuccess, isMatch, err } = checkRegex(data, inputValue);

    if (err) {
      setError(Boolean(err));
      return;
    }
    setMatch(isMatch);
    setSuccess(isSuccess);
    onChangeSuccess(isSuccess);
    setError(!(isSuccess || isMatch));
    setContent(
      tagWrapper({
        value: data.content,
        regex: inputValue ? new RegExp(`(${inputValue})`, 'gmi') : null,
        attributes: { class: styles.ResultTag },
      }),
    );
  };

  const handleFocus = (e) => {
    if (e.keyCode !== 9) return; // Tab
    e.preventDefault();
    inputRef?.current?.focus();
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
    addEventListener('keydown', handleFocus);
    const isCompletedStep = step.currentStep < step.lastStep;
    const currentRegex = isCompletedStep ? data.suggestedAnswer[0] : data.initialValue;

    setInputValue(currentRegex || '');
    inputRef?.current?.blur();
    return () => window.removeEventListener('keydown', handleFocus);
  }, [step]);

  useEffect(() => {
    applyRegex();
  }, [inputValue, step, data]);

  const readableContent = (content || data.content || '').replace(/\n/gm, '<br />');

  return (
    <div
      className={cx({
        [styles.Error]: error,
        [styles.Match]: match,
        [styles.Success]: success,
        [styles.ParentError]: parentError,
      })}
    >
      <div className={styles.BlockContent} data-title={`問題`} dangerouslySetInnerHTML={{ __html: readableContent }} />
      <div className={styles.BlockRegex} data-title={`答案`}>
        <div className={styles.WatchButton} onClick={() => setIsOpenModal(true)}>
          {data.videoURL && `📹 觀看影片`}
        </div>
        <div className={styles.InputWrapper} data-prefix={data?.prefix} data-suffix={data?.suffix}>
          <input
            ref={inputRef}
            type='text'
            className={styles.Input}
            style={{ width: Math.max(inputValue.length * 16, 60, data?.placeholder?.length * 16 || 0) }}
            readOnly={data.readOnly}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={data?.placeholder}
          />
        </div>
        {!data.noHint && <Hint answer={data.suggestedAnswer} />}
      </div>
    </div>
  );
};
