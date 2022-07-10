import React from 'react';
import tagWrapper from '@site/src/utils/tagWrapper';
import styles from './Demo.module.scss';

interface Props {
  data: {
    regex?: string;
    description: string;
    purpose: string;
    example: string;
  };
}

export default ({ data }: Props) => {
  const InnerBlock = ({ title, content }) => <div data-title={title} dangerouslySetInnerHTML={{ __html: content }} />;

  return (
    <div className={styles.Demo}>
      <InnerBlock
        title='說明'
        content={`<p>${data.description.replace(/\\n/gim, '<br/>').replace(/`(.*?)`/g, '<code>$1</code>')}</p>`}
      />
      <InnerBlock title='作用' content={`<p>${data.purpose}</p>`} />
      <InnerBlock
        title='例子'
        content={tagWrapper({
          value: data.example,
          regex: data.regex ? new RegExp(`(${data.regex})`, 'gmi') : null,
          attributes: { className: styles.Highlight },
        }).replace(/\\n/gim, '<br/>')}
      />
    </div>
  );
};
