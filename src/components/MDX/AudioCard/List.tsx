import React from 'react';
import { List, ListItemButton, ListItemText, Divider } from '@mui/material';
import styles from './styles.module.scss';

type TrackListProps = {
  tracks: { cap: string }[];
  setTrackIndex: (index: number) => void;
};

export default ({ tracks, setTrackIndex }: TrackListProps) => {
  return (
    <List className={styles.trackInfo} aria-label='panel'>
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
