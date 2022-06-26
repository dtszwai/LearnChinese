import React, { useContext } from 'react';
import Chip from '@mui/material/Chip';
import styles from './styles.module.scss';
import { CommentaryContext } from '@site/src/theme/Root';

type Tips = { children: any; group: string };
type Display = { left?: boolean } & Target & Text;
type Target = { all: true; group?: never } | { group: string; all?: never };
type Text =
  | { children: React.ReactNode; label?: never }
  | { label: string; children?: never };

const Text = (props: Tips) => {
  const [show] = useContext(CommentaryContext);
  return (
    <div style={{ display: show[props.group] ? 'inherit' : 'none' }}>
      {props.children}
    </div>
  );
};

const Button = (props: Display) => {
  const [show, setShow] = useContext(CommentaryContext);
  React.useEffect(() => {
    return () => setShow({});
  }, []);

  const showComment = () => {
    setShow({ ...show, [props.group]: !show[props.group] });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Chip
        className={styles.button}
        color='success'
        variant='outlined'
        onClick={showComment}
        label={
          props.children ?? (show[props.group] ? '隱藏' : '顯示') + props.label
        }
      />
    </div>
  );
};

const Panel = (props) => {
  return (
    <div
      className='Commentary_Panel'
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      {props.children}
    </div>
  );
};

export default (props) => {
  switch (props.type) {
    case 'button':
      return <Button {...props} />;
    case 'text':
      return <Text {...props} />;
    case 'panel':
      return <Panel {...props} />;
    default:
      console.log('Error: Commentary enter wrong type.');
      return <div {...props} />;
  }
};
