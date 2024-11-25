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
import { ResetPasswordEmailSchema } from '@/lib/validations';
import { resetPassword } from 'aws-amplify/auth';
import { useToast } from '@/components/ui/use-toast';
import { formatErrorMessage } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import {
  useResetPasswordCurrentStep,
  useResetPasswordStoreActions,
} from '../hooks/useResetPasswordStore';

export const EmailPasswordResetForm = () => {
  const currentStep = useResetPasswordCurrentStep();
  const { setEmail, updateCurrentStep } = useResetPasswordStoreActions();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ResetPasswordEmailSchema>>({
    resolver: zodResolver(ResetPasswordEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordEmailSchema>) {
    try {
      const { isPasswordReset, nextStep } = await resetPassword({
        username: values.email,
      });
      if (
        !isPasswordReset &&
        nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE'
      ) {
        setEmail(values.email);
        updateCurrentStep(currentStep + 1);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Password Reset Error',
        description: formatErrorMessage(error),
      });
    }
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

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Send Code
        </Button>
      </form>
    </Form>
  );
};
