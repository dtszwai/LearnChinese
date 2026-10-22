import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Link from '@docusaurus/Link';
import InteractiveArea from '../Interactive';
import Activities from '../Activities';
import Report from '../ReportStep';
import tagWrapper from '@site/src/utils/tagWrapper';
import styles from './index.module.scss';
import type { Lesson, LessonData } from '../types';
import type { LessonProgress } from '../lessonProgress';

type Props = {
  lesson: Lesson;
  data: LessonData;
  step: LessonProgress;
  error: boolean;
  onChangeSuccess: (success: boolean) => void;
};

const Step = ({ lesson, data, step, error, onChangeSuccess }: Props) => {
  const [modalIsOpen, setIsOpenModal] = useState(false);

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
        <>
          {data.recommendations && data.recommendations.length > 0 && (
            <section className={styles.Recommendations} aria-labelledby='learn-next-topics'>
              <h3 id='learn-next-topics'>接下來學甚麼？</h3>
              <ul>
                {data.recommendations.map((item) => (
                  <li key={item.href}>
                    <Link className={styles.Recommendation} to={item.href}>
                      <span className={styles.RecommendationText}>
                        <strong>{item.title}</strong>
                        <span>{item.description}</span>
                      </span>
                      <span aria-hidden='true'>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <div>
            <Link className='button button--secondary' to='/learn'>
              返回學習目錄
            </Link>
          </div>
        </>
      )}
      {data.interactive !== false && (
        <>
          {data.interaction ? (
            <Activities
              key={data.id || step.currentStep}
              data={data}
              step={step}
              parentError={error}
              onChangeSuccess={onChangeSuccess}
            />
          ) : (
            <InteractiveArea
              key={data.id || step.currentStep}
              data={data}
              step={step}
              parentError={error}
              onChangeSuccess={onChangeSuccess}
            />
          )}
          <Report
            title={lesson.title}
            step={step}
            onOpenVideo={data.videoURL ? () => setIsOpenModal(true) : undefined}
          />
          {data.videoURL && (
            <Dialog
              open={modalIsOpen}
              onClose={() => setIsOpenModal(false)}
              aria-labelledby='learn-video-title'
              maxWidth={false}
              PaperProps={{ className: styles.VideoDialogPaper }}
            >
              <div className={styles.VideoDialogHeader}>
                <h3 id='learn-video-title'>觀看影片</h3>
                <button
                  type='button'
                  className={styles.VideoDialogClose}
                  aria-label='關閉影片'
                  autoFocus
                  onClick={() => setIsOpenModal(false)}
                >
                  <span aria-hidden='true'>×</span> 關閉
                </button>
              </div>
              <div className={styles.VideoFrame}>
                <iframe
                  title={`${data.title}教學影片`}
                  src={data.videoURL}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            </Dialog>
          )}
        </>
      )}
    </div>
  );
};

export default Step;
