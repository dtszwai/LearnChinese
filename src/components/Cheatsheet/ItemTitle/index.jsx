import React from 'react';
import clsx from 'clsx';
import styles from './ItemTitle.module.css';

const ItemTitle = ({ data, className, ...props }) => {
  return (
    <div {...props} className={clsx(styles.ItemTitle, className)}>
      <span className={styles.ItemTitleCodeWrapper}>
        <code className={styles.ItemTitleCode}>{data?.code}</code>
      </span>
      <div className={styles.ItemTitleText}>
        {data?.title}
      </div>
    </div>
  );
};

export default ItemTitle;
