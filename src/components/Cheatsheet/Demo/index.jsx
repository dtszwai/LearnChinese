import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import styles from './Demo.module.scss';

const Demo = ({ data }) => {
  const [content, setContent] = useState(data?.example);
  let description = data.description?.replace(/\\n/gm, '<br />')?.replace(/`(.*?)`/g, '<code>$1</code>')

  const applyRegex = () => {
    let $regex = data?.regex;
    $regex.match(/\\(\d+)/g)?.forEach(item => $regex = $regex?.replace(`\\${item[1]}`, `\\${parseInt(item[1], 10) + 1}`));
    const reg = new RegExp(`(${$regex})`, 'gmi');
    const replacedContent = content.replace(reg, `<span class=${styles.DemoResultTag}>$1</span>`);

    setContent(replacedContent);
    };

  useEffect(applyRegex, []);

  return (
    <div className={styles.Demo}>
      {description && (
      <div
        className={clsx(styles.DemoBlock, styles.DemoBlockContent, styles.DemoDescription)}
        data-title='說明'
        dangerouslySetInnerHTML={{ __html: description }}
      />
      )}
        <div
          className={clsx(styles.DemoBlock, styles.DemoBlockContent)}
          data-title='作用'
        >
          {data?.purpose}
        </div>
        
      <div
        className={clsx(styles.DemoBlock, styles.DemoBlockContent)}
        data-title='例子'
        dangerouslySetInnerHTML={{
          __html: content?.replace(/\\n/gm, '<br />'),
        }}
      />

    </div>
  );
}

export default Demo;
