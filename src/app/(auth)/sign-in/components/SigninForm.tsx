"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SigninSchema } from "@/lib/validations"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCurrentUser, signIn } from "aws-amplify/auth"
import { useToast } from "@/components/ui/use-toast"
import { formatErrorMessage } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { identifyUser } from "aws-amplify/analytics"

export const SigninForm = () => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SigninSchema>) {
    try {
      await signIn({
        username: values.email,
        password: values.password,
      })
      const user = await getCurrentUser()
      await identifyUser({
        userId: user.userId,
        userProfile: {
          email: values.email,
        },
      })

      router.replace("/")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign in Error",
        description: formatErrorMessage(error),
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-6 mt-10'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Email' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Password' type='password' {...field} />
              </FormControl>
              <FormMessage />
              <div className='flex flex-col items-end text-sm mt-4 text-blue-400'>
                <Link href='/reset-password'>Forget your password?</Link>
              </div>
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} className='w-full' type='submit'>
          {form.formState.isSubmitting && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          Submit
        </Button>
      </form>
    </Form>
  )
}
