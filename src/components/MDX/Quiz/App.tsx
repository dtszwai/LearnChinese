import React, { useEffect, useState, useContext } from 'react';
import styles from './styles.module.scss';
import Question from './Question';
import Fetch from '../../Fetch';
import { QuizContext } from '@site/src/theme/Root';

type SelectionProps = {
  answerOptions: { answerText: string; isCorrect?: boolean }[];
  selectedOption: (arg0: boolean, arg1: number) => void;
  isDisabled?: boolean;
};

export const Selection = ({
  answerOptions,
  selectedOption,
  isDisabled = false,
}: SelectionProps) => {
  return (
    <div className={styles.AnswerSection}>
      {answerOptions.map((answerOption, i) => (
        <button
          className={styles.btn}
          onClick={() => selectedOption(answerOption.isCorrect, i)}
          key={i}
          disabled={isDisabled}
        >
          {String.fromCharCode(i + 65)}. {answerOption.answerText}
        </button>
      ))}
    </div>
  );
};

export const WrongAnswer = (result: boolean[]) => {
  let arr = result
    .map((e, i) => (!e ? i + 1 : ''))
    .filter(String)
    .join('、');
  return arr.length ? <p>錯題：{arr}</p> : null;
};

export default ({ questions, checkAnswer = false }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [record, setRecord] = useState([]);
  const { setSelectedAnswer, result, setResult } = useContext(QuizContext);

  useEffect(() => {
    reset();
  }, []);

  // Record users answers
  useEffect(() => {
    if (showScore) {
      let message = record.length ? `錯題：${record}` : '全對';
      let formData = new FormData();
      formData.append('Event', 'Quiz Answer');
      formData.append('Details', message);
      formData.append('Message', `分數：${score}`);
      Fetch(formData);
    }
  }, [showScore]);

  const handleAnswerOptionClick = (isCorrect = false, selected: number) => {
    setScore((prep) => prep + (isCorrect ? 1 : 0));
    setSelectedAnswer((prep) => ({ ...prep, [currentQuestion]: selected }));
    setResult((prep) => [...prep, isCorrect]);
    !isCorrect &&
      setRecord((prep) => [
        ...prep,
        `${currentQuestion + 1}${String.fromCharCode(selected + 65)}`,
      ]);
    const nextQuestion = currentQuestion + 1;
    nextQuestion < questions.length
      ? setCurrentQuestion(nextQuestion)
      : setShowScore(true);
  };

  const reset = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setRecord([]);
    setResult([]);
    setSelectedAnswer({});
  };

  return (
    <div className={styles.Wrapper}>
      {showScore ? (
        <div className={styles.ScoreSection}>
          <p>
            你
            {questions.length && (
              <>
                在&nbsp;
                <span style={{ color: '#8783D1' }}>{questions.length}</span>
                &nbsp;題裏
              </>
            )}
            答對了&nbsp;<span style={{ color: '#E27396' }}>{score}</span>
            &nbsp;題。
          </p>
          {result && WrongAnswer(result)}
          {reset && (
            <button
              className={styles.btn}
              onClick={reset}
              children='再做一次'
            />
          )}
          {checkAnswer && (
            <button
              className={styles.btn}
              onClick={() => {
                document
                  .querySelector<HTMLElement>('[data-quiz="Answers"]')
                  .click();
              }}
              children='查看答案'
            />
          )}
        </div>
      ) : (
        <>
          <Question
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            questionText={questions[currentQuestion].questionText}
          />
          <Selection
            answerOptions={questions[currentQuestion].answerOptions}
            selectedOption={handleAnswerOptionClick}
          />
        </>
      )}
    </div>
  );
};
