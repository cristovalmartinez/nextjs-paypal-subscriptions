import Link from "next/link"
import React from "react"
import { SigninForm } from "./components/SigninForm"
// import { PageSessionTracking } from '@/components/PageSessionTracking';

const Signin = () => {
  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-center p-4 sm:p-10 lg:p-24'>
        <div className='w-full max-w-md shadow-xl rounded-lg p-5'>
          <h1 className='text-2xl font-semibold text-center'>Sign in</h1>
          <SigninForm />
          <div className='flex flex-col items-center text-lg font-medium mt-4 text-blue-600 underline underline-offset-4'>
            <Link href='/sign-up'>Don&apos;t have account? Sign up</Link>
          </div>
        </div>
      </main>
      {/* <PageSessionTracking pageName="Sign in" /> */}
    </>
  )
}

export default Signin
