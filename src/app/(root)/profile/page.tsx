import { PageEventTracking } from "@/components/PageEventTracking"
// import { PageSessionTracking } from '@/components/PageSessionTracking';
import { getCurrentUserAttributes } from "@/lib/actions/auth.actions"
import React from "react"

const Profile = async () => {
  try {
    const userAttributes = await getCurrentUserAttributes()
    return (
      <>
        <div className='max-w-5xl mx-auto w-full'>profile</div>
        <PageEventTracking />
        {/* <PageSessionTracking pageName="User Profile" /> */}
      </>
    )
  } catch (error) {
    console.log(error)
    return (
      <div className='pt-10 w-full'>
        <p className='p-3 border border-red-500 text-red-500 text-lg'>
          Something went wrong!. Please refresh the page.
        </p>
      </div>
    )
  }
}

export default Profile
