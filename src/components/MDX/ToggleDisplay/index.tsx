import React, { useState, useLayoutEffect } from 'react';
import Chip from '@mui/material/Chip';
import styles from './styles.module.scss';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';

type Tips = {
  children: any;
  group: string;
};

type Display = {
  left?: boolean;
} & Target &
  Text;

type Target = { all: true; group?: never } | { group: string; all?: never };

type Text =
  | { children: React.ReactNode; label?: never }
  | { label: string; children?: never };

export const Tips = (props: Tips) => {
  return (
    <div data-tips={props.group} style={{ display: 'none' }}>
      {props.children}
    </div>
  );
};

export const Display = (props: Display) => {
  if (!ExecutionEnvironment.canUseDOM) return null;
  const { pathname } = useLocation();
  const {
    activeDoc: { id },
  } = useActiveDocContext();
  const data = JSON.parse(localStorage.getItem(props.label));
  const [show, setShow] = useState(data?.[id]);

  useLayoutEffect(() => {
    const node = Array.from(
      document.querySelectorAll<HTMLElement>(
        props.all ? '[data-tips]' : `[data-tips='${props.group}']`,
      ),
    );

    node.forEach((el) => (el.style.display = show ? 'inherit' : 'none'));
  }, [pathname, show]);

  const isShow = () => {
    localStorage.setItem(props.label, JSON.stringify({ ...data, [id]: !show }));
    setShow(!show);
  };

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
        onClick={() => isShow()}
        label={props.children ?? (show ? '隱藏' : '顯示') + props.label}
      />
    </div>
  );
};
