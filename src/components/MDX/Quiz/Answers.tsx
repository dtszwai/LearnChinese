import React from 'react';
import styles from './Answers.module.scss';
import { WrongAnswer } from './utils';
import { QuizContext } from '@site/src/theme/Root';

const renderedMessage = (
  isCorrect: boolean,
  selectedOption: number,
  currentOption: number,
) => {
  let comment: string = null;

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

  return comment && <span className={styles.Comment}>{comment}</span>;
};

export default ({ questions }) => {
  const { selectedAnswer, result } = React.useContext(QuizContext);
  return (
    <>
      <p>{WrongAnswer(result)}</p>
      {questions.map((question, index) => (
        <section
          className={styles.Container}
          key={index}
          style={
            selectedAnswer[index] === undefined ||
            questions[index].answerOptions[selectedAnswer[index]]?.isCorrect //alert if the selected answer is wrong
              ? null
              : { border: '1px solid #e27396' }
          }
        >
          <div className={styles.Question}>
            {index + 1}. {question.questionText}
          </div>

          <div className={styles.Answers}>
            {question.answerOptions.map((option, i) => (
              <p key={i} className={option.isCorrect ? styles.isCorrect : null}>
                <span className={option.isCorrect ? null : styles.Option}>
                  {String.fromCharCode(i + 65)}.&nbsp;
                </span>
                {option.answerText}
                {renderedMessage(option.isCorrect, selectedAnswer[index], i)}
              </p>
            ))}
          </div>
        </section>
      ))}
    </>
  );
};
