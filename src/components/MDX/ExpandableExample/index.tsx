import * as React from 'react';
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
  return (
    <div
      className={clsx(styles.Container, {
        [styles.DeepDive]: isDeepDive,
        [styles.Dictionary]: isDictionary,
      })}
    >
      <div style={{ padding: '2rem' }}>
        <h5
          className={clsx(styles.Header, {
            [styles.DeepDive]: isDeepDive,
          })}
        >
          {isDeepDive && (
            <>
              <IconDeepDive className={styles.DeepDiveIcon} />
              深入探討
            </>
          )}
        </h5>
        <div style={{ marginBottom: '1rem' }}>
          <h3 className={styles.Title} dangerouslySetInnerHTML={{ __html: title }} />
          {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt }} />}
        </div>
        <button
          className={clsx(styles.Button, {
            [styles.DeepDive]: isDeepDive,
            [styles.Dictionary]: isDictionary,
          })}
          onClick={() => setIsExpanded((current) => !current)}
        >
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
      <div
        style={
          !isExpanded
            ? { display: 'none' }
            : {
                padding: '1rem 2rem',
                borderTopWidth: '1px',
                borderTopStyle: 'solid',
              }
        }
        className={styles.Expand}
      >
        {children}
      </div>
    </div>
  );
}

export default ExpandableExample;
