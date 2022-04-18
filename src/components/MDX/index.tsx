import React, { useState } from 'react';
import styles from './styles.module.scss';

import Carousel from './Carousel';
import Author from './Author';
import AudioCard from './AudioCard';
import Task from './Task';
import { Tips, Display } from './ToggleDisplay';
import Admonition from './Admonition';
import { QuizSet, Quiz, QuizAnswers, Review } from './Quiz';
import { Youtube, Bilibili } from './Video';
import { Challenges, Hint, Solution, NoSolution } from './Challenges';
import ExpandableExample from './ExpandableExample';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Tooltip from '@mui/material/Tooltip';

const Annotate = ({ children, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      open={open}
      title={title}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      <span className={styles.Tooltip}>{children}</span>
    </Tooltip>
  );
};

export default {
  Author,
  Annotate,
  Carousel,
  AudioCard,
  Task,
  Tabs,
  TabItem,
  QuizSet,
  Quiz,
  QuizAnswers,
  Review,
  Youtube,
  Bilibili,
  Remark: ({ children, title }) => (
    <p className={styles.remark}>
      <span className={styles.title}>{title}</span>
      {children}
    </p>
  ),
  Display,
  Tips,
  Text: ({ title, children }) => (
    <div className='text-block'>
      {title && <div className='title'>{title}</div>}
      <div className='content'>{children}</div>
    </div>
  ),
  Py: ({ children }) => (
    <>
      <span className={styles.pyCircle}>粵</span>
      {children}
    </>
  ),
  Challenges,
  Hint,
  Solution,
  NoSolution,
  Translation: (props) => (
    <div
      style={{ fontSize: '1.2em', textAlign: 'justify', margin: '1.8rem auto' }}
      {...props}
    />
  ),
  Dictionary: ({ children }) => (
    <ExpandableExample
      children={children}
      title={<span style={{ fontSize: '1.5rem' }}>📜 字詞釋義</span>}
      type='Dictionary'
    />
  ),
  DeepDive: (props) => <ExpandableExample {...props} type='DeepDive' />,
  Intro: (props) => <Admonition type='Intro' {...props} />,
  Quote: (props) => <Admonition type='Quote' {...props} />,
  Note: (props) => <Admonition type='Note' {...props} />,
  YouWillLearn: (props) => <Admonition type='YouWillLearn' {...props} />,
  Resources: (props) => <Admonition type='Resources' {...props} />,
};
