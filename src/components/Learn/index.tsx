import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import LearnFooter from './Footer';
import Step from './Step';
import Progress from './Progress';
import styles from './index.module.scss';
import { useLocation } from '@docusaurus/router';
import { Lesson, LessonData } from './types';
import useLocalStorage from '@site/src/utils/useLocalStorage';

export default () => {
  const slug = useLocation().pathname.split('/').at(-1);
  const lesson: Lesson = require('@site/src/data/Learn/index.json')[slug];
  const data: LessonData[] = require(`@site/src/data/Learn/${slug}.json`);
  const [record, setRecord] = useLocalStorage(lesson.key, { currentStep: 0, lastStep: 0 });
  const [step, setStep] = useState(record);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    data[step.currentStep].interactive === false && setSuccess(true);
    const progress = step;
    if (step.currentStep > step.lastStep) progress.lastStep = step.currentStep;
    setRecord(progress);
  }, [step]);

  const prevStep = () => {
    if (step.currentStep > 0) {
      setStep((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const nextStep = () => {
    let learnErrorTimer;
    if (!success) {
      setError(true);
      clearTimeout(learnErrorTimer);
      learnErrorTimer = setTimeout(() => setError(false), 1000);
      return;
    }
    if (step.currentStep < data.length - 1) {
      setError(false);
      setStep((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const handleChangeStep = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.shiftKey ? prevStep() : nextStep();
    }
  };

  useEffect(() => {
    addEventListener('keypress', handleChangeStep);
    return () => removeEventListener('keypress', handleChangeStep);
  }, [step, success]);

  return (
    <Layout title={lesson.title}>
      <main className={styles.container}>
        <Progress total={data.length} current={step.currentStep + 1} />
        <Step lesson={lesson} data={data[step.currentStep]} step={step} onChangeSuccess={setSuccess} error={error} />
        <LearnFooter
          totalSteps={data.length - 1}
          currentStep={step.currentStep}
          prevStep={prevStep}
          nextStep={nextStep}
          success={success}
          error={error}
        />
      </main>
    </Layout>
  );
};
