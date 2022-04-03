import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import { MdFace } from 'react-icons/md';
import authorInfo from '@site/static/misc/author';

type Author = {
  name: string;
  source?: string;
  dynasty?: string;
  inline?: boolean;
  label?: string;
  src?: string;
};

export default function ({
  name,
  source,
  dynasty,
  inline,
  label = name,
  src,
}: Author) {
  let tags = !!authorInfo[name];
  let { avatar, dynasty: infoDynasty } = Object(authorInfo[name]);

  let renderedDynasty =
    dynasty || infoDynasty ? `【${dynasty || infoDynasty}】` : '';

  let renderedAvatar = avatar ? (
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
      {renderedAvatar}
      {label}
    </Link>
  ) : (
    <div className={clsx('avatar', styles.author)}>
      <Link
        to={tags && `/tags/${name}`}
        style={{
          textDecoration: 'none',
          display: 'inherit',
          color: 'inherit',
          border: 'none',
        }}
      >
        {renderedAvatar}
        <div
          className='avatar__intro'
          style={{ flex: 'none', alignItems: 'center' }}
        >
          <div className='avatar__name'>{renderedDynasty + label}</div>
          {source && <small className='avatar__subtitle'>{source}</small>}
        </div>
      </Link>
    </div>
  );
}
