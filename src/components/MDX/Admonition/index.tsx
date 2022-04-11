import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { BsSticky, BsJournalText, BsChatSquareQuote } from 'react-icons/bs';
import { useColorMode } from '@docusaurus/theme-common';

type Variants = 'Intro' | 'Note' | 'Quote';

interface Props {
  children: React.ReactNode;
  type: Variants;
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
