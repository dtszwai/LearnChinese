import React from 'react';
import clsx from 'clsx';

import { Navigation } from './Navigation';
import { IoFlagOutline, IoBulbOutline, IoArrowForward } from 'react-icons/io5';
import styles from './styles.module.scss';
import { useMDXComponents } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';
import { ChallengeItem, Hint, Solution } from './markers';

export type ChallengeContents = {
  id: string;
  name: string;
  order: number;
  content: React.ReactNode;
  solution: React.ReactNode;
  hint?: React.ReactNode;
};

const parseChallengeContents = (challengeItem: React.ReactNode, components: MDXComponents): ChallengeContents[] => {
  const contents: ChallengeContents[] = [];
  React.Children.forEach(challengeItem, (item) => {
    if (
      !React.isValidElement<React.PropsWithChildren<{ label: string }>>(item) ||
      (item.type !== ChallengeItem && item.type !== components.ChallengeItem)
    )
      return;
    const content: React.ReactNode[] = [];
    const { props: itemProps } = item;
    const challenge: ChallengeContents = {
      order: contents.length + 1,
      name: itemProps.label,
      id: itemProps.label,
      content,
      solution: null,
    };
    React.Children.forEach(itemProps.children, (child) => {
      const kind = React.isValidElement(child) ? child.type : null;
      switch (kind) {
        case Solution:
        case components.Solution: {
          challenge.solution = child;
          break;
        }
        case Hint:
        case components.Hint: {
          challenge.hint = child;
          break;
        }
        default: {
          content.push(child);
        }
      }
    });
    challenge.content = content;
    contents.push(challenge);
  });
  return contents;
};

export function Challenges({ children }: React.PropsWithChildren) {
  const challenges = parseChallengeContents(children, useMDXComponents());
  const [showHint, setShowHint] = React.useState(false);
  const [showSolution, setShowSolution] = React.useState(false);
  const [activeChallenge, setActiveChallenge] = React.useState(challenges[0]?.id);

  const handleChallengeChange = (challengeId: string) => {
    setShowHint(false);
    setShowSolution(false);
    setActiveChallenge(challengeId);
  };

  const toggleHint = () => {
    if (showSolution && !showHint) {
      setShowSolution(false);
    }
    setShowHint((hint) => !hint);
  };

  const toggleSolution = () => {
    if (showHint && !showSolution) {
      setShowHint(false);
    }
    setShowSolution((solution) => !solution);
  };

  const currentChallenge = challenges.find(({ id }) => id === activeChallenge);
  if (currentChallenge === undefined) {
    return;
  }
  const nextChallenge = challenges.find(({ order }) => {
    return order === currentChallenge.order + 1;
  });
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <h2 className={styles.Heading}>🎯 鞏固練習</h2>
        {challenges.length > 1 && (
          <Navigation
            currentChallenge={currentChallenge}
            challenges={challenges}
            handleChange={handleChallengeChange}
          />
        )}
      </div>
      <div className={styles.Content} id={currentChallenge.id}>
        <div key={activeChallenge}>
          <h3 className={styles.currentChallenge}>
            <div className={styles.ChallengeNumber}>
              {'挑戰題'} {currentChallenge.order} / {challenges.length}：
            </div>
            {currentChallenge.name}
          </h3>
          {currentChallenge.content}
        </div>
        <div className={styles.Extend}>
          <div>
            {currentChallenge.hint && (
              <button onClick={toggleHint} className={showHint ? styles.ButtonActive : styles.Button}>
                <IoBulbOutline />
                {showHint ? ' 隱藏提示' : ' 顯示提示'}
              </button>
            )}
            {currentChallenge.solution && (
              <button onClick={toggleSolution} className={showSolution ? styles.ButtonActive : styles.Button}>
                <IoFlagOutline />
                {showSolution ? ' 隱藏答案' : ' 顯示答案'}
              </button>
            )}
          </div>
          {nextChallenge && (
            <button
              className={clsx(styles.Button, styles.ButtonActive)}
              onClick={() => {
                setActiveChallenge(nextChallenge.id);
                setShowSolution(false);
              }}
            >
              下一題&nbsp;
              <IoArrowForward />
            </button>
          )}
        </div>

        {showHint && <div style={{ marginTop: '1.5rem' }}>{currentChallenge.hint}</div>}

        {showSolution && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', lineHeight: '2rem' }}>答案</h3>
            {currentChallenge.solution}
            <div className={styles.Extend}>
              <button className={styles.Button} onClick={() => setShowSolution(false)} children='摺疊答案' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
