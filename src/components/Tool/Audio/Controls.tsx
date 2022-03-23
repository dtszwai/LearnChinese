import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { MdPlayArrow, MdPause, MdStop } from 'react-icons/md';

export default function ({ isPlaying, onPlayPauseClick, onScrub, ...props }) {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
      {...props}
    >
      <IconButton
        sx={{ color: 'inherit' }}
        aria-label='play/pause'
        onClick={() => onPlayPauseClick(!isPlaying)}
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
