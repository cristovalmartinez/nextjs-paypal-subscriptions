'use client';

import { ResetPasswordSteps } from '@/lib/enums';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _pick from 'lodash/pick';

type PasswordResetFormStore = {
  currentStep: ResetPasswordSteps;
  email: string;
  setEmail: (email: string) => void;
  updateCurrentStep: (current: number) => void;
};

export const useResetPasswordStore = create<PasswordResetFormStore>()(
  devtools((set) => ({
    currentStep: ResetPasswordSteps.CHANE_PASSWORD_WITH_EMAIL,
    email: '',
    setEmail: (email: string) => {
      set({
        email,
      });
    },
    updateCurrentStep: (currentStep) => {
      set({
        currentStep,
      });
    },
  }))
);

const resetPasswordCurrentStepSelector = (state: PasswordResetFormStore) =>
  state.currentStep;
const resetPasswordEmailSelector = (state: PasswordResetFormStore) =>
  state.email;
const resetPasswordStoreActionsSelector = (state: PasswordResetFormStore) =>
  _pick(state, ['setEmail', 'updateCurrentStep']);

export const useResetPasswordEmail = () =>
  useResetPasswordStore(resetPasswordEmailSelector);
export const useResetPasswordCurrentStep = () =>
  useResetPasswordStore(resetPasswordCurrentStepSelector);

export const useResetPasswordStoreActions = () =>
  useResetPasswordStore(resetPasswordStoreActionsSelector);
