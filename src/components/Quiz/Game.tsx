import React, { useEffect, useState } from 'react';
import styles from './Game.module.scss';
import Question from './Question';
import Selection from './Selection';
import Result from './Result';
import Fetch from '../Fetch';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

type GameProps = {
  data: {
    questions: {
      questionText: string;
      answerOptions: {
        answerText: string;
        isCorrect?: boolean;
      }[];
    }[];
  };
  setSelectedAnswer: any;
  setResult?: (value: React.SetStateAction<boolean[]>) => void;
  result?: boolean[];
};

export default function Game({
  data,
  setSelectedAnswer,
  result = null,
  setResult = () => {},
}: GameProps) {
  if (!ExecutionEnvironment.canUseDOM) return null;

  const { questions } = data;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [record, setRecord] = useState([]);

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
        <Result
          score={score}
          result={result}
          reset={reset}
          totalQuestions={questions.length}
          checkAnswer
        />
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
}
