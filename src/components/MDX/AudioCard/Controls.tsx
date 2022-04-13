import React from 'react';
import { Box, IconButton } from '@mui/material';
import { MdPlayArrow, MdPause, MdStop } from 'react-icons/md';

export default function ({ isPlaying, setIsPlaying, onScrub, audioRef }) {
  // iOS prohibits use of the .play() function on an existing HTML <audio> element or JS Audio() element,
  // unless called directly and synchronously as the result of a user UI event.
  // https://stackoverflow.com/questions/66300840/trying-to-play-an-mp3-via-js-on-ios-browsers
  const playAudio = () => {
    !isPlaying && audioRef.current.play(); // the play/pause function works when we have audio.play() calls.
    setIsPlaying(!isPlaying);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
      <IconButton
        sx={{ color: 'inherit' }}
        aria-label='Play/Pause toggle'
        onClick={playAudio}
        children={isPlaying ? <MdPause size={38} /> : <MdPlayArrow size={38} />}
      />
      <IconButton
        sx={{ color: 'inherit', marginTop: '8px' }}
        aria-label='Stop'
        onClick={() => {
          onScrub(0);
          setIsPlaying(false);
        }}
        children={<MdStop />}
      />
    </Box>
  );
}
