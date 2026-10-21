import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { LessonData } from '../types';
import styles from './index.module.scss';

type Props = {
  data: LessonData[];
  step: { currentStep: number; lastStep: number };
  success: boolean;
  onNavigate: (index: number) => void;
};

const Outline = ({ data, step, success, onNavigate }: Props) => {
  const [open, setOpen] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const active = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (list.current && active.current?.parentElement) {
      list.current.scrollTop = active.current.parentElement.offsetTop - list.current.clientHeight / 2 + 16;
    }
  }, [step.currentStep]);
  return (
    <div className={styles.Viewport}>
      <aside className={`${styles.Outline} ${open ? styles.Open : styles.Closed}`} aria-label='課程進度'>
        <div id='lesson-outline' ref={list} className={styles.Panel} aria-hidden={!open}>
          <ol>
            {data.map((item, index) => {
              const current = index === step.currentStep;
              const done = index < step.lastStep || (current && success);
              const unlocked = index <= step.lastStep || (success && index === step.currentStep + 1);
              const title = item.title
                .replace(/<[^>]*>/g, '')
                .replace(/\\n/g, ' ')
                .replace(/`/g, '');
              const icon = current ? 'play' : done ? 'check' : 'lock';
              const parts = item.title
                .replace(/<[^>]*>/g, '')
                .replace(/\\n/g, ' ')
                .split(/(`[^`]+`)/g);
              return (
                <li key={item.id || index}>
                  <button
                    type='button'
                    ref={current ? active : undefined}
                    disabled={!unlocked}
                    aria-current={current ? 'step' : undefined}
                    aria-label={`${index + 1}. ${title}，${current ? '目前步驟' : done ? '已完成' : unlocked ? '可學習' : '未解鎖'}`}
                    tabIndex={open ? undefined : -1}
                    title={title}
                    onClick={() => onNavigate(index)}
                  >
                    <Icon name={icon} className={current || done ? styles.ActiveIcon : styles.Icon} />
                    <span className={styles.Title}>
                      {parts.map((part, i) =>
                        part.startsWith('`') ? (
                          <span key={i} className={styles.Term}>
                            {part.slice(1, -1)}
                          </span>
                        ) : (
                          part
                        ),
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div className={styles.FadeTop} aria-hidden='true' />
        <div className={styles.FadeBottom} aria-hidden='true' />
        <button
          type='button'
          className={styles.Toggle}
          aria-label={open ? '收合課程進度' : '展開課程進度'}
          aria-expanded={open}
          aria-controls='lesson-outline'
          onClick={() => setOpen(!open)}
        >
          <Icon name='arrow' />
        </button>
      </aside>
    </div>
  );
};

export default Outline;
