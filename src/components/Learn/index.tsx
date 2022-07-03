import React, { useEffect, useState } from 'react';
import LearnFooter from './Footer';
import Step from './Step';
import Progress from './Progress';

const LearnPage = ({ data, lesson }) => {
  const key = `lesson.${lesson.slug}`;
  const record = localStorage.getItem(key);
  const [step, setStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  let learnErrorTimer;

  useEffect(() => {
    const { lastStep = 0, currentStep = lastStep } = !record ? {} : JSON.parse(record);
    setStep(currentStep);
    setLastStep(lastStep);
    setSuccess(currentStep < lastStep);
  }, [key]);

  useEffect(() => {
    const progress = !record ? {} : JSON.parse(record);
    progress.currentStep = step;
    if (step > lastStep) progress.lastStep = step;
    window.localStorage.setItem(key, JSON.stringify(progress));
  }, [step, lastStep, key]);

  const prevStep = () => step > 0 && setStep(step - 1);

  const nextStep = () => {
    if (!success) {
      setError(true);
      clearTimeout(learnErrorTimer);
      learnErrorTimer = setTimeout(() => setError(false), 1000);
      return;
    }
    const nextStep = step + 1;
    if (step < data.length - 1) {
      setError(false);
      setStep(nextStep);
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
  }, [success]);

  return (
    <>
      <Progress total={data.length} current={step + 1} />
      <Step lesson={lesson} data={data[step]} step={step} onChangeSuccess={setSuccess} error={error} />
      <LearnFooter steps={data} step={step} prevStep={prevStep} nextStep={nextStep} success={success} error={error} />
    </>
  );
};

export default LearnPage;
