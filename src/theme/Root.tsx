import React from 'react';

type QuizContextInterface = {
  selectedAnswer: {};
  setSelectedAnswer: React.Dispatch<React.SetStateAction<{}>>;
  result: boolean[];
  setResult: React.Dispatch<React.SetStateAction<boolean[]>>;
};

export const QuizContext = React.createContext({} as QuizContextInterface);
export const CommentaryContext = React.createContext([]);

export default function ({ children }) {
  const [selectedAnswer, setSelectedAnswer] = React.useState({});
  const [result, setResult] = React.useState<boolean[]>([]);
  const [showComment, setShowComment] = React.useState({});

  return (
    <QuizContext.Provider
      value={{ selectedAnswer, setSelectedAnswer, result, setResult }}
    >
      <CommentaryContext.Provider value={[showComment, setShowComment]}>
        {children}
      </CommentaryContext.Provider>
    </QuizContext.Provider>
  );
}
