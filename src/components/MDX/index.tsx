import React from 'react';
import styles from './styles.module.scss';

import Annotate from './Annotate';
import Carousel from './Carousel';
import Author from './Author';
import AudioCard from './AudioCard';
import Task from './Task';
import Admonition from './Admonition';
import Commentary from './Commentary';
import { Quiz, QuizAnswers, Review } from './Quiz';
import { Youtube, Bilibili } from './Video';
import { Challenges, Hint, Solution, NoSolution } from './Challenges';
import ExpandableExample from './ExpandableExample';
import { Jypt, Py } from './Lexis';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default {
  Author,
  Annotate,
  Carousel,
  AudioCard,
  Task,
  Tabs,
  TabItem,
  Quiz,
  QuizAnswers,
  Review,
  Youtube,
  Bilibili,
  Jypt,
  Py,
  Challenges,
  Hint,
  Solution,
  NoSolution,
  Commentary,
  Remark: ({ children, title }) => <p className={styles.remark} data-title={title}> {children}</p>,
  Translation: (props) => <div className={styles.Section} {...props} />,
  Biography: (props) => <div className={styles.Section} {...props} />,
  Appreciation: (props) => <div className={styles.Section} {...props} />,
  Media: (props) => <div {...props} />,
  MainText: (props) => <div {...props} />,
  Extension: (props) => <div {...props} />,
  Dictionary: ({ children }) => <ExpandableExample title="📜 字詞釋義" type='Dictionary' children={children} />,
  DeepDive: (props) => <ExpandableExample {...props} type='DeepDive' />,
  Intro: (props) => <Admonition type='Intro' {...props} />,
  Quote: (props) => <Admonition type='Quote' {...props} />,
  Note: (props) => <Admonition type='Note' {...props} />,
  YouWillLearn: (props) => <Admonition type='YouWillLearn' {...props} />,
  Resources: (props) => <Admonition type='Resources' {...props} />,
};
