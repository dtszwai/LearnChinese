import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import usePost from '@site/src/utils/postData';
import { useDoc } from '@docusaurus/theme-common/internal';
import { TextField, Tooltip } from '@mui/material';
import { MdOutlineFeedback } from 'react-icons/md';
import Icon from './icons';
import styles from './styles.module.scss';

export default () => {
  const { metadata } = useDoc();
  if (metadata.frontMatter.hide_rating) return null;

  const [data, setData] = useState({ Details: -1 });
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isReceived, setIsReceived] = useState<boolean>(null);

  useEffect(() => {
    (async () => {
      data.Details !== -1 && setIsReceived(await usePost(data));
    })();
  }, [data]);

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsSent(true);
    setData((prev) => ({ ...prev, Event: 'Feedback', Message: message }));
  };

  const FeedbackButton = ({ value, Icon }) => (
    <button
      className={styles.iconButton}
      data-selected={value === data.Details}
      onClick={() => setData((prev) => ({ ...prev, Event: 'Rating', Details: value }))}
      disabled={data.Details > -1}
      children={Icon}
    />
  );

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <p>本頁對您有幫助嗎？</p>
      <div className={styles.buttonGroup}>
        <FeedbackButton value={0} Icon={Icon.Useless} />
        <FeedbackButton value={1} Icon={Icon.No} />
        <FeedbackButton value={2} Icon={Icon.Yes} />
        <FeedbackButton value={3} Icon={Icon.Amazing} />
      </div>
      {data.Details > -1 && (
        <div className={styles.reponse}>
          <p>{data.Details > 1 ? '感謝您，讓我們知道做得很好！' : '很抱歉，讓您失望。'}</p>
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
