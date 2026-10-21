import React, { useEffect, useState, useId } from 'react';
import MuiCollapse from '@mui/material/Collapse';
import styles from './Collapse.module.scss';
import { AiFillCaretDown } from 'react-icons/ai';
import useBrokenLinks from '@docusaurus/useBrokenLinks';

type Props = {
  title: { code: string; title: string };
  id: string;
  children: React.ReactNode;
  defaultOpen: boolean;
};

const Collapse = ({ title, id, children, defaultOpen }: Props) => {
  useBrokenLinks().collectAnchor(id);
  const [show, setShow] = useState(defaultOpen);
  const contentId = useId();
  // The router exposes the hash after hydration and on subsequent SPA links.
  useEffect(() => setShow(defaultOpen), [defaultOpen]);

  const ItemTitle = () => (
    <span className={styles.ItemTitle}>
      <span className={styles.ItemTitleCodeWrapper}>
        <code className={styles.ItemTitleCode}>{title.code}</code>
      </span>
      {title.title}
    </span>
  );

  return (
    <div>
      <button
        type='button'
        className={styles.Trigger}
        aria-expanded={show}
        aria-controls={contentId}
        onClick={() => setShow((open) => !open)}
      >
        <span className={styles.CollapseTitle} id={id}>
          <ItemTitle />
          <AiFillCaretDown size={11} className={styles.CollapseTitleIcon} />
        </span>
      </button>
      <MuiCollapse in={show} timeout={300} easing='linear' id={contentId} inert={!show}>
        {children}
      </MuiCollapse>
    </div>
  );
};

export default Collapse;
