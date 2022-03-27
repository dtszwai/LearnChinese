import React, { useLayoutEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import styles from './Collapse.module.scss';
import { AiFillCaretDown } from 'react-icons/ai';

type CollapseProps = {
  title: { code: string; title: string };
  id: string;
  children: React.ReactNode;
  defaultOpen: boolean;
};

export default function Collapse({
  title,
  id,
  children,
  defaultOpen,
}: CollapseProps) {
  const [show, setShow] = useState<boolean>();

  useLayoutEffect(() => {
    setShow(defaultOpen);
  }, []);

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
      open={show}
      transitionTime={300}
      onOpening={() => setShow(true)}
      onClosing={() => setShow(false)}
      trigger={
        <div className={styles.CollapseTitle} id={id}>
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
