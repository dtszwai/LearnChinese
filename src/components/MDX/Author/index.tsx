import React from 'react';
import styles from './styles.module.scss';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { MdFace } from 'react-icons/md';
import authorInfo from '@site/src/data/author.json';

interface Author {
  name: string;
  dynasty?: string;
  source?: string;
}

export default function ({ name, source, dynasty }: Author) {
  const data = Object(authorInfo[name]);

  const Avatar = (props) =>
    data.avatar ? (
      <img {...props} src={useBaseUrl(data.avatar)} />
    ) : (
      <MdFace {...props} />
    );

  return (
    <div className={styles.author}>
      <Avatar className={styles.avatar} />
      <div className={styles.intro}>
        <strong className={styles.title}>
          {(dynasty || data.dynasty) && `【${dynasty || data.dynasty}】`}
          {name}
        </strong>
        {source && <small className={styles.subtitle}>{source}</small>}
      </div>
    </div>
  );
}
