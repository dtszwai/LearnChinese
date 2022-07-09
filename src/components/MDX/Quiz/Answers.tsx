import React from 'react';
import styles from './Answers.module.scss';
import { WrongAnswer } from './utils';
import { QuizContext } from '@site/src/theme/Root';
import clsx from 'clsx';

const renderedMessage = (isCorrect, selectedOption, currentOption) => {
  let comment = '';

  if (isCorrect) {
    switch (selectedOption) {
      case undefined:
        comment = ' // 正確答案';
        break;
      case currentOption:
        comment = ' ✔️ 回答正確';
        break;
      default:
        comment = ' ⭕️ 正確答案';
        break;
    }
  } else if (selectedOption === currentOption) {
    comment = ' ❌ 你的選擇';
  }

  return comment;
};

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
                className={clsx({ [styles.isCorrect]: option.isCorrect }, styles.Content)}
                data-before={`${String.fromCharCode(i + 65)}. `}
                data-after={renderedMessage(option.isCorrect, selectedAnswer[index], i)}
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
