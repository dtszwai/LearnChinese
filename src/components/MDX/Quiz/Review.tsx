import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Question, Selection } from './utils';
import useLocalStorage from '@site/src/utils/useLocalStorage';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

interface Review {
  children: React.ReactElement[];
  Correct: number;
}

interface Questions {
  label: string;
  questionText: string;
  answerOptions: { answerText: string; isCorrect?: boolean }[];
}

const parseReviewContents = (data, correctOption: number) => {
  const content = { answerOptions: [] } as Questions;
  React.Children.forEach(data, (item) => {
    const { props } = item;
    const { children } = props
    switch (item.type?.name || item.type) {
      case 'h2':
        content.label = children;
        break;
      case 'p':
        content.questionText = children;
        break;
      case 'ol':
      case 'ul':
        React.Children.forEach(children, (options) => {
          if ('li' == options?.type)
            content.answerOptions.push({
              answerText: options.props.children,
              isCorrect: correctOption === content.answerOptions.length,
            });
        });
        break;
    }
  });
  return content;
};

export default ({ Correct, children }: Review) => {
  const questions = parseReviewContents(children, Correct - 1);
  const [message, setMessage] = useState<React.ReactNode>(null);
  const [options, setOptions] = useState<React.ReactNode[]>(questions.answerOptions.map((option) => option.answerText));
  const { id } = useActiveDocContext(undefined).activeDoc;
  const [data, setData] = useLocalStorage('Points');

  const handleSelect = (selectedChoice: number) => {
    setData({ ...data, [id]: { checked: true, response: selectedChoice, isCorrect: questions.answerOptions[selectedChoice].isCorrect } });
    renderedReview(selectedChoice);
  };

  const renderedReview = (selectedChoice) => {
    const isCorrect = questions.answerOptions[selectedChoice].isCorrect;
    setOptions(
      questions.answerOptions.map((option, i) => {
        return option.isCorrect ? (
          <>
            {option.answerText} <BsCheckCircleFill color='#0070f3' />
          </>
        ) : i === selectedChoice ? (
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
        <p className={styles.CorrectOption}>
          <BsCheckCircleFill style={{ marginRight: '5px' }} />
          答對了，做得不錯！
        </p>
      ) : (
        <p className={styles.WrongOption}>
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
    <div className={styles.Quiz} id={questions.label}>
      <Question header={questions.label} text={questions.questionText} excerpt={message} />
      <Selection options={options} onSelect={handleSelect} isDisabled={data?.[id]?.checked} />
    </div>
  );
};
