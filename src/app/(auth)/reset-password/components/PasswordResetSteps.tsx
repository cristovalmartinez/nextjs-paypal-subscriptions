'use client';

import React from 'react';
import { useResetPasswordCurrentStep } from '../hooks/useResetPasswordStore';
import { EmailPasswordResetForm } from './EmailPasswordResetForm';
import { ResetPasswordSteps } from '@/lib/enums';
import { ChangePasswordForm } from './ChangePasswordForm';

export const PasswordResetSteps = () => {
  const currentStep = useResetPasswordCurrentStep();

  let body = <EmailPasswordResetForm />;

  if (currentStep === ResetPasswordSteps.CONFIRM_RESET_PASSWORD_WITH_CODE) {
    body = <ChangePasswordForm />;
  }
  return <>{body}</>;
};
