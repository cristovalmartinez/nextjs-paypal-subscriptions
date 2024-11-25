import React from 'react';
import { SignupFormSteps } from './components/SignupFormSteps';
import Link from 'next/link';
import { PageEventTracking } from '@/components/PageEventTracking';
import { PageSessionTracking } from '@/components/PageSessionTracking';

const Signup = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-10 lg:p-24">
        <div className="w-full max-w-md shadow-xl rounded-lg p-5">
          <h1 className="text-2xl font-semibold text-center">Registrati</h1>
          <SignupFormSteps />
          <div className="flex flex-col items-center text-lg font-medium mt-4 text-blue-600 underline underline-offset-4">
            <Link href="/sign-in">Hai gia un account? Accedi</Link>
          </div>
        </div>
      </main>
      <PageEventTracking />
      <PageSessionTracking pageName="Sign up" />
    </>
  );
};

export default Signup;
