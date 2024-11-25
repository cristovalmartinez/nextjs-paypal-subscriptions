'use server';

import { runWithAmplifyServerContext } from '@/app/amplify-server-utils';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';

export async function getCurrentAuthUser() {
  const currentUser = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec),
  });

  return currentUser;
}
export async function getCurrentUserAttributes() {
  const currentUser = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => fetchUserAttributes(contextSpec),
  });

  return currentUser;
}
