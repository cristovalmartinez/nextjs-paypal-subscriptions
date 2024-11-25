'use client';

import React from 'react';
import { useSignupFormCurrentStep } from '../hooks/useSignupForm';
import { SignupSteps } from '@/lib/enums';
import { EmailForm } from './EmailForm';
import { UserInfoForm } from './UserInfoForm';
import { QuestionsForm } from './QuestionsForm';
import { ConfirmEmailForm } from './ConfirmEmailForm';

export const SignupFormSteps = () => {
  const currentStep = useSignupFormCurrentStep();

  let formElement = <EmailForm />;

  if (currentStep === SignupSteps.USER_INFO_FORM) {
    formElement = <UserInfoForm />;
  }
  if (currentStep === SignupSteps.QUESTIONS_FORM) {
    formElement = <QuestionsForm />;
  }

  if (currentStep === SignupSteps.CONFIRM_SIGN_UP) {
    formElement = <ConfirmEmailForm />;
  }

  return <>{formElement}</>;
};
