import React from 'react';
import styles from './styles.module.scss';
import { Question, Selection } from './utils';
import useLocalStorage from '@site/src/utils/useLocalStorage';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { useMDXComponents } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { readReviewRecords, readReviewResponse } from './reviewStorage';

interface ReviewProps {
  children: React.ReactNode;
  Correct: number;
}

function parseReviewContents(data: React.ReactNode, correctOption: number, components: MDXComponents) {
  const content: {
    label: string;
    questionText: React.ReactNode;
    answerOptions: { answerText: React.ReactNode; isCorrect: boolean }[];
  } = { label: '', questionText: '', answerOptions: [] };
  React.Children.forEach(data, (item) => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(item)) return;
    const { children } = item.props;
    const tag = ['h2', 'p', 'ol', 'ul'].find((name) => item.type === name || item.type === components[name]);
    switch (tag) {
      case 'h2':
        content.label = typeof children === 'string' ? children : '';
        break;
      case 'p':
        content.questionText = children;
        break;
      case 'ol':
      case 'ul':
        React.Children.forEach(children, (option) => {
          if (
            React.isValidElement<{ children?: React.ReactNode }>(option) &&
            (option.type === 'li' || option.type === components.li)
          ) {
            content.answerOptions.push({
              answerText: option.props.children,
              isCorrect: correctOption === content.answerOptions.length,
            });
          }
        });
        break;
    }
  });
  return content;
}

export default function Review({ Correct, children }: ReviewProps) {
  const questions = parseReviewContents(children, Correct - 1, useMDXComponents());
  useBrokenLinks().collectAnchor(questions.label);
  const {
    metadata: { id },
  } = useDoc();
  const [records, setRecords, loaded] = useLocalStorage('Points', {}, readReviewRecords);
  const selected = readReviewResponse(records[id], questions.answerOptions.length);
  const isCorrect = selected !== undefined && questions.answerOptions[selected].isCorrect;

  const handleSelect = (response: number) => {
    if (!loaded || selected !== undefined || !questions.answerOptions[response]) return;
    setRecords((previous) => ({
      ...previous,
      [id]: { checked: true, response, isCorrect: questions.answerOptions[response].isCorrect },
    }));
  };
  const options = questions.answerOptions.map((option, index) => (
    <>
      {option.answerText}
      {selected !== undefined &&
        (option.isCorrect ? (
          <>
            {' '}
            <BsCheckCircleFill color='#0070f3' />
          </>
        ) : index === selected ? (
          <>
            {' '}
            <BsXCircleFill color='#e00' />
          </>
        ) : null)}
    </>
  ));
  const message =
    selected === undefined ? null : isCorrect ? (
      <p className={styles.CorrectOption}>
        <BsCheckCircleFill style={{ marginRight: '5px' }} />
        答對了，做得不錯！
      </p>
    ) : (
      <p className={styles.WrongOption}>
        <BsXCircleFill style={{ marginRight: '5px' }} />
        答錯了，但是個很好的嘗試！
      </p>
    );
  return (
    <div className={styles.Quiz} id={questions.label}>
      <Question header={questions.label} text={questions.questionText} excerpt={message} />
      <Selection options={options} onSelect={handleSelect} isDisabled={!loaded || selected !== undefined} />
    </div>
  );
}
