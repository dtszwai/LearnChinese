import React from 'react';
import styles from './Answers.module.scss';
import { WrongAnswer } from './utils';
import { QuizContext } from '@site/src/theme/Root';
import clsx from 'clsx';
import type { QuizQuestion } from './types';

type Props = { questions: QuizQuestion[] };
const Answers = ({ questions }: Props) => {
  const { selectedAnswer, result } = React.useContext(QuizContext);
  return (
    <>
      <p>{WrongAnswer(result)}</p>
      {questions.map((question, index) => {
        const selected = selectedAnswer[index];
        const correct = selected !== undefined && question.answerOptions[selected]?.isCorrect;
        return (
          <section
            className={clsx(styles.Container, {
              [styles.CorrectBlock]: correct,
              [styles.WrongBlock]: selected !== undefined && !correct,
            })}
            key={index}
          >
            <div
              className={styles.Question}
              data-before={`${index + 1}. `}
              dangerouslySetInnerHTML={{
                __html: `${question.questionText.replace(/\\n/gm, '<br />').replace(/`(.*?)`/g, '<code>$1</code>')}`,
              }}
            />
            <div className={styles.Answers}>
              {question.answerOptions.map((option, i) => (
                <p
                  key={i}
                  className={clsx(styles.Content, {
                    [styles.CorrectTag]: option.isCorrect,
                    [styles.SelectedTag]: selectedAnswer[index] === i,
                  })}
                  data-before={`${String.fromCharCode(i + 65)}. `}
                >
                  {option.answerText}
                </p>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Answers;
