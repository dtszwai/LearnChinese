import React from 'react';
import styles from './QuestionBank.module.scss';
import { WrongAnswer } from './Result';

type MessageProps = (
  isCorrect: boolean,
  selectedOption: number,
  currentOption: number,
) => JSX.Element;

type questionsProps = {
  answerOptions: [{ answerText: string; isCorrect?: boolean }];
  questionText: string;
}[];

type Props = {
  questions: questionsProps;
  selectedAnswer: { [key: number]: number };
  result: boolean[];
};

const renderedMessage: MessageProps = (
  isCorrect,
  selectedOption,
  currentOption,
) => {
  let message = '';

  if (!isCorrect && selectedOption === currentOption) {
    return <span className={styles.Comment}> ❌ 你的選擇</span>;
  }

  if (isCorrect) {
    if (selectedOption === undefined) {
      message = ' // 正確答案';
    } else if (selectedOption !== currentOption) {
      message = ' ⭕️ 正確答案';
    } else if (selectedOption === currentOption) {
      message = ' ✔️ 回答正確';
    }
  }

  return <span className={styles.Comment}>{message}</span>;
};

export default ({ questions, selectedAnswer, result }: Props) => {
  const alertBorder = { border: '1px solid #e27396' };

  return (
    <>
      {WrongAnswer(result)}
      {questions.map((question, number) => (
        <section
          className={styles.QuestionWrapper}
          key={number}
          style={result[number] === false ? alertBorder : null}
        >
          {/* Question 題目 */}
          <div className={styles.QuestionSection}>
            {`${number + 1}. ${question.questionText}`}
          </div>

          {/* Answer 答案 */}
          <div className={styles.AnswerSection}>
            {question.answerOptions.map((option, index) => (
              <p
                key={index}
                className={option.isCorrect ? styles.CorrectAnswer : null}
              >
                <span className={option.isCorrect ? null : styles.Options}>
                  {String.fromCharCode(index + 65)}.&nbsp;
                </span>
                {option.answerText}
                {renderedMessage(
                  option.isCorrect,
                  selectedAnswer[number],
                  index,
                )}
              </p>
            ))}
          </div>
        </section>
      ))}
    </>
  );
};
