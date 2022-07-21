import React from 'react';
import styles from './Answers.module.scss';
import { WrongAnswer } from './utils';
import { QuizContext } from '@site/src/theme/Root';
import clsx from 'clsx';

export default ({ questions }) => {
  const { selectedAnswer, result } = React.useContext(QuizContext);
  return (
    <>
      <p>{WrongAnswer(result)}</p>
      {questions.map((question, index) => (
        <section
          className={clsx(styles.Container, {
            [styles.CorrectBlock]: questions[index].answerOptions[selectedAnswer[index]]?.isCorrect,
            [styles.WrongBlock]: !(
              selectedAnswer[index] === undefined || questions[index].answerOptions[selectedAnswer[index]]?.isCorrect
            ),
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
      ))}
    </>
  );
};
