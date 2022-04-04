import React, { useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './Game.module.scss';
import Question from './Question';

type ReviewProps = {
  question: {
    questionText: string;
    answerOptions: {
      answerText: string;
      isCorrect?: boolean;
    }[];
  };
  label?: string;
};

const tick = (
  <span style={{ paddingLeft: '5px' }}>
    <svg height='16' viewBox='0 0 16 16' width='16'>
      <g fill='#0070f3'>
        <path d='M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M7,11.4L3.6,8L5,6.6l2,2l4-4L12.4,6L7,11.4z' />
      </g>
    </svg>
  </span>
);

const cross = (
  <span style={{ paddingLeft: '5px' }}>
    <svg height='16' viewBox='0 0 24 24' width='16'>
      <g fill='#e00'>
        <path d='M12,0A12,12,0,1,0,24,12,12.035,12.035,0,0,0,12,0Zm4.95,15.536L15.536,16.95,12,13.414,8.464,16.95,7.05,15.536,10.586,12,7.05,8.464,8.464,7.05,12,10.586,15.536,7.05,16.95,8.464,13.414,12Z' />
      </g>
    </svg>
  </span>
);

export default ({ question, label = '快速回顧' }: ReviewProps) => {
  if (!ExecutionEnvironment.canUseDOM) return null;

  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [message, setMessage] = useState<React.ReactNode>(null);

  const handleSelect = (isCorrect, index) => {
    selectedAnswer === -1 && setSelectedAnswer(index);
    isCorrect
      ? setMessage(
          <p style={{ color: '#0070f3' }}>{tick} 答對了，做得不錯！</p>,
        )
      : setMessage(
          <p style={{ color: '#e00' }}>{cross} 答錯了，但是個很好的嘗試！</p>,
        );
  };

  const ButtonContent = (answerOption, index) => {
    if (
      selectedAnswer === -1 ||
      (!answerOption.isCorrect && selectedAnswer !== index)
    ) {
      return `${String.fromCharCode(index + 65)}. ${answerOption.answerText}`;
    }

    return answerOption.isCorrect ? (
      <>
        {String.fromCharCode(index + 65)}. {answerOption.answerText} {tick}
      </>
    ) : (
      <>
        {String.fromCharCode(index + 65)}. {answerOption.answerText} {cross}
      </>
    );
  };

  return (
    <div className={styles.Wrapper}>
      <Question
        questionText={question.questionText}
        label={label}
        info={message}
      />
      <div className={styles.AnswerSection}>
        {question.answerOptions.map((answerOption, i) => (
          <button
            className={styles.btn}
            onClick={() => handleSelect(answerOption.isCorrect, i)}
            key={i}
            disabled={selectedAnswer !== -1}
          >
            {ButtonContent(answerOption, i)}
          </button>
        ))}
      </div>
    </div>
  );
};
