import React, { createRef } from 'react';
import clsx from 'clsx';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';
import { ChallengeContents } from './Challenges';
import styles from './styles.module.scss';

export function Navigation({
  challenges,
  handleChange,
  currentChallenge,
}: {
  challenges: ChallengeContents[];
  handleChange: (id: string) => void;
  currentChallenge: ChallengeContents;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const challengesNavRef = React.useRef(
    challenges.map(() => createRef<HTMLButtonElement>()),
  );
  const scrollPos = currentChallenge.order - 1;
  const canScrollLeft = scrollPos > 0;
  const canScrollRight = scrollPos < challenges.length - 1;

  const handleScrollRight = () => {
    if (scrollPos < challenges.length - 1) {
      const currentNavRef = challengesNavRef.current[scrollPos + 1].current;
      if (!currentNavRef) {
        return;
      }
      if (containerRef.current) {
        containerRef.current.scrollLeft = currentNavRef.offsetLeft;
      }
      handleChange(challenges[scrollPos + 1].id);
    }
  };

  const handleScrollLeft = () => {
    if (scrollPos > 0) {
      const currentNavRef = challengesNavRef.current[scrollPos - 1].current;
      if (!currentNavRef) {
        return;
      }
      if (containerRef.current) {
        containerRef.current.scrollLeft = currentNavRef.offsetLeft;
      }
      handleChange(challenges[scrollPos - 1].id);
    }
  };

  const handleSelectNav = (id: string) => {
    const selectedChallenge = challenges.findIndex(
      (challenge) => challenge.id === id,
    );
    const currentNavRef = challengesNavRef.current[selectedChallenge].current;
    if (containerRef.current) {
      containerRef.current.scrollLeft = currentNavRef?.offsetLeft || 0;
    }
    handleChange(id);
  };

  const handleResize = React.useCallback(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      el.scrollLeft =
        challengesNavRef.current[scrollPos].current?.offsetLeft || 0;
    }
  }, [containerRef, challengesNavRef, scrollPos]);

  React.useEffect(() => {
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            position: 'relative',
            transitionProperty: 'transform',
          }}
        >
          {challenges.map(({ name, id, order }, index) => (
            <button
              className={clsx(
                styles.NavChallenge,
                currentChallenge.id === id && styles.NavChallengeActive,
              )}
              onClick={() => handleSelectNav(id)}
              key={`button-${id}`}
              ref={challengesNavRef.current[index]}
            >
              {order}. {name}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          zIndex: '10',
          paddingBottom: '0.5rem',
          paddingLeft: '0.5rem',
        }}
      >
        <button
          onClick={handleScrollLeft}
          aria-label='Scroll left'
          className={clsx(styles.Scroll, {
            [styles.CanScroll]: canScrollLeft,
          })}
          style={{
            borderRightWidth: '1px',
            borderTopLeftRadius: '0.25rem',
            borderBottomLeftRadius: '0.25rem',
          }}
        >
          <IoChevronBack />
        </button>
        <button
          onClick={handleScrollRight}
          aria-label='Scroll right'
          style={{
            borderTopRightRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
          }}
          className={clsx(styles.Scroll, {
            [styles.CanScroll]: canScrollRight,
          })}
        >
          <IoChevronForward />
        </button>
      </div>
    </div>
  );
}
