import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

type Props = { py?: string; children?: React.ReactNode };
const Jypt = ({ py, children }: Props) => {
  const [cursorStyle, setCursorStyle] = useState('pointer');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const audio_link = py ? `https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/sound/${py}.wav` : null;

  useEffect(() => {
    if (audio_link) {
      const player = new Audio(audio_link);
      setAudio(player);
      setCursorStyle('pointer');
      return () => {
        player.pause();
        player.removeAttribute('src');
        player.load();
      };
    } else {
      setCursorStyle('default');
      setAudio(null);
    }
  }, [audio_link]);

  const handlePlayAudio = () => {
    if (audio) {
      void audio.play().catch(() => {});
    }
  };

  return (
    <button onClick={handlePlayAudio} className={styles.jypt} style={{ cursor: cursorStyle }}>
      {children} {py && `[${py}]`}
    </button>
  );
};

export default Jypt;
