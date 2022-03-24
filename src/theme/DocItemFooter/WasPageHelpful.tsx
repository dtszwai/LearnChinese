import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
  MdThumbUpOffAlt,
  MdThumbDownOffAlt,
  MdThumbUp,
  MdThumbDown,
  MdClose,
  MdOutlineFeedback,
} from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import styles from './styles.module.scss';

declare global {
  interface Window {
    gtag: any;
  }
}

export default function ({ metadata }) {
  const [feedback, setFeedback] = useState('');
  const [hasProvidedFeedback, setHasProvidedFeedback] = useState(false);
  const [open, setOpen] = useState(false);

  const provideFeedback = (value: string) => {
    setHasProvidedFeedback(true);
    setOpen(true);
    setFeedback(value);
    if (window.gtag) {
      window.gtag('event', 'rating_click', {
        page_title: metadata.unversionedId,
        time: new Date(),
        eventAction: 'feedback',
        eventValue: value,
      });
    }
  };

  const action = (
    <IconButton
      size='small'
      aria-label='close'
      color='inherit'
      onClick={() => setOpen(false)}
    >
      <MdClose size={24} />
    </IconButton>
  );

  return (
    <>
      <hr />
      <div className={styles.feedback}>
        本頁對您有幫助嗎？
        <ButtonGroup className={styles.button}>
          <Tooltip title='有幫助' placement='top'>
            <IconButton
              sx={{ color: 'inherit' }}
              onClick={() => provideFeedback('up')}
              disabled={hasProvidedFeedback ? true : false}
              children={
                feedback === 'up' ? (
                  <MdThumbUp size={24} color='#1a73e8' />
                ) : (
                  <MdThumbUpOffAlt size={24} />
                )
              }
            />
          </Tooltip>
          <Tooltip title='沒有幫助' placement='top'>
            <IconButton
              sx={{ color: 'inherit' }}
              onClick={() => provideFeedback('down')}
              disabled={hasProvidedFeedback ? true : false}
              children={
                feedback === 'down' ? (
                  <MdThumbDown size={24} color='#1a73e8' />
                ) : (
                  <MdThumbDownOffAlt size={24} />
                )
              }
            />
          </Tooltip>
        </ButtonGroup>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={`已將頁面評價為${feedback === 'down' ? '沒' : ''}有幫助。`}
          action={action}
        />
      </div>
      {hasProvidedFeedback && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {feedback === 'up'
            ? '感謝您，讓我們知道做得很好！'
            : '很抱歉，讓您失望。'}
          <Link
            className={styles.link}
            to={`https://docs.google.com/forms/d/e/1FAIpQLSewteJTEVkqRZux55d_-Z0UI2EncxfGvZtT4I1A5oKObqcy5Q/viewform?usp=pp_url&entry.1511255577=${metadata.unversionedId}`}
          >
            <MdOutlineFeedback size={20} style={{ verticalAlign: 'sub' }} />
            若您有空，歡迎您提供意見回饋。
          </Link>
        </div>
      )}
    </>
  );
}
