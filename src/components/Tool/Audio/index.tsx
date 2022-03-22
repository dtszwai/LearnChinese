import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Controls from './Controls';
import styles from './styles.module.scss';

type audio = {
  title?: string;
  author?: string;
  image?: string;
  src: string;
  frontMatter?: {
    author: string;
    title: string;
  };
};

export default function (props: audio) {
  const { title, author, image, src, frontMatter } = props;
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(
    typeof Audio !== 'undefined' && new Audio(useBaseUrl(src)),
  );
  const intervalRef = useRef<NodeJS.Timer | null>();
  const { duration } = audioRef.current;
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';

  const progressStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, var(--ifm-color-info)), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      !audioRef.current.ended && setTrackProgress(audioRef.current.currentTime);
    }, 1000);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    !isPlaying && setIsPlaying(true);
    startTimer();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const toTime = (e: number) => {
    var m = Math.floor(e / 60)
        .toString()
        .padStart(2, '0'),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, '0');

    return m + ':' + s;
  };

  return (
    <Card className={styles.Card}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            variant='h5'
            component='div'
            className={styles.title}
            children={title || frontMatter?.title}
          />
          <Typography
            variant='subtitle1'
            component='div'
            className={styles.author}
            children={author || frontMatter?.author}
          />
        </CardContent>
        <Controls
          isPlaying={isPlaying}
          onPlayPauseClick={setIsPlaying}
          onScrub={onScrub}
          className={styles.controls}
        />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {Number.isNaN(duration) ? '00:00' : toTime(trackProgress)}
          <input
            type='range'
            value={trackProgress}
            step='1'
            min='0'
            max={duration ? duration : `${duration}`}
            className={styles.progress}
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: progressStyling }}
          />
          {Number.isNaN(duration) ? '00:00' : toTime(duration)}
        </div>
      </Box>
      <CardMedia
        component='img'
        sx={{ width: 151 }}
        image={useBaseUrl(image || '/img/Audio.svg')}
        style={{ margin: '8px' }}
      />
    </Card>
  );
}
