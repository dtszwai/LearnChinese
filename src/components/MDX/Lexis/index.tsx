import React, { useState, useMemo } from 'react';
import styles from './styles.module.scss';

export const Jypt = ({ py, children }) => {
  const [cursorStyle, setCursorStyle] = useState('pointer');
  const audio_link = `https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/sound/${py}.wav`
  const audio = React.useMemo(() => new Audio(audio_link), [])

  audio.addEventListener('error', () => {
    setCursorStyle('default');
  });

  return <div className={styles.jypt} style={{ cursor: cursorStyle }}>
    <button onClick={() => cursorStyle == 'pointer' && audio.play()} className={styles.button}>
      {children} [{py}]
    </button>
  </div>
}

