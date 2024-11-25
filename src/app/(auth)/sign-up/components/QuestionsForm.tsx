'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { autoSignIn, signUp } from 'aws-amplify/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupQuestionsSchema } from '@/lib/validations';
import {
  useSignupFormCurrentStep,
  useSignupFormState,
  useSignupFormStoreActions,
} from '../hooks/useSignupForm';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { formatErrorMessage } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const QuestionsForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const signupFormState = useSignupFormState();
  const currentStep = useSignupFormCurrentStep();
  const { updateCurrentStep } = useSignupFormStoreActions();
  const form = useForm<z.infer<typeof SignupQuestionsSchema>>({
    resolver: zodResolver(SignupQuestionsSchema),
    defaultValues: {
      'custom:tradingexplive': '',
      'custom:tradingexptype': '',
      'custom:tradingexpyear': '',
      accepted: false,
    },
  });

  async function onSubmit(values: z.infer<typeof SignupQuestionsSchema>) {
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        password: signupFormState.password!,
        username: signupFormState.email!,
        options: {
          userAttributes: {
            birthdate: format(signupFormState.dob!, 'yyyy-MM-dd'),
            email: signupFormState.email,
            given_name: signupFormState.name,
            family_name: signupFormState.surname,
            'custom:tradingexplive': values['custom:tradingexplive'],
            'custom:tradingexptype': values['custom:tradingexptype'],
            'custom:tradingexpyear': values['custom:tradingexpyear'],
            'custom:subscription-tier': '0',
            'custom:acknowledgement': values.accepted.toString(),
          },
          autoSignIn: {
            authFlowType: 'USER_SRP_AUTH',
          },
        },
      });
      if (!isSignUpComplete && nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        updateCurrentStep(currentStep + 1);
      }

      if (isSignUpComplete) {
        await autoSignIn();
        router.replace('/');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Registration Error',
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
          name="custom:tradingexptype"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Qual è la tua esperienza nel mondo del trading?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0-1">Meno di 1 anno</SelectItem>
                  <SelectItem value="1-3">Da 1 a 3 anni</SelectItem>
                  <SelectItem value="5-99">Più di 5 anni</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="custom:tradingexplive"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Fai trading con un conto reale?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="real">
                    Si, utilizzo un conto reale
                  </SelectItem>
                  <SelectItem value="demo">No, ho un conto demo</SelectItem>
                  <SelectItem value="no">
                    No, sto studiando non ho ancora aperto un conto
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="custom:tradingexpyear"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Quanto dura in media un tuo trade?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daytrader">Al massimo 1 giorno</SelectItem>
                  <SelectItem value="swingtrader">Circa 1 settimana</SelectItem>
                  <SelectItem value="mediumterm">Almeno 1 mese</SelectItem>
                  <SelectItem value="longterm">
                    Lungo termine (1 anno o più)
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accetto i Termini e condizioni</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="Next"
          data-amplify-analytics-attrs="signup_step:3,step_name:Question form"
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};
