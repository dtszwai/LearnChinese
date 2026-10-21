import React from 'react';
import styles from './styles.module.scss';

import Annotate from './Annotate';
import Carousel from './Carousel';
import Author from './Author';
import AudioCard from './AudioCard';
import Task from './Task';
import Admonition from './Admonition';
import Commentary from './Commentary';
import Remark from './Remark';
import { Quiz, QuizAnswers, Review } from './Quiz';
import { Youtube, Bilibili } from './Video';
import { Challenges, ChallengeItem, Hint, Solution, NoSolution } from './Challenges';
import ExpandableExample from './ExpandableExample';
import { Jypt, Py } from './Lexis';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

type SectionProps = React.HTMLAttributes<HTMLDivElement>;
type AdmonitionProps = Omit<React.ComponentProps<typeof Admonition>, 'type'>;

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
  ChallengeItem,
  Remark,
  Translation: (props: SectionProps) => <div className={styles.Section} {...props} />,
  Biography: (props: SectionProps) => <div className={styles.Section} {...props} />,
  Appreciation: (props: SectionProps) => <div className={styles.Section} {...props} />,
  Media: (props: SectionProps) => <div {...props} />,
  MainText: (props: SectionProps) => <div {...props} />,
  Extension: (props: SectionProps) => <div {...props} />,
  Dictionary: ({ children }: React.PropsWithChildren) => (
    <ExpandableExample title='📜 字詞釋義' type='Dictionary' children={children} />
  ),
  DeepDive: (props: Omit<React.ComponentProps<typeof ExpandableExample>, 'type'>) => (
    <ExpandableExample {...props} type='DeepDive' />
  ),
  Intro: (props: AdmonitionProps) => <Admonition type='Intro' {...props} />,
  Quote: (props: AdmonitionProps) => <Admonition type='Quote' {...props} />,
  Note: (props: AdmonitionProps) => <Admonition type='Note' {...props} />,
  YouWillLearn: (props: AdmonitionProps) => <Admonition type='YouWillLearn' {...props} />,
  Resources: (props: AdmonitionProps) => <Admonition type='Resources' {...props} />,
};
