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

//Text Container
const Text = ({ title, children }) => (
  <div className='text-block'>
    {title && <div className='title'>{title}</div>}
    <div className='content'>{children}</div>
  </div>
);

const Remark = ({ children, type }) => (
  <p className={styles.remark}>
    <span className={styles.type}>{type}</span>
    {children}
  </p>
);

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

const Py = ({ children }) => (
  <>
    <span className={styles.pyCircle}>粵</span>
    {children}
  </>
);

const DeepDive = (props: {
  children: React.ReactNode;
  title: string;
  excerpt: string;
}) => <ExpandableExample {...props} type='DeepDive' />;

export default {
  Author,
  Remark,
  Annotate,
  Display,
  Tips,
  Text,
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
  Py,
  Challenges,
  Hint,
  Solution,
  NoSolution,
  DeepDive,
  Intro: (props) => <Admonition type='Intro' {...props} />,
  Quote: (props) => <Admonition type='Quote' {...props} />,
  Note: (props) => <Admonition type='Note' {...props} />,
};
