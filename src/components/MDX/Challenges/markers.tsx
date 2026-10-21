import React from 'react';

type Props = { children?: React.ReactNode };
type ChallengeItemProps = Props & { label: string };

export const ChallengeItem = ({ children }: ChallengeItemProps) => {
  return <div>{children}</div>;
};
export const Hint = ({ children }: Props) => {
  return <>{children}</>;
};
export const Solution = ({ children }: Props) => {
  return <>{children}</>;
};
export const NoSolution = () => null;
