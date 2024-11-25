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
import { ResetChangePasswordSchema } from '@/lib/validations';
import { confirmResetPassword } from 'aws-amplify/auth';
import { useToast } from '@/components/ui/use-toast';
import { formatErrorMessage } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useResetPasswordEmail } from '../hooks/useResetPasswordStore';
import { useRouter } from 'next/navigation';

export const ChangePasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const resetPasswordEmail = useResetPasswordEmail();
  const form = useForm<z.infer<typeof ResetChangePasswordSchema>>({
    resolver: zodResolver(ResetChangePasswordSchema),
    defaultValues: {
      code: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof ResetChangePasswordSchema>) {
    try {
      await confirmResetPassword({
        confirmationCode: values.code,
        newPassword: values.newPassword,
        username: resetPasswordEmail,
      });
      router.replace('/sign-in');
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Confirmation Code" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="New Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Confirmation Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
