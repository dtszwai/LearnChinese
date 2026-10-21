import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import styles from './styles.module.scss';

type Props = { children?: React.ReactNode; title: React.ReactNode };
const Annotate = ({ children, title }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    // Keep Emotion's SSR style tags inside an inline wrapper. Otherwise the
    // HTML minifier closes the surrounding MDX paragraph before those tags.
    <span>
      <Tooltip describeChild open={open} title={title} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <span
          className={styles.Annotate}
          role='button'
          tabIndex={0}
          aria-expanded={open}
          onClick={() => setOpen((shown) => !shown)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setOpen((shown) => !shown);
            } else if (event.key === 'Escape') {
              setOpen(false);
            }
          }}
        >
          {children}
        </span>
      </Tooltip>
    </span>
  );
};

export default Annotate;
