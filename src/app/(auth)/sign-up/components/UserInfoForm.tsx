'use client';
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupUserInfoSchema } from '@/lib/validations';
import Link from 'next/link';
import {
  useSignupFormCurrentStep,
  useSignupFormStoreActions,
} from '../hooks/useSignupForm';

export const UserInfoForm = () => {
  const currentStep = useSignupFormCurrentStep();
  const { updateFormState, updateCurrentStep } = useSignupFormStoreActions();
  const form = useForm<z.infer<typeof SignupUserInfoSchema>>({
    resolver: zodResolver(SignupUserInfoSchema),
    defaultValues: {
      name: '',
      password: '',
      surname: '',
    },
  });

  function onSubmit(values: z.infer<typeof SignupUserInfoSchema>) {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nome" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Cognome" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'dd/MM/yyyy')
                      ) : (
                        <span>gg/mm/aaaa</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

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
          data-amplify-analytics-attrs="signup_step:2,step_name:User info form"
          className="w-full"
          type="submit"
        >
          Next
        </Button>
      </form>
    </Form>
  );
};
