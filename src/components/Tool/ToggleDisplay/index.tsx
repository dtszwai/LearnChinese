import React, { useState, useLayoutEffect } from 'react';
import Chip from '@mui/material/Chip';
import styles from './styles.module.scss';
import { useLocation } from '@docusaurus/router';

type Tips = {
  children: any;
  group: string;
};

type Display = {
  children?: any;
  group?: string;
  label?: string;
  all?: boolean;
  left?: boolean;
};

export const Tips = (props: Tips) => {
  return (
    <div data-tips={props.group} style={{ display: 'none' }}>
      {props.children}
    </div>
  );
};

export const Display = (props: Display) => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const node = Array.from(
      document.querySelectorAll<HTMLElement>(
        props.all ? '[data-tips]' : `[data-tips='${props.group}']`,
      ),
    );

    node.forEach((el) => (el.style.display = show ? 'inherit' : 'none'));
  }, [pathname, show]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: props.left ? 'flex-start' : 'flex-end',
      }}
    >
      <Chip
        className={styles.button}
        color='success'
        variant='outlined'
        onClick={() => setShow(!show)}
        label={props.children ?? (show ? '隱藏' : '顯示') + props.label}
      />
    </div>
  );
};
