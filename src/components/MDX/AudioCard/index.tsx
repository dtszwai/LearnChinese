import React, { useState, useEffect, useRef } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Controls from './Controls';
import List from './List';
import styles from './styles.module.scss';

type trackProps = {
  title: string;
  subtitle: string;
  src: string;
  image?: string;
};

type Props = {
  track?: trackProps;
  tracks?: (trackProps & { cap: string })[];
};

export default ({ track, tracks }: Props) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const { title, subtitle, src: _src, image = '/img/audio.svg' } = track ?? tracks[trackIndex];
  const src = useBaseUrl(_src);

  const audioRef = useRef(typeof Audio !== 'undefined' ? new Audio(src) : ({} as HTMLAudioElement));
  audioRef.current.onloadedmetadata = () => setDuration(audioRef.current.duration);

  const intervalRef = useRef<NodeJS.Timer>();

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
  const progressStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, var(--ifm-color-info)), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
      if (audioRef.current.ended) {
        onScrub(0);
        setIsPlaying(false);
      }
    }, 1000);
  };

  const onScrub = (value: number) => {
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
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();
    setIsPlaying(false);
    audioRef.current = typeof Audio !== 'undefined' && new Audio(src);
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
          <Typography variant='h5' component='div' className={styles.title} children={title} />
          <Typography variant='subtitle1' component='div' className={styles.subtitle} children={subtitle} />
        </CardContent>
        <Controls {...{ isPlaying, setIsPlaying, onScrub, audioRef }} />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <span className={styles.timer}>{Number.isNaN(duration) ? '00:00' : toTime(trackProgress)}</span>
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
          <span className={styles.timer}>{Number.isNaN(duration) ? '00:00' : toTime(duration)}</span>
        </div>
      </Box>
      {track ? (
        <CardMedia component='img' className={styles.trackInfo} image={useBaseUrl(image)} />
      ) : (
        <CardMedia>
          <List {...{ tracks, setTrackIndex }} />
        </CardMedia>
      )}
    </Card>
  );
};
