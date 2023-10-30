import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { AiOutlineSearch as IconDeepDive } from 'react-icons/ai';
import { IoChevronDown } from 'react-icons/io5';

interface ExampleProps {
  children: React.ReactNode;
  title: string;
  excerpt?: string;
  type: 'DeepDive' | 'Dictionary';
}

function ExpandableExample({ children, title, excerpt, type }: ExampleProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isDeepDive = type === 'DeepDive';
  const isDictionary = type === 'Dictionary';

  const containerClassNames = clsx(styles.Container, {
    [styles.DeepDive]: isDeepDive,
    [styles.Dictionary]: isDictionary,
  });

  const headerClassNames = clsx(styles.Header, {
    [styles.DeepDive]: isDeepDive,
  });

  const buttonClassNames = clsx(styles.Button, {
    [styles.DeepDive]: isDeepDive,
    [styles.Dictionary]: isDictionary,
  });

  const DeepDiveHeader = () => <h5 className={headerClassNames}>
    <IconDeepDive className={styles.DeepDiveIcon} />
    深入探討
  </h5>

  const toggleExpanded = () => setIsExpanded((current) => !current);

  return (
    <div className={containerClassNames}>
      <div style={{ padding: '2rem' }}>
        {isDeepDive && <DeepDiveHeader />}
        <div style={{ marginBottom: '1rem' }}>
          <h3 className={styles.Title}>{title}</h3>
          {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} />}
        </div>
        <button className={buttonClassNames} onClick={toggleExpanded}>
          <IoChevronDown
            style={{
              verticalAlign: 'text-bottom',
              marginRight: '0.25rem',
              transform: isExpanded ? 'rotate(180deg)' : 'none',
            }}
          />
          {isExpanded ? '隱藏資訊' : '顯示詳情'}
        </button>
      </div>
      <div className={isExpanded ? styles.Opened : styles.Closed}>
        {children}
      </div>
    </div>
  );
}

export default ExpandableExample;
