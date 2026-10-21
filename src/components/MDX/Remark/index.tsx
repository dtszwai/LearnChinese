import React from 'react';
import { useMDXComponents } from '@mdx-js/react';
import clsx from 'clsx';
import styles from '../styles.module.scss';

type Props = { children?: React.ReactNode; title?: string };

const Remark = ({ children, title }: Props) => {
  const components = useMDXComponents();
  // A multiline MDX remark already contains paragraphs. A second <p> would
  // be repaired by the HTML parser before React hydrates it.
  const hasBlocks = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      ['p', 'ul', 'ol', 'blockquote', 'div', 'pre'].some((tag) => child.type === tag || child.type === components[tag]),
  );
  const Tag = hasBlocks ? 'div' : 'p';
  return (
    <Tag className={clsx(styles.remark, hasBlocks && styles.remarkBlock)} data-title={title}>
      {' '}
      {children}
    </Tag>
  );
};

export default Remark;
