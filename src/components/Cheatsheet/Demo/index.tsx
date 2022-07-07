import React from 'react';
import styles from './Demo.module.scss';

interface Props {
  data: {
    regex?: string;
    description: string;
    purpose: string;
    example: string;
  };
}

export default ({ data }: Props) => (
  <div className={styles.Demo}>
    <div
      data-title='說明'
      dangerouslySetInnerHTML={{
        __html: `<p>${data.description.replace(/\\n/gim, '<br/>').replace(/`(.*?)`/g, '<code>$1</code>')}</p>`,
      }}
    />
    <div data-title='作用' dangerouslySetInnerHTML={{ __html: `<p>${data.purpose}</p>` }} />
    <div
      data-title='例子'
      dangerouslySetInnerHTML={{
        __html: `<p>${data.example
          .replace(
            new RegExp(`(${data.regex?.replace(`\\1`, `\\2`)})`, 'gmi'),
            `<span class=${styles.Highlight}>$1</span>`,
          )
          .replace(/\\n/gim, '<br/>')}</p>`,
      }}
    />
  </div>
);
