import React, { useState, useEffect } from 'react';
import InteractiveArea from '../Interactive';
import Activities from '../Activities';
import Report from '../ReportStep';
import tagWrapper from '@site/src/utils/tagWrapper';
import styles from './index.module.scss';

export default ({ lesson, data, step, error, onChangeSuccess, onRestart }) => {
  const [modalIsOpen, setIsOpenModal] = useState(false);
  const handleCloseModal = (e) => e.key === 'Escape' && setIsOpenModal(false);
  useEffect(() => {
    addEventListener('keyup', handleCloseModal);
    return () => removeEventListener('keyup', handleCloseModal);
  }, []);

  return (
    <div className={styles.Step}>
      {data.image && <img className={styles.StepImage} src={data.image} width={100} />}
      {data.topic && <h4 className={styles.StepTitleOriginal}>{data.topic}</h4>}
      <h2
        className={styles.StepTitle}
        dangerouslySetInnerHTML={{
          __html: tagWrapper({
            value: data.title,
            regex: /`(\S*?[^`]*)`/gim,
            attributes: { className: styles.StepTitleWord },
          }).replace(/\\n/gim, '<br/>'),
        }}
      />
      {data.description && (
        <p
          className={styles.StepDescription}
          dangerouslySetInnerHTML={{
            __html: tagWrapper({
              value: data.description,
              regex: /`(\S*?[^`]*)`/gim,
              attributes: { className: styles.StepDescriptionWord },
            }).replace(/\\n/gim, '<br/>'),
          }}
        />
      )}
      {data.id?.endsWith('-complete') && (
        <div>
          <button type='button' className='button button--secondary' onClick={onRestart}>重新學習</button>
        </div>
      )}
      {data.interactive !== false && (
        <>
          {data.interaction ? <Activities
            key={data.id || step.currentStep}
            data={data}
            step={step}
            parentError={error}
            onChangeSuccess={onChangeSuccess}
          /> : <InteractiveArea
            key={data.id || step.currentStep}
            data={data}
            step={step}
            parentError={error}
            onChangeSuccess={onChangeSuccess}
            setIsOpenModal={setIsOpenModal}
          />}
          <Report title={lesson.title} step={step} />
          {data.videoURL && modalIsOpen && (
            <div className={styles.StepVideoModal}>
              <iframe
                width='80%'
                height='80%'
                src={data.videoURL}
                frameBorder={0}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
              <button className='button button--secondary' onClick={() => setIsOpenModal(false)}>
                關閉
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
