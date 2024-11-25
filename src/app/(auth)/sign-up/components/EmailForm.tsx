'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupEmailSchema } from '@/lib/validations';
import Link from 'next/link';
import {
  useSignupFormCurrentStep,
  useSignupFormStoreActions,
} from '../hooks/useSignupForm';

export const EmailForm = () => {
  const currentStep = useSignupFormCurrentStep();
  const { updateFormState, updateCurrentStep } = useSignupFormStoreActions();
  const form = useForm<z.infer<typeof SignupEmailSchema>>({
    resolver: zodResolver(SignupEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof SignupEmailSchema>) {
    updateFormState(values);
    updateCurrentStep(currentStep + 1);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 mt-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-center text-sm text-gray-400 [&>a]:text-blue-500">
          Registrandoti confermi di aver letto e accettato i{' '}
          <Link href="#">termini di servizio</Link> e la{' '}
          <Link href="#">politica sulla privacy</Link>
        </p>

        <Button
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="Next"
          data-amplify-analytics-attrs="signup_step:1,step_name:Email form"
          className="w-full"
          type="submit"
        >
          Next
        </Button>
      </form>
    </Form>
  );
};
