import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import styles from './Collapse.module.scss';
import { AiFillCaretDown } from 'react-icons/ai';

type CollapseProps = {
  title: { code: string; title: string };
  id: string;
  children: React.ReactNode;
  defaultOpen: boolean;
};

export default function Collapse({ title, id, children, defaultOpen }: CollapseProps) {
  const [show, setShow] = useState(defaultOpen);

  const ItemTitle = () => (
    <div className={styles.ItemTitle}>
      <span className={styles.ItemTitleCodeWrapper}>
        <code className={styles.ItemTitleCode}>{title.code}</code>
      </span>
      {title.title}
    </div>
  );

  return (
    <Collapsible
      open={show}
      transitionTime={300}
      onOpening={() => setShow(true)}
      onClosing={() => setShow(false)}
      trigger={
        <div className={styles.CollapseTitle} id={id}>
          <ItemTitle />
          <AiFillCaretDown size={11} className={styles.CollapseTitleIcon} />
        </div>
      }
    >
      {children}
    </Collapsible>
  );
}
