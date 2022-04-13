import React from 'react';

type QuizContextInterface = {
  selectedAnswer: {};
  setSelectedAnswer: React.Dispatch<React.SetStateAction<{}>>;
  result: boolean[];
  setResult: React.Dispatch<React.SetStateAction<boolean[]>>;
};

export const QuizContext = React.createContext({} as QuizContextInterface);

export default function ({ children }) {
  const [selectedAnswer, setSelectedAnswer] = React.useState({});
  const [result, setResult] = React.useState<boolean[]>([]);

  return (
    <QuizContext.Provider
      value={{ selectedAnswer, setSelectedAnswer, result, setResult }}
    >
      {children}
    </QuizContext.Provider>
  );
}
