import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import LearnFooter from './Footer';
import Step from './Step';
import Progress from './Progress';
import styles from './index.module.scss';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { Lesson, LessonData } from './types';

export default () => {
  if (!ExecutionEnvironment.canUseDOM) return null;
  const slug = useLocation().pathname.split('/').at(-1);
  const lesson: Lesson = require('@site/src/data/Learn/index.json')[slug];
  const data: LessonData[] = require(`@site/src/data/Learn/${slug}.json`);

  const [step, setStep] = useState({ currentStep: 0, lastStep: 0 });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const record = localStorage.getItem(lesson.key);

  useEffect(() => {
    const { lastStep = 0, currentStep = lastStep } = record ? JSON.parse(record) : {};
    setStep({ currentStep: currentStep, lastStep: lastStep });
  }, []);

  useEffect(() => {
    data[step.currentStep].interactive === false && setSuccess(true);
    const progress = step;
    if (step.currentStep > step.lastStep) progress.lastStep = step.currentStep;
    window.localStorage.setItem(lesson.key, JSON.stringify(progress));
  }, [step]);

  const prevStep = () => {
    if (step.currentStep > 0) {
      setStep((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const nextStep = () => {
    let learnErrorTimer;
    if (!success && data[step.currentStep].interactive !== false) {
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
          steps={data}
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
