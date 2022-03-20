import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';

//Author
import { MdFace } from 'react-icons/md';
import authorInfo from '@site/static/misc/author';

interface Author {
  name: string;
  source?: string;
  dynasty?: string;
  inline?: boolean;
  label?: string;
  src?: string;
}

export const Author = ({
  name,
  source,
  dynasty,
  inline,
  label = name,
  src,
}: Author): JSX.Element => {
  let tags = !!authorInfo[name];
  let { avatar, dynasty: infoDynasty } = Object(authorInfo[name]);

  let renderedDynasty: string =
    dynasty || infoDynasty ? `【${dynasty || infoDynasty}】` : '';

  let renderAvatar = avatar ? (
    <img
      className={inline ? styles.avatarInline : 'avatar__photo'}
      src={useBaseUrl(src || avatar)}
    />
  ) : (
    <MdFace className={inline ? styles.avatarInline : 'avatar__photo'} />
  );

  return inline ? (
    <Link
      className={styles.authorInline}
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={tags && `/tags/${name}`}
    >
      {renderAvatar}
      {label}
    </Link>
  ) : (
    <div className={clsx('avatar', styles.author)}>
      <Link
        to={tags && `/tags/${name}`}
        style={{ textDecoration: 'none', display: 'inherit', color: 'inherit' }}
      >
        {renderAvatar}
        <div className='avatar__intro' style={{ flex: 'none' }}>
          <div className='avatar__name'>{renderedDynasty + label}</div>
          {source && <small className='avatar__subtitle'>{source}</small>}
        </div>
      </Link>
    </div>
  );
};

export const Remark = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: string;
}) => {
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

export const Video = (src: string, start: number, site: string) => (
  <div className={styles.videoResponsive}>
    <iframe
      src={
        site === 'Youtube'
          ? `https://www.youtube-nocookie.com/embed/${src}?start=${start}`
          : `https://player.bilibili.com/player.html?bvid=${src}&high_quality=1&danmaku=0`
      }
      frameBorder='0'
      allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  </div>
);
