import * as React from 'react';
import clsx from 'clsx';

import { Navigation } from './Navigation';
import { IoFlagOutline, IoBulbOutline, IoArrowForward } from 'react-icons/io5';
import styles from './styles.module.scss';

export interface ChallengeContents {
  id: string;
  name: string;
  order: number;
  content: React.ReactNode;
  solution: React.ReactNode;
  hint?: React.ReactNode;
}

const parseChallengeContents = (
  children: React.ReactElement[],
): ChallengeContents[] => {
  const contents: ChallengeContents[] = [];

  if (!children) {
    return contents;
  }

  let challenge: Partial<ChallengeContents> = {};
  let content: React.ReactElement[] = [];

  React.Children.forEach(children, (item) => {
    const { props: itemProps } = item;
    if (itemProps.mdxType !== 'ChallengeItem') {
      return;
    }
    challenge.order = contents.length + 1;
    challenge.name = itemProps.label;
    challenge.id = itemProps.label;
    itemProps.children.forEach((child) => {
      const { props } = child;
      switch (props.mdxType) {
        case 'Solution': {
          challenge.solution = child;
          challenge.content = content;
          contents.push(challenge as ChallengeContents);
          challenge = {};
          content = [];
          break;
        }
        case 'NoSolution': {
          challenge.solution = null;
          challenge.content = content;
          contents.push(challenge as ChallengeContents);
          challenge = {};
          content = [];
          break;
        }
        case 'Hint': {
          challenge.hint = child;
          break;
        }
        default: {
          content.push(child);
        }
      }
    });
  });
  return contents;
};

export function Challenges({ children }: { children: React.ReactElement[] }) {
  const challenges = parseChallengeContents(children);
  const scrollAnchorRef = React.useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = React.useState(false);
  const [showSolution, setShowSolution] = React.useState(false);
  const [activeChallenge, setActiveChallenge] = React.useState(
    challenges[0].id,
  );

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
      {challenges.length > 1 && (
        <div ref={scrollAnchorRef} className={styles.Header}>
          <Navigation
            currentChallenge={currentChallenge}
            challenges={challenges}
            handleChange={handleChallengeChange}
          />
        </div>
      )}
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
              <button
                onClick={toggleHint}
                className={showHint ? styles.ButtonActive : styles.Button}
              >
                <IoBulbOutline />
                {showHint ? ' 隱藏提示' : ' 顯示提示'}
              </button>
            )}
            {currentChallenge.solution && (
              <button
                onClick={toggleSolution}
                className={showSolution ? styles.ButtonActive : styles.Button}
              >
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

        {showHint && (
          <div style={{ marginTop: '1.5rem' }}>{currentChallenge.hint}</div>
        )}

        {showSolution && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', lineHeight: '2rem' }}>答案</h3>
            {currentChallenge.solution}
            <div className={styles.Extend}>
              <button
                className={styles.Button}
                onClick={() => setShowSolution(false)}
                children='摺疊答案'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
