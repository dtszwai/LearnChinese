import React, { useCallback, useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Outline from './Outline';
import LearnFooter from './Footer';
import Step from './Step';
import Progress from './Progress';
import styles from './index.module.scss';
import { Lesson, LessonData } from './types';
import useLocalStorage from './useLocalStorage';
import { readLessonProgress, LessonProgress } from './lessonProgress';

export default function LearnPage({ lesson, data }: { lesson: Lesson; data: LessonData[] }) {
  return (
    <Layout title={lesson.title}>
      <Learn key={lesson.slug} lesson={lesson} data={data} />
    </Layout>
  );
}

function Learn({ lesson, data }: { lesson: Lesson; data: LessonData[] }) {
  const [record, setRecord, loaded] = useLocalStorage<LessonProgress | undefined>(lesson.key, undefined, (value) =>
    readLessonProgress(value, data.length),
  );
  if (!loaded) return <p role='status'>正在載入課程……</p>;
  return (
    <LearningSession
      lesson={lesson}
      data={data}
      initialProgress={record ?? { currentStep: 0, lastStep: 0 }}
      onSave={setRecord}
    />
  );
}

function LearningSession({
  lesson,
  data,
  initialProgress,
  onSave,
}: {
  lesson: Lesson;
  data: LessonData[];
  initialProgress: LessonProgress;
  onSave: (progress: LessonProgress) => void;
}) {
  const [step, setStep] = useState(initialProgress);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    data[step.currentStep].interactive === false && setSuccess(true);
  }, [step, data]);
  useEffect(() => () => clearTimeout(errorTimer.current), []);

  const navigate = useCallback(
    (index: number) => {
      if (index === step.currentStep || index < 0 || index >= data.length) return;
      if (index > step.lastStep && !(success && index === step.currentStep + 1)) return;
      setError(false);
      setSuccess(false);
      const next = { currentStep: index, lastStep: Math.max(step.lastStep, index) };
      setStep(next);
      onSave(next);
    },
    [step, data.length, success, onSave],
  );

  const prevStep = useCallback(() => {
    if (step.currentStep > 0) {
      navigate(step.currentStep - 1);
    }
  }, [step.currentStep, navigate]);

  const nextStep = useCallback(() => {
    if (!success) {
      setError(true);
      clearTimeout(errorTimer.current);
      errorTimer.current = setTimeout(() => setError(false), 1000);
      return;
    }
    if (step.currentStep < data.length - 1) {
      navigate(step.currentStep + 1);
    }
  }, [success, step.currentStep, data.length, navigate]);

  useEffect(() => {
    const handleChangeStep = (e: KeyboardEvent) => {
      // Let focused activity buttons handle Enter, and let IMEs commit Chinese text.
      if (e.isComposing || (e.target instanceof Element && e.target.closest('button'))) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        e.shiftKey ? prevStep() : nextStep();
      }
    };

    addEventListener('keypress', handleChangeStep);
    return () => removeEventListener('keypress', handleChangeStep);
  }, [prevStep, nextStep]);

  return (
    <main className={styles.container}>
      <Progress total={data.length} current={step.currentStep + 1} />
      <Outline data={data} step={step} success={success} onNavigate={navigate} />
      <Step
        key={step.currentStep}
        lesson={lesson}
        data={data[step.currentStep]}
        step={step}
        onChangeSuccess={setSuccess}
        error={error}
        onRestart={() => {
          setError(false);
          setSuccess(false);
          setStep({ currentStep: 0, lastStep: 0 });
          onSave({ currentStep: 0, lastStep: 0 });
        }}
      />
      <LearnFooter
        totalSteps={data.length - 1}
        currentStep={step.currentStep}
        prevStep={prevStep}
        nextStep={nextStep}
        success={success}
        error={error}
      />
    </main>
  );
}
