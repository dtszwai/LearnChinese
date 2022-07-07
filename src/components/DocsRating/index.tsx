import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Fetch from '../Fetch';
import { TextField, Tooltip } from '@mui/material';
import { MdOutlineFeedback } from 'react-icons/md';
import { Useless, No, Yes, Amazing } from './icons';
import styles from './styles.module.scss';

declare global {
  interface Window {
    gtag: any;
  }
}

export default ({ content }) => {
  const { metadata } = content;
  if (!ExecutionEnvironment.canUseDOM || metadata.frontMatter.hide_rating) return null;

  const [value, setValue] = useState(-1);
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isReceived, setIsReceived] = useState<boolean>(null);

  const [formData] = useState(new FormData());
  formData.append('Page', metadata.unversionedId);
  formData.append('User', document.cookie);

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsSent(true);
    formData.set('Event', 'Feedback');
    formData.append('Message', message);
    setIsReceived(await Fetch(formData));
  };

  const Vote = (value: number) => {
    setValue(value);
    formData.append('Event', 'Rating');
    formData.append('Details', String(value));
    Fetch(formData);
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

  const RenderedButton = ({ Icon, value: _value }) => (
    <button
      className={styles.iconButton}
      data-selected={value === _value}
      onClick={() => Vote(_value)}
      disabled={value > -1}
      children={<Icon />}
    />
  );

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <p>本頁對您有幫助嗎？</p>
      <div className={styles.buttonGroup}>
        <RenderedButton value={0} Icon={Useless} />
        <RenderedButton value={1} Icon={No} />
        <RenderedButton value={2} Icon={Yes} />
        <RenderedButton value={3} Icon={Amazing} />
      </div>
      {value > -1 && (
        <div className={styles.reponse}>
          <p>{value > 1 ? '感謝您，讓我們知道做得很好！' : '很抱歉，讓您失望。'}</p>
          {!isSent || isReceived === null ? (
            <div className={styles.message}>
              <TextField
                label='意見回饋'
                sx={{ width: '100%', marginTop: '1rem' }}
                onChange={(e) => setMessage(e.target.value)}
                minRows={4}
                multiline
              />
              <Tooltip title={message.length < 2 ? '請輸入最少兩個字。' : ''}>
                <span>
                  <button
                    type='submit'
                    className={`button button--primary`}
                    children='提交'
                    disabled={message.length < 2 || isSent}
                  />
                </span>
              </Tooltip>
            </div>
          ) : isReceived ? (
            <p>我們已收到您的意見，謝謝！</p>
          ) : (
            <Link
              className={styles.link}
              to={`https://docs.google.com/forms/d/e/1FAIpQLSewteJTEVkqRZux55d_-Z0UI2EncxfGvZtT4I1A5oKObqcy5Q/viewform?usp=pp_url&entry.1511255577=${metadata.unversionedId}`}
            >
              <MdOutlineFeedback size={20} style={{ verticalAlign: 'sub' }} />
              &nbsp;出錯了！但您仍可到這裏提供意見。
            </Link>
          )}
        </div>
      )}
    </form>
  );
};
