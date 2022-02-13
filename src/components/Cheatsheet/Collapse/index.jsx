import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import styles from './Collapse.module.css';
import { AiFillCaretDown } from 'react-icons/ai';

export default function Collapse({ title, children }) {
  const [show, setShow] = useState(false);

  const ItemTitle = () => {
    return (
      <div className={styles.ItemTitle}>
        <span className={styles.ItemTitleCodeWrapper}>
          <code className={styles.ItemTitleCode}>{title.code}</code>
        </span>
        {title.title}
      </div>
    );
  };

  return (
    <Collapsible
      transitionTime={300}
      onOpening={() => setShow(true)}
      onClosing={() => setShow(false)}
      trigger={
        <div className={styles.CollapseTitle}>
          {ItemTitle()}
          <AiFillCaretDown
            size={11}
            className={
              show ? styles.CollapseTitleIconActive : styles.CollapseTitleIcon
            }
          />
        </div>
      }
    >
      <div className={styles.CollapseContent}>{children}</div>
    </Collapsible>
  );
}
