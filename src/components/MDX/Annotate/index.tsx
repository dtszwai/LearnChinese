import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import styles from './styles.module.scss'

const Annotate = ({ children, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      open={open}
      title={title}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      <span className={styles.Annotate}>{children}</span>
    </Tooltip>
  );
};

export default Annotate;