import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import styles from './styles.module.scss';
export { default as Carousel } from './Carousel';
export { default as Author } from './Author';
export { default as AudioCard } from './AudioCard';
export { default as Task } from './Task';
export { Tips, Display } from './ToggleDisplay';

export const Text = ({ title, children }) => (
  <div className='text-block'>
    {title && <div className='title'>{title}</div>}
    <div className='content'>{children}</div>
  </div>
);

export const Remark = ({ children, type }) => (
  <p className={styles.remark}>
    <span className={styles.type}>{type}</span>
    {children}
  </p>
);

export const Annotate = ({ children, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      open={open}
      title={title}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      <span className={styles.Tooltip}>{children}</span>
    </Tooltip>
  );
};

export const Highlight = ({ children, color }) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}
  >
    {children}
  </span>
);

export const Video = (src: string, start: number, site: string) => (
  <div className={styles.videoResponsive}>
    <iframe
      src={
        site === 'Youtube'
          ? `https://www.youtube-nocookie.com/embed/${src}?start=${start}&origin=http://rccttwd.github.io/`
          : `https://player.bilibili.com/player.html?bvid=${src}&high_quality=1&danmaku=0`
      }
      frameBorder='0'
      allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  </div>
);
