import React from 'react';
import styles from './styles.module.scss';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { MdFace } from 'react-icons/md';
import authorInfo from '@site/src/data/author.json';

type Props = {
  name: string;
  dynasty?: string;
  source?: string;
};

const Author = ({ name, source, dynasty }: Props) => {
  const authors: Record<string, { avatar?: string; dynasty?: string } | undefined> = authorInfo;
  const data = authors[name] ?? {};
  const avatar = useBaseUrl(data.avatar || '/');
  const authorPrefix = ((dynasty || data.dynasty) && `【${dynasty || data.dynasty}】`) || '';

  return (
    <div className={styles.Author}>
      {data.avatar ? (
        <img className={styles.AuthorPicture} src={avatar} alt='' />
      ) : (
        <MdFace className={styles.AuthorPicture} />
      )}
      <div className={styles.AuthorContent}>
        <strong className={styles.AuthorTitle}>{authorPrefix + name}</strong>
        {source && <small className={styles.AuthorSubtitle}>{source}</small>}
      </div>
    </div>
  );
};

export default Author;
