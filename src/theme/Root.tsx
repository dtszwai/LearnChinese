import React from 'react';

type QuizContextInterface = {
  selectedAnswer: Partial<Record<number, number>>;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Partial<Record<number, number>>>>;
  result: boolean[];
  setResult: React.Dispatch<React.SetStateAction<boolean[]>>;
};

export const QuizContext = React.createContext({} as QuizContextInterface);
type CommentVisibility = Record<string, boolean>;
export const CommentaryContext = React.createContext<
  [CommentVisibility, React.Dispatch<React.SetStateAction<CommentVisibility>>]
>([{}, () => {}]);

type Props = { children?: React.ReactNode };
const Root = ({ children }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<Partial<Record<number, number>>>({});
  const [result, setResult] = React.useState<boolean[]>([]);
  const [showComment, setShowComment] = React.useState<CommentVisibility>({});

  return (
    <QuizContext.Provider value={{ selectedAnswer, setSelectedAnswer, result, setResult }}>
      <CommentaryContext.Provider value={[showComment, setShowComment]}>{children}</CommentaryContext.Provider>
    </QuizContext.Provider>
  );
};

export default Root;
