import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import postData from '@site/src/utils/postData';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { TextField, Tooltip } from '@mui/material';
import { MdOutlineFeedback } from 'react-icons/md';
import Icon from './icons';
import styles from './styles.module.scss';

export default function DocsRating() {
  const { metadata } = useDoc();
  if (metadata.frontMatter.hide_rating) return null;
  return <RatingForm key={metadata.id} docId={metadata.id} />;
}

type Props = { docId: string };
const RatingForm = ({ docId }: Props) => {
  const [rating, setRating] = useState(-1);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (request.current || status === 'success' || message.trim().length < 2) return;
    const controller = new AbortController();
    request.current = controller;
    setStatus('sending');
    const received = await postData({ Event: 'Feedback', Details: rating, Message: message }, undefined, {
      signal: controller.signal,
    });
    if (controller.signal.aborted) return;
    request.current = null;
    setStatus(received ? 'success' : 'error');
  };

  const feedbackButton = (value: number, icon: React.ReactNode) => (
    <button
      type='button'
      aria-label={['沒有幫助', '幫助不大', '有幫助', '非常有幫助'][value]}
      className={styles.iconButton}
      data-selected={value === rating}
      onClick={() => {
        setRating(value);
        void postData({ Event: 'Rating', Details: value });
      }}
      disabled={rating > -1}
      children={icon}
    />
  );

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <p>本頁對您有幫助嗎？</p>
      <div className={styles.buttonGroup}>
        {feedbackButton(0, Icon.Useless)}
        {feedbackButton(1, Icon.No)}
        {feedbackButton(2, Icon.Yes)}
        {feedbackButton(3, Icon.Amazing)}
      </div>
      {rating > -1 && (
        <div className={styles.reponse}>
          <p>{rating > 1 ? '感謝您，讓我們知道做得很好！' : '很抱歉，讓您失望。'}</p>
          {status !== 'success' ? (
            <div className={styles.message}>
              <TextField
                label='意見回饋'
                sx={{ width: '100%', marginTop: '1rem' }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                disabled={status === 'sending'}
                minRows={4}
                multiline
              />
              <Tooltip title={message.trim().length < 2 ? '請輸入最少兩個字。' : ''}>
                <span>
                  <button
                    type='submit'
                    className={`button button--primary`}
                    children={status === 'sending' ? '傳送中…' : status === 'error' ? '重試' : '提交'}
                    disabled={message.trim().length < 2 || status === 'sending'}
                  />
                </span>
              </Tooltip>
            </div>
          ) : (
            <p role='status'>我們已收到您的意見，謝謝！</p>
          )}
          {status === 'error' && <p role='alert'>未能確認提交成功，已保留您的意見。您可以重試，或使用下方連結。</p>}
          {status === 'error' && (
            <Link
              className={styles.link}
              to={`https://docs.google.com/forms/d/e/1FAIpQLSewteJTEVkqRZux55d_-Z0UI2EncxfGvZtT4I1A5oKObqcy5Q/viewform?usp=pp_url&entry.1511255577=${encodeURIComponent(docId)}`}
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
