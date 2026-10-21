import React from 'react';
import { Box, IconButton } from '@mui/material';
import { MdPlayArrow, MdPause, MdStop } from 'react-icons/md';

export default function Controls({
  isPlaying,
  onToggle,
  onStop,
}: {
  isPlaying: boolean;
  onToggle: () => void;
  onStop: () => void;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
      <IconButton
        sx={{ color: 'inherit' }}
        aria-label='Play/Pause toggle'
        onClick={onToggle}
        children={isPlaying ? <MdPause size={38} /> : <MdPlayArrow size={38} />}
      />
      <IconButton
        sx={{ color: 'inherit', marginTop: '8px' }}
        aria-label='Stop'
        onClick={onStop}
        children={<MdStop />}
      />
    </Box>
  );
}
