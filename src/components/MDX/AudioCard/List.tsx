import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default ({ tracks, setTrackIndex }: { tracks: { cap: string }[]; setTrackIndex: any }) => {
  return (
    <List sx={{ width: 151, margin: '8px' }} aria-label='panel'>
      <Divider />
      {tracks.map((obj, i) => {
        return (
          <React.Fragment key={i}>
            <ListItemButton onClick={() => setTrackIndex(i)}>
              <ListItemText primary={obj.cap} />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};
