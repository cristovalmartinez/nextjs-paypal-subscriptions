'use client';

import { SignupSteps } from '@/lib/enums';
import {
  SignupEmailSchema,
  SignupUserInfoSchema,
  SignupQuestionsSchema,
} from '@/lib/validations';
import { z } from 'zod';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _pick from 'lodash/pick';

type SignupFormValues = Partial<
  z.infer<typeof SignupEmailSchema> &
    z.infer<typeof SignupUserInfoSchema> &
    z.infer<typeof SignupQuestionsSchema>
>;

type SignupFormStore = {
  currentStep: SignupSteps;
  formState: SignupFormValues;
  updateFormState: (formState: SignupFormValues) => void;
  updateCurrentStep: (currentStep: number) => void;
};

export const useSignupFormStore = create<SignupFormStore>()(
  devtools((set, get) => ({
    currentStep: SignupSteps.EMAIL_FORM,
    formState: {},
    updateCurrentStep: (currentStep) => {
      set({
        currentStep,
      });
    },
    updateFormState: (formState: SignupFormValues) => {
      set({
        formState: {
          ...(get().formState ? get().formState : {}),
          ...formState,
        },
      });
    },
  }))
);

const signupCurrentStepSelector = (state: SignupFormStore) => state.currentStep;
const signupFormStateSelector = (state: SignupFormStore) => state.formState;
const signupFormStoreActionsSelector = (state: SignupFormStore) =>
  _pick(state, ['updateFormState', 'updateCurrentStep']);

export const useSignupFormCurrentStep = () =>
  useSignupFormStore(signupCurrentStepSelector);
export const useSignupFormState = () =>
  useSignupFormStore(signupFormStateSelector);
export const useSignupFormStoreActions = () =>
  useSignupFormStore(signupFormStoreActionsSelector);
