import * as React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { AiOutlineSearch as IconDeepDive } from 'react-icons/ai';
import { IoChevronDown } from 'react-icons/io5';

interface ExpandableExampleProps {
  children: React.ReactNode;
  title: string;
  excerpt?: string;
  type: 'DeepDive';
}

function ExpandableExample({
  children,
  title,
  excerpt,
  type,
}: ExpandableExampleProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isDeepDive = type === 'DeepDive';

  return (
    <div
      className={clsx(styles.Container, {
        [styles.DeepDive]: isDeepDive,
        // 'dark:bg-opacity-20 dark:bg-yellow-60 bg-yellow-5': isExample,
      })}
    >
      <div style={{ padding: '2rem' }}>
        <h5
          className={clsx(styles.Header, {
            [styles.DeepDiveHeader]: isDeepDive,
            // 'dark:text-yellow-30 text-yellow-60': isExample,
          })}
        >
          {isDeepDive && (
            <>
              <IconDeepDive className={styles.DeepDiveIcon} />
              深入探討
            </>
          )}
          {/* {isExample && (
            <>
              <IconCodeBlock className='inline mr-2 dark:text-yellow-30 text-yellow-50' />
              Example
            </>
          )} */}
        </h5>
        <div style={{ marginBottom: '1rem' }}>
          <h3 className={styles.Title}>{title}</h3>
          {excerpt && <div>{excerpt}</div>}
        </div>
        <button
          className={clsx(styles.Button, {
            [styles.DeepDiveButton]: isDeepDive,
            // 'bg-yellow-50 border-yellow-50 hover:bg-yellow-40 focus:bg-yellow-50 active:bg-yellow-50':
            //   isExample,
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
                padding: '2rem',
                borderTopWidth: '1px',
                borderTopStyle: 'solid',
              }
        }
        className={clsx({
          [styles.DeepDiveExpand]: isDeepDive,
          // 'dark:border-yellow-60 border-yellow-50': isExample,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default ExpandableExample;
