import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Question, Selection } from './utils';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

interface Review {
  question: string;
  label?: string;
  children: React.ReactElement[];
  Correct: number;
}

interface Questions {
  label: string;
  questionText: string;
  answerOptions: { answerText: string; isCorrect?: boolean }[];
}

const parseReviewContents = (
  children: React.ReactElement[],
  correctOption: number,
) => {
  const content = { answerOptions: [] } as Questions;
  if (!children) return content;
  React.Children.forEach(children, (item) => {
    const { props } = item;
    switch (props.mdxType) {
      case 'h2':
        content.label = props.children;
        break;
      case 'p':
        content.questionText = props.children;
        break;
      case 'ol':
      case 'ul':
        props.children.forEach((child, i) => {
          content.answerOptions.push({
            answerText: child.props.children,
            isCorrect: correctOption === i,
          });
        });
        break;
    }
  });
  return content;
};

export default ({ Correct, children }: Review) => {
  if (!ExecutionEnvironment.canUseDOM) return null;
  const questions = parseReviewContents(children, Correct - 1);
  const [message, setMessage] = useState<React.ReactNode>(null);
  const [options, setOptions] = useState<React.ReactNode[]>(
    questions.answerOptions.map((option) => option.answerText),
  );
  const {
    activeDoc: { id },
  } = useActiveDocContext();
  const data = JSON.parse(localStorage.getItem('Points'));

  const handleSelect = (index: number) => {
    localStorage.setItem(
      'Points',
      JSON.stringify({
        ...data,
        [id]: {
          checked: true,
          response: index,
          isCorrect: questions.answerOptions[index].isCorrect,
        },
      }),
    );
    renderedReview(index);
  };

  const renderedReview = (index) => {
    const isCorrect = questions.answerOptions[index].isCorrect;
    setOptions(
      questions.answerOptions.map((option, i) => {
        return option.isCorrect ? (
          <>
            {option.answerText} <BsCheckCircleFill color='#0070f3' />
          </>
        ) : i === index ? (
          <>
            {option.answerText} <BsXCircleFill color='#e00' />
          </>
        ) : (
          <>{option.answerText}</>
        );
      }),
    );
    setMessage(
      isCorrect ? (
        <p style={{ color: '#0070f3', display: 'flex', alignItems: 'center' }}>
          <BsCheckCircleFill style={{ marginRight: '5px' }} />
          答對了，做得不錯！
        </p>
      ) : (
        <p style={{ color: '#e00', display: 'flex', alignItems: 'center' }}>
          <BsXCircleFill style={{ marginRight: '5px' }} />
          答錯了，但是個很好的嘗試！
        </p>
      ),
    );
  };

  useEffect(() => {
    typeof data?.[id]?.response === 'number' && handleSelect(data[id].response);
  }, []);

  return (
    <div className={styles.Quiz} id={questions.label ?? '鞏固所學'}>
      <Question
        header={questions.label ?? '鞏固所學'}
        text={questions.questionText}
        excerpt={message}
      />
      <Selection
        options={options}
        onSelect={handleSelect}
        isDisabled={message !== null}
      />
    </div>
  );
};
