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
import { SignupConfirmEmailSchema } from '@/lib/validations';
import {
  autoSignIn,
  confirmSignUp,
  getCurrentUser,
  resendSignUpCode,
} from 'aws-amplify/auth';
import { useToast } from '@/components/ui/use-toast';
import { useSignupFormState } from '../hooks/useSignupForm';
import { useRouter } from 'next/navigation';
import { formatErrorMessage } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { identifyUser } from 'aws-amplify/analytics';

export const ConfirmEmailForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const signupFormState = useSignupFormState();
  const form = useForm<z.infer<typeof SignupConfirmEmailSchema>>({
    resolver: zodResolver(SignupConfirmEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignupConfirmEmailSchema>) {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        confirmationCode: values.code,
        username: signupFormState.email!,
      });
      if (isSignUpComplete) {
        await autoSignIn();
        const user = await getCurrentUser();
        await identifyUser({
          userId: user.userId,
          userProfile: {
            email: signupFormState.email!,
          },
        });
        router.replace('/');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: formatErrorMessage(error),
      });
    }
  }

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({
        username: signupFormState.email!,
      });
      toast({
        title: 'The verfication code sent successfully',
        description: 'Please check your email.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Validation Failed',
        description: formatErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-5 mt-10"
      >
        <div>
          <h2 className="text-base font-semibold text-left">We Emailed You</h2>
          <p className="text-sm">
            Your code is on the way. To log in, enter the code we sent you. It
            may take a minute to arrive.
          </p>
        </div>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Code" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-4">
          <Button
            onClick={handleResendCode}
            variant="outline"
            className="w-full"
            type="button"
          >
            Resend Code
          </Button>
          <Button
            data-amplify-analytics-on="click"
            data-amplify-analytics-name="Next"
            data-amplify-analytics-attrs="signup_step:4,step_name:Confirm Email"
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm
          </Button>
        </div>
        <p>Be sure to check your spam or junk folder.</p>
      </form>
    </Form>
  );
};
