import React from 'react';
import styles from './Demo.module.scss';

type DemoProps = {
  regex: string;
  example: string;
  purpose: string;
  description: string;
};

export default function Demo({ data }: { data: DemoProps }) {
  let regex = data.regex.match(/\\\d+/g)
    ? new RegExp(`(${data.regex.replace(`\\1`, `\\2`)})`, 'gmi')
    : new RegExp(`(${data.regex})`, 'gmi');
  const replacedContent = data.example
    .replace(regex, `<span class=${styles.DemoResultTag}>$1</span>`)
    .replace(/\\n/gm, '<br />');

  return (
    <div className={styles.Demo}>
      <div
        data-title='說明'
        dangerouslySetInnerHTML={{
          __html: data.description
            .replace(/\\n/gm, '<br />')
            .replace(/`(.*?)`/g, '<code>$1</code>'),
        }}
      />

      <div
        data-title='作用'
        dangerouslySetInnerHTML={{ __html: data.purpose }}
      />

      <div
        data-title='例子'
        dangerouslySetInnerHTML={{ __html: replacedContent }}
      />
    </div>
  );
}
