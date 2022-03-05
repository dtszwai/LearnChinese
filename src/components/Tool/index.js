import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import styles from './index.module.scss';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';

//Author
import { MdFace } from 'react-icons/md';
import authorInfo from '@site/static/misc/author';

export const Author = ({ name, source, dynasty, right = true, tags = true }) => {
  let { avatar, dynasty: authorDynasty } = Object(authorInfo[name]);
  let renderedDynasty = dynasty || authorDynasty ? `【${dynasty || authorDynasty}】` : '';

  let renderedImage = avatar
    ? <img className='avatar__photo' src={useBaseUrl(avatar)} />
    : <MdFace className='avatar__photo' />

  let renderedIntro = (
    <div className='avatar__intro' style={right ? { flex: 'none' } : null}>
      <div className='avatar__name'>{renderedDynasty + name}</div>
      {source && <small className='avatar__subtitle'>{source}</small>}
    </div>
  );

  return (
    <div className={clsx('avatar', right && styles.author)}>
      <Link
        to={tags ? `/tags/${name}` : null}
        style={{ textDecoration: 'none', display: 'inherit', color: 'inherit' }}
      >
        {renderedImage}
        {renderedIntro}
      </Link>
    </div>
  );
};

export const Remark = ({ children, type }) => {
  return (
    <p className={styles.remark}>
      <span className={styles.type}>{type}</span>
      {children}
    </p>
  );
};

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

export const Youtube = ({ children, id, start = 0 }) => {
  const src = children ?? id;
  return (
    <div className={styles.videoResponsive}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${src}?start=${start}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </div>
  );
};

export const Bilibili = ({ children, id }) => {
  const src = children ?? id;
  return (
    <div className={styles.videoResponsive}>
      <iframe
        src={`https://player.bilibili.com/player.html?bvid=${src}&page=1&as_wide=1&high_quality=1&danmaku=0`}
        scrolling='no'
        border='0'
        frameBorder='no'
        allowFullScreen
      />
    </div>
  );
};

export const Recommend = (props) => {
  return (
    <span style={{ color: '#999' }}>推薦：{props.level || props.children}</span>
  );
};
