import React from 'react';
import styles from './styles.module.scss';

interface Question {
  header: string;
  text: React.ReactNode;
  excerpt?: React.ReactNode;
}

export const Question = ({ header, text, excerpt }: Question) => (
  <div className={styles.Question}>
    <h2>{header}</h2>
    {typeof text === 'string' ? (
      <p
        dangerouslySetInnerHTML={{
          __html: `${text.replace(/\\n/gm, '<br />').replace(/`(.*?)`/g, '<code>$1</code>')}`,
        }}
      />
    ) : (
      <p>{text}</p>
    )}
    {excerpt}
  </div>
);

interface Selection {
  options: React.ReactNode[];
  onSelect: (selectedOptionIndex: number) => void;
  isDisabled?: boolean;
}

export const Selection = ({ options, onSelect, isDisabled }: Selection) => (
  <div className={styles.Selection}>
    {options.map((option, i) => (
      <button className={styles.btn} onClick={() => onSelect(i)} key={i} disabled={isDisabled}>
        {String.fromCharCode(i + 65)}. {option}
      </button>
    ))}
  </div>
);

export const WrongAnswer = (result: boolean[]) => {
  let arr = result
    .map((e, i) => (!e ? i + 1 : ''))
    .filter(String)
    .join('、');
  return arr.length ? `錯題：${arr}` : null;
};
