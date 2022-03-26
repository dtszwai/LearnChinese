import React, { useState } from 'react';
import FormData from 'form-data';
import IconButton from '@mui/material/IconButton';
import { MdClose, MdOutlineFeedback } from 'react-icons/md';
import Useless from '@site/static/img/emoji/useless.svg';
import No from '@site/static/img/emoji/no.svg';
import Yes from '@site/static/img/emoji/yes.svg';
import Amazing from '@site/static/img/emoji/amazing.svg';
import Snackbar from '@mui/material/Snackbar';
import styles from './styles.module.scss';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import Link from '@docusaurus/Link';
import Tooltip from '@mui/material/Tooltip';
import BrowserOnly from '@docusaurus/BrowserOnly';

declare global {
  interface Window {
    gtag: any;
  }
}

const RenderedSnackbar = ({ snackbarOpen, setSnackbarOpen }) => (
  <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={() => setSnackbarOpen(false)}
    message={`您已評價了本頁。`}
    action={
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={() => setSnackbarOpen(false)}
        children={<MdClose size={24} />}
      />
    }
  />
);

function Feedback(metadata) {
  const [rating, setRating] = useState('');
  const [isRating, setIsRating] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(null);

  const formData = new FormData() as any;
  formData.append('Page', metadata.unversionedId);
  formData.append('User', document.cookie);

  const fetchURL =
    'https://script.google.com/macros/s/AKfycbw-hLu-3lgOLKAcSm44vW027eHjUSN_kM6u8kRot0H_BSlIlPgp4Mu_zPPk0FS5uYaB/exec';

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append('Rating', rating);
    formData.append('Message_Rating', 'Given');
    formData.append('Message', message);
    fetch(fetchURL, { method: 'POST', body: formData }).then((res) =>
      setIsSubmitted(res.ok),
    );
  };

  const submitValidate = () => {
    if (message.length < 2) {
      return (
        <Tooltip title='請輸入最少兩個字。'>
          <span>
            <button
              type='submit'
              className={`button button--primary`}
              children='提交'
              disabled
            />
          </span>
        </Tooltip>
      );
    } else {
      return (
        <button
          type='submit'
          className={`button button--primary`}
          children='提交'
        />
      );
    }
  };

  const messageWrapper = () => {
    if (isSubmitted === null) {
      return (
        <div className={styles.message}>
          <TextField
            label='意見回饋'
            sx={{ width: '100%', marginTop: '1rem' }}
            minRows={4}
            multiline
            onChange={(e) => setMessage(e.target.value)}
          />
          {submitValidate()}
        </div>
      );
    } else if (isSubmitted) {
      return <p>我們已收到您的意見，謝謝！</p>;
    } else {
      return (
        <Link
          className={styles.link}
          to={`https://docs.google.com/forms/d/e/1FAIpQLSewteJTEVkqRZux55d_-Z0UI2EncxfGvZtT4I1A5oKObqcy5Q/viewform?usp=pp_url&entry.1511255577=${metadata.unversionedId}`}
        >
          <MdOutlineFeedback size={20} style={{ verticalAlign: 'sub' }} />
          &nbsp;出錯了！但您仍可到這裏提供意見回饋。
        </Link>
      );
    }
  };

  const Response = () => (
    <div className={styles.reponse}>
      <p>
        {rating === 'Yes' || rating === 'Amazing'
          ? '感謝您，讓我們知道做得很好！'
          : '很抱歉，讓您失望。'}
      </p>
      {messageWrapper()}
    </div>
  );

  const Rating = (rating: string, value: number) => {
    setRating(rating);
    setIsRating(true);
    if (window.gtag) {
      window.gtag('send', {
        hitType: 'event',
        eventCategory: 'button',
        eventAction: 'feedback',
        eventLabel: metadata.unversionedId,
        eventValue: value,
      });
    }
  };

  useEffect(() => {
    if (isRating) {
      setSnackbarOpen(true);
      formData.append('Rating', rating);
      fetch(fetchURL, { method: 'POST', body: formData });
    }
  }, [isRating]);

  const RenderedButton = ({ rating: rate, Icon, value }) => (
    <button
      className={styles.iconButton}
      data-selected={rating === rate}
      onClick={() => Rating(rate, value)}
      disabled={isRating}
      children={<Icon />}
    />
  );

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p>本頁對您有幫助嗎？</p>
        <div className={styles.buttonGroup}>
          <RenderedButton value={0} rating='Useless' Icon={Useless} />
          <RenderedButton value={1} rating='No' Icon={No} />
          <RenderedButton value={2} rating='Yes' Icon={Yes} />
          <RenderedButton value={3} rating='Amazing' Icon={Amazing} />
        </div>
        {isRating && Response()}
      </form>
      <RenderedSnackbar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
}

export default function ({ metadata }) {
  return <BrowserOnly>{() => Feedback(metadata)}</BrowserOnly>;
}
