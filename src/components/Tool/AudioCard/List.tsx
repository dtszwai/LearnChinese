import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default ({
  tracks,
  setTrackIndex,
}: {
  tracks: { cap: string }[];
  setTrackIndex: any;
}) => {
  return (
    <List sx={{ width: 151, margin: '8px' }} aria-label='panel'>
      <Divider />
      {tracks.map((obj, i) => {
        return (
          <React.Fragment key={i}>
            <ListItem button onClick={() => setTrackIndex(i)}>
              <ListItemText primary={obj.cap} />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};
