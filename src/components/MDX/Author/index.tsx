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

export default ({ name, source, dynasty }: Author) => {
  const data = Object(authorInfo[name]);
  const Avatar = (props) => (data.avatar ? <img {...props} src={useBaseUrl(data.avatar)} /> : <MdFace {...props} />);

  return (
    <div className={styles.Author}>
      <Avatar className={styles.AuthorPicture} />
      <div className={styles.AuthorContent}>
        <strong className={styles.AuthorTitle}>
          {(dynasty || data.dynasty) && `【${dynasty || data.dynasty}】`}
          {name}
        </strong>
        {source && <small className={styles.AuthorSubtitle}>{source}</small>}
      </div>
    </div>
  );
};
