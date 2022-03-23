import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MdPlayArrow, MdPause, MdStop } from 'react-icons/md';

export default function ({
  isPlaying,
  onPlayPauseClick,
  onScrub,
  styles,
  audioRef,
}) {
  // iOS prohibits use of the .play() function on an existing HTML <audio> element or JS Audio() element,
  // unless called directly and synchronously as the result of a user UI event.
  // https://stackoverflow.com/questions/66300840/trying-to-play-an-mp3-via-js-on-ios-browsers
  const playAudio = () => {
    !isPlaying && audioRef.current.play(); // the play/pause function works when we have audio.play() calls.
    onPlayPauseClick(!isPlaying);
  };

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
      className={styles}
    >
      <IconButton
        sx={{ color: 'inherit' }}
        aria-label='play/pause'
        onClick={playAudio}
        children={isPlaying ? <MdPause size={38} /> : <MdPlayArrow size={38} />}
      />
      <IconButton
        sx={{ color: 'inherit' }}
        aria-label='stop'
        onClick={() => {
          onScrub(0);
          onPlayPauseClick(false);
        }}
        style={{ marginTop: '8px' }}
        children={<MdStop />}
      />
    </Box>
  );
}
