import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import clsx from 'clsx';
import IcoMoon from 'react-icomoon';
const iconSet = require('./selection.json');

import styles from './Collapse.module.css';

const Icon = ({ ...props }) => <IcoMoon iconSet={iconSet} {...props} />;

function Collapse({ title, description, children, titleClassName, contentClassName, ...props}) {
  const [show, setShow] = useState(false);

  return (
    <Collapsible
      transitionTime={300}
      onOpening={() => setShow(true)}
      onClosing={() => setShow(false)}
      {...props}
      trigger={
        <div className={clsx(styles.CollapseTitle, titleClassName)}>
          {title}
          <Icon
            className={clsx(
              show ? styles.CollapseTitleIconActive : styles.CollapseTitleIcon,
            )}
            icon='caret-down'
            size={12}
          />
        </div>
      }
    >
      <div className={clsx(styles.CollapseContent, contentClassName)}>
        {children}
      </div>
    </Collapsible>
  );
}

export default Collapse;
