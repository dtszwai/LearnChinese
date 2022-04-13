import React, { useState, useEffect, useRef } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Controls from './Controls';
import List from './List';
import styles from './styles.module.scss';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

type trackProps = {
  title: string;
  author: string;
  src: string;
  image?: string;
};

type Props =
  | {
      track: trackProps;
      tracks?: never;
    }
  | {
      tracks: trackProps[] & { cap: string }[];
      track?: never;
    };

export default ({ track, tracks }: Props) => {
  if (!ExecutionEnvironment.canUseDOM) return null;

  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const {
    title,
    author,
    src: _src,
    image = '/img/audio.svg',
  } = track ?? tracks[trackIndex];

  const src = useBaseUrl(_src);

  const audioRef = useRef(new Audio(src));

  const intervalRef = useRef<NodeJS.Timer>();

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
      setTrackProgress(audioRef.current.currentTime);
      if (audioRef.current.ended) {
        onScrub(0);
        setIsPlaying(false);
      }
    }, 1000);
  };

  const onScrub = (value: number) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
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

  useEffect(() => {
    audioRef.current.pause();
    setIsPlaying(false);
    audioRef.current = new Audio(src);
    setTrackProgress(audioRef.current.currentTime);
  }, [trackIndex]);

  const toTime = (e: number) => {
    let m = Math.floor(Math.ceil(e) / 60)
      .toString()
      .padStart(2, '0');
    let s = Math.floor(Math.ceil(e) % 60)
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
            children={title}
          />
          <Typography
            variant='subtitle1'
            component='div'
            className={styles.author}
            children={author}
          />
        </CardContent>
        <Controls {...{ isPlaying, setIsPlaying, onScrub, audioRef }} />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {Number.isNaN(duration) ? '00:00' : toTime(trackProgress)}
          <input
            type='range'
            value={trackProgress}
            step='1'
            min='0'
            max={Number.isNaN(duration) ? 0 : duration}
            className={styles.progress}
            onChange={(e) => onScrub(Number(e.target.value))}
            style={{ background: progressStyling }}
          />
          {Number.isNaN(duration) ? '00:00' : toTime(duration)}
        </div>
      </Box>
      {track ? (
        <CardMedia
          component='img'
          sx={{ width: '151px', margin: '8px' }}
          image={useBaseUrl(image)}
        />
      ) : (
        <CardMedia>
          <List {...{ tracks, setTrackIndex }} />
        </CardMedia>
      )}
    </Card>
  );
};
