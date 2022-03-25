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
  const [feedback, setFeedback] = useState<string>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchURL =
    'https://script.google.com/macros/s/AKfycbw-hLu-3lgOLKAcSm44vW027eHjUSN_kM6u8kRot0H_BSlIlPgp4Mu_zPPk0FS5uYaB/exec';

  const fetchPost = (rating: string) => {
    let formData = new FormData();
    formData.append('Page', metadata.unversionedId);
    formData.append('Rating', rating);
    formData.append('User', document.cookie);
    fetch(fetchURL, { method: 'POST', body: formData });
  };

  const action = (
    <IconButton
      size='small'
      aria-label='close'
      color='inherit'
      onClick={() => setSnackbarOpen(false)}
      children={<MdClose size={24} />}
    />
  );

  const renderedSnackbar = () => (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={() => setSnackbarOpen(false)}
      message={`已將頁面評價為${feedback === 'down' ? '沒' : ''}有幫助。`}
      action={action}
    />
  );

  const feedbackMessage = () => (
    <div className={styles.feedbackMessage}>
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
  );

  const provideFeedback = (rating: string) => {
    setFeedback(rating);
    setSnackbarOpen(true);
    fetchPost(rating);
    if (window.gtag) {
      window.gtag('send', {
        hitType: 'event',
        eventCategory: 'button',
        eventAction: 'feedback',
        eventLabel: metadata.unversionedId,
        eventValue: rating === 'up' ? 1 : 0,
      });
    }
  };

  const RenderedButton = ({ title, rating, Icon, IconAlt }) => (
    <Tooltip title={title} placement='top'>
      <>
        <IconButton
          sx={{ color: 'inherit' }}
          onClick={() => provideFeedback(rating)}
          disabled={!!feedback}
          children={
            feedback === rating ? (
              <Icon size={24} color='#1a73e8' />
            ) : (
              <IconAlt size={24} />
            )
          }
        />
      </>
    </Tooltip>
  );

  return (
    <>
      <hr />
      <div className={styles.feedback}>
        <span>本頁對您有幫助嗎？</span>
        <ButtonGroup className={styles.button}>
          <RenderedButton
            title='有幫助'
            rating='up'
            Icon={MdThumbUp}
            IconAlt={MdThumbUpOffAlt}
          />
          <RenderedButton
            title='沒有幫助'
            rating='down'
            Icon={MdThumbDown}
            IconAlt={MdThumbDownOffAlt}
          />
        </ButtonGroup>
      </div>
      {!!feedback && feedbackMessage()}
      {renderedSnackbar()}
    </>
  );
}
