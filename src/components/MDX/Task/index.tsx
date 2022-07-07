import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import styles from './styles.module.scss';
import Box from '@mui/material/Box';
import { MdClose } from 'react-icons/md';

type Task = {
  children: any;
};

export default function (props: Task) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Chip label='答案' color='primary' variant='outlined' onClick={() => setOpen(!open)} className={styles.button} />

      {open && (
        <Box
          sx={{
            p: 2,
            border: '1px dashed grey',
            marginTop: '1rem',
            position: 'relative',
          }}
        >
          <div className={styles.answerBlock}>{props.children}</div>
          <MdClose className={styles.closeAnswer} size={24} onClick={() => setOpen(false)} />
        </Box>
      )}
    </>
  );
}
