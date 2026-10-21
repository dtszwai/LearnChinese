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

type Props = { track: trackProps; tracks?: never } | { track?: never; tracks: (trackProps & { cap: string })[] };

const AudioCard = ({ track, tracks }: Props) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const {
    title,
    subtitle,
    src: _src,
    image = '/img/audio.svg',
  } = track ?? tracks?.[trackIndex] ?? { title: '', subtitle: '', src: '' };
  const src = useBaseUrl(_src);

  const imageSrc = useBaseUrl(image);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
  const progressStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, var(--ifm-color-info)), color-stop(${currentPercentage}, #777))`;

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;
    setIsPlaying(false);
    setDuration(0);
    setTrackProgress(0);
    const metadata = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const progress = () => setTrackProgress(audio.currentTime);
    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);
    const ended = () => {
      audio.currentTime = 0;
      setTrackProgress(0);
      setIsPlaying(false);
    };
    audio.addEventListener('loadedmetadata', metadata);
    audio.addEventListener('timeupdate', progress);
    audio.addEventListener('play', play);
    audio.addEventListener('pause', pause);
    audio.addEventListener('ended', ended);
    audio.addEventListener('error', pause);
    return () => {
      audio.removeEventListener('loadedmetadata', metadata);
      audio.removeEventListener('timeupdate', progress);
      audio.removeEventListener('play', play);
      audio.removeEventListener('pause', pause);
      audio.removeEventListener('ended', ended);
      audio.removeEventListener('error', pause);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
    };
  }, [src]);

  const onScrub = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(value)) return;
    audio.currentTime = Math.max(0, Math.min(value, duration));
    setTrackProgress(audio.currentTime);
  };
  const onToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // Call synchronously in the user gesture for iOS, and handle blocked playback.
    if (audio.paused) void audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  };
  const onStop = () => {
    audioRef.current?.pause();
    onScrub(0);
  };

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
        <Controls {...{ isPlaying, onToggle, onStop }} />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <span className={styles.timer}>{Number.isNaN(duration) ? '00:00' : toTime(trackProgress)}</span>
          <input
            type='range'
            aria-label='播放進度'
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
        <CardMedia component='img' className={styles.trackInfo} image={imageSrc} />
      ) : (
        <CardMedia>
          <List tracks={tracks ?? []} setTrackIndex={setTrackIndex} />
        </CardMedia>
      )}
    </Card>
  );
};

export default AudioCard;
