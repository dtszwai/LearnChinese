import React from 'react';
import styles from './Demo.module.scss';

interface Props {
  data: {
    regex: string;
    description: string;
    purpose: string;
    example: string;
  };
}

export default ({ data }: Props) => {
  let regex = new RegExp(`(${data.regex.replace(`\\1`, `\\2`)})`, 'gmi');

  let renderedDescription = `<p>${data.description
    .replace(/\\n/gm, '<br />')
    .replace(/`(.*?)`/g, '<code>$1</code>')}</p>`;

  let renderedPurpose = `<p>${data.purpose}</p>`;

  let renderedExample = `<p>${data.example
    .replace(regex, `<span class=${styles.Highlight}>$1</span>`)
    .replace(/\\n/gm, '<br />')}</p>`;

  return (
    <div className={styles.Demo}>
      <div
        data-title='說明'
        dangerouslySetInnerHTML={{ __html: renderedDescription }}
      />
      <div
        data-title='作用'
        dangerouslySetInnerHTML={{ __html: renderedPurpose }}
      />
      <div
        data-title='例子'
        dangerouslySetInnerHTML={{ __html: renderedExample }}
      />
    </div>
  );
};
