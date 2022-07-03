import React, { useState, useEffect, useRef } from 'react';
import Hint from '../Hint';
import tagWrapper from '@site/src/utils/tagWrapper';
import checkRegex from '../checkRegex';
import cx from 'classnames';
import styles from './index.module.scss';

export default ({ lesson, data, step, isShow, parentError, onChangeSuccess, setIsOpenModal }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(data?.initialValue || '');
  const [content, setContent] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState(false);

  const applyRegex = () => {
    if (!data.interactive) return;
    const { isSuccess, isMatch, err, grouppedRegex } = checkRegex(data, inputValue);
    if (err) {
      setError(Boolean(err));
      return;
    }
    setMatch(isMatch);
    setSuccess(isSuccess);
    if (!data.applyRegex) return;
    setError(!((isChanged && isSuccess) || isMatch));
    setContent(
      tagWrapper({
        value: data.content,
        regex: inputValue ? grouppedRegex : null,
        attributes: { class: styles.ResultTag },
      }),
    );
  };

  const onChange = (e) => {
    setIsChanged(true);
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setError(false);
    if (data.interactive === false) {
      setSuccess(true);
      return;
    }
    setSuccess(false);

    const lastStep = localStorage.getItem(`lesson.${lesson.slug}`)
      ? JSON.parse(localStorage.getItem(`lesson.${lesson.slug}`))?.lastStep
      : 0;

    const isCompletedStep = step < lastStep;
    const currentRegex = isCompletedStep ? data.suggestedAnswer[0] : data.initialValue;

    applyRegex();
    setInputValue(currentRegex || '');
    setIsChanged(false);
    inputRef?.current?.blur();
  }, [step]);

  useEffect(() => {
    onChangeSuccess(success);
  }, [success]);

  const handleFocus = (e) => {
    if (e.keyCode !== 9) return; // Tab
    e.preventDefault();
    inputRef?.current?.focus();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleFocus);
    return () => window.removeEventListener('keydown', handleFocus);
  }, []);

  useEffect(() => {
    applyRegex();
  }, [inputValue, step, data, isChanged]);

  if (!isShow) return null;

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
        {!data.noHint && <Hint answer={data.suggestedAnswer} />}
        <div className={styles.InputWrapper} data-prefix={data?.prefix} data-suffix={data?.suffix}>
          <input
            ref={inputRef}
            key={step}
            type='text'
            className={styles.Input}
            style={{ width: Math.max(inputValue.length * 16, 60, data?.placeholder.length * 16) }}
            readOnly={data.readOnly}
            value={inputValue}
            onChange={onChange}
            placeholder={data?.placeholder}
          />
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
