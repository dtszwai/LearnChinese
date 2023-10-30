import React, { useContext } from 'react';
import Chip from '@mui/material/Chip';
import styles from './styles.module.scss';
import { CommentaryContext } from '@site/src/theme/Root';

type TipsProps = { children: React.ReactNode; group: string };
type DisplayProps = { left?: boolean } & TargetProps & TextProps;
type TargetProps = { all: true; group?: never } | { group: string; all?: never };
type TextProps = { children: React.ReactNode; label?: never } | { label: string; children?: never };

const TextComponent = (props: TipsProps) => {
  const [show] = useContext(CommentaryContext);
  return <div style={{ display: show[props.group] ? 'inherit' : 'none' }}>{props.children}</div>;
};

const ButtonComponent = (props: DisplayProps) => {
  const [show, setShow] = useContext(CommentaryContext);

  const showComment = () => {
    setShow({ ...show, [props.group]: !show[props.group] });
  };

  React.useEffect(() => {
    return () => setShow({});
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Chip
        className={styles.buttonChip}
        color='success'
        variant='outlined'
        onClick={showComment}
        label={props.children ?? (show[props.group] ? '隱藏' : '顯示') + props.label}
      />
    </div>
  );
};

const Panel = (props) => (
  <div className={styles.Commentary_Panel}>
    {props.children}
  </div>
);

export default (props) => {
  const varientMap = {
    button: <ButtonComponent {...props} />,
    text: <TextComponent {...props} />,
    panel: <Panel {...props} />,
  };

  return varientMap[props.type];
};
