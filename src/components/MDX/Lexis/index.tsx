import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

export const Jypt = ({ py, children }) => {
  const [cursorStyle, setCursorStyle] = useState('pointer');
  const [audio, setAudio] = useState(null);
  const audio_link = py
    ? `https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/sound/${py}.wav`
    : null;

  useEffect(() => {
    if (audio_link) {
      setAudio(new Audio(audio_link));
    } else {
      setCursorStyle('default');
      setAudio(null);
    }
  }, [audio_link]);

  const handlePlayAudio = () => {
    if (audio) {
      audio.play();
    }
  };


  return <button onClick={handlePlayAudio} className={styles.jypt} style={{ cursor: cursorStyle }}>
    {children} {py && `[${py}]`}
  </button>

}

