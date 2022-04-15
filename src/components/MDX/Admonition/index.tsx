import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { useColorMode } from '@docusaurus/theme-common';
import {
  BsSticky,
  BsJournalText,
  BsChatSquareQuote,
  BsTag,
} from 'react-icons/bs';

interface Props {
  children: React.ReactNode;
  type: 'Intro' | 'Note' | 'Quote' | 'YouWillLearn';
  title?: string;
}

const variantMap = {
  Intro: {
    title: '題引',
    Icon: BsSticky,
    light: { backgroundColor: '#f1f7fb' },
    dark: { backgroundColor: '#547484' },
  },
  Note: {
    title: '筆記',
    Icon: BsJournalText,
    light: { backgroundColor: '#f3f4fd' },
    dark: { backgroundColor: '#2b349133' },
  },
  Quote: {
    title: 'You Know What They Say...',
    Icon: BsChatSquareQuote,
    light: { backgroundColor: '#faf2f6' },
    dark: { backgroundColor: '#765462' },
  },
  YouWillLearn: {
    title: '學習重點',
    Icon: BsTag,
    light: { backgroundColor: '#f6f7f9' },
    dark: { backgroundColor: '#343a46' },
  },
};

export default ({ children, type, title }: Props) => {
  const variant = variantMap[type];
  return (
    <div
      className={clsx(styles.Container, styles[type])}
      style={variant[useColorMode().colorMode]}
    >
      <h3 className={styles.Heading}>
        <variant.Icon className={styles.Icon} />
        {title ?? variant.title}
      </h3>
      <div className={styles.Content}>{children}</div>
    </div>
  );
};
