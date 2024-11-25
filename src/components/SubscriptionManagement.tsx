"use client"

import React, { useEffect, useState } from "react"
import {
  subscriptionDetails,
  activateSubscription,
  changeSubscription,
  pauseSubscription,
  cancelSubscription,
} from "@/lib/actions/paypal.actions"
import { formatErrorMessage } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface Plans {
  plans: any
}

const SubscriptionManagement: React.FC<Plans> = ({ plans }) => {
  const [subscription, setSubscription] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { toast } = useToast()

  const user = {
    subscription: { id: "I-MKXUPAH0DACW", plan_id: "P-52H90698VH844913UM27FALI" },
  }
  // Handle pausing user subscription
  async function handlePauseSubscription(subscriptionId: string) {
    const data = await pauseSubscription(subscriptionId)
    try {
      const { error } = data
      if (error) {
        console.error(error)
        setError(error)
        throw new Error(error)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in Error",
        description: formatErrorMessage(error),
      })
    }
  }

  // handle changing/upgrading/downgrading user subscription plan.
  async function handleActivateSubscription(newPlanId: string) {
    const data = await activateSubscription(user.subscription.id)
    try {
      const { error } = data
      if (error) {
        console.error(error)
        setError(error)
        throw new Error(error)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in Error",
        description: formatErrorMessage(error),
      })
    }
  }

  // handle changing/upgrading/downgrading user subscription plan.
  async function handleChangeSubscription(newPlanId: string) {
    const data = await changeSubscription(user.subscription.id, newPlanId)
    try {
      const { error } = data
      if (error) {
        console.error(error)
        setError(error)
        throw new Error(error)
      }
      setSubscription(data)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in Error",
        description: formatErrorMessage(error),
      })
    }
  }

  // handle canceling user subscription
  async function handleCancelSubscripion() {
    const confirm = window.confirm("Are you sure you want to cancel your subscription?")
    if (!confirm) {
      return
    }
    try {
      const data = await cancelSubscription(user.subscription.id)
      const { error } = data
      if (error) {
        console.error(error)
        setError(error)
        throw new Error(error)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Canceling subscription error",
        description: formatErrorMessage(error),
      })
    }
  }

  useEffect(() => {
    const handleFetchSubscriptionDetails = async () => {
      const data = await subscriptionDetails(user.subscription.id)
      const { error } = data
      if (error) {
        console.error(error)
        setError(error)
      }
      setSubscription(data)
    }

    handleFetchSubscriptionDetails()

    return () => {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className='w-full mt-[5rem]'>
      {isLoading ? (
        <p>loading...</p>
      ) : subscription?.id ? (
        <div className='flex flex-col lg:flex-row w-full overflow-y-scroll p-4'>
          {/* left container */}

          <div className='flex items-center justify-center flex-col lg:w-[50%] space-y-4'>
            {plans.map((data: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`w-full p-6 group h-full rounded-2xl ease-in duration-300 ${
                    subscription.plan_id === data.planId
                      ? "bg-[#0B0641] text-white"
                      : "bg-white"
                  } border border-[#0B0641]`}>
                  <div className='flex flex-row gap-5 items-center'>
                    <div>{data.iconComponent}</div>
                    <span className='text-3xl font-bold'>{data.name}</span>
                  </div>
                  <span className='flex mt-4 text-[#A9A9AA] text-2xl'>
                    What You&apos;ll Get
                  </span>
                  {data.benefits.map((data: any, index: number) => (
                    <div
                      key={index}
                      className='flex flex-row gap-2.5 items-start mt-6 text-left text-lg'>
                      <div className='pt-1 shrink-0'>
                        <svg
                          className='fill-current'
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path d='M10.0001 0.00012207C4.48608 0.00012207 7.62939e-05 4.48612 7.62939e-05 10.0001C7.62939e-05 15.5141 4.48608 20.0001 10.0001 20.0001C15.5141 20.0001 20.0001 15.5141 20.0001 10.0001C20.0001 4.48612 15.5141 0.00012207 10.0001 0.00012207ZM8.00108 14.4131L4.28808 10.7081L5.70008 9.29212L7.99908 11.5871L13.2931 6.29312L14.7071 7.70712L8.00108 14.4131Z' />
                        </svg>
                      </div>
                      <span>{data}</span>
                    </div>
                  ))}
                  <div className='border border-dashed border-[#A9A9AA] tracking-widest my-4' />
                  <div>
                    <div className=''>
                      <div className='flex justify-start items-baseline mb-5'>
                        <p className='text-[20px] font-bold block'>{data.price}</p>
                      </div>
                      {subscription.plan_id === data.planId ? (
                        <div className='flex justify-between'>
                          <button
                            className='border-0 font-bold text-xs'
                            disabled={user.subscription.plan_id === data.planId}>
                            current plan
                          </button>

                          {subscription.status === "SUSPENDED" ? (
                            <button
                              className='border-0 font-bold uppercase'
                              onClick={() => handleActivateSubscription(subscription.id)}>
                              Activate Subscription
                            </button>
                          ) : (
                            <button
                              className='border-0 font-bold text-yellow-500 uppercase'
                              onClick={() => handlePauseSubscription(subscription.id)}>
                              Pause Subscription
                            </button>
                          )}
                        </div>
                      ) : (
                        <label
                          className='block font-bold uppercase flex space-x-2'
                          htmlFor=''>
                          <input type='radio' name='' />
                          Change plan
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* right container */}
          <div className='w-full lg:w-[50%] flex justify-center h-full rounded-xl'>
            <div className='flex flex-col mx-auto space-y-4 justify-center place-items-center'>
              <h3 className='my-2 font-bold text-xl capitalize'>Profile</h3>

              <div className='h-20 w-20 rounded-full border block'></div>
              <p className='font-bold'>{subscription.payer_name}</p>
              <p className='py-1'>
                <span
                  className={`font-bold ${
                    subscription.status === "ACTIVE"
                      ? "bg-green-400 bg-opacity-10 text-green-500"
                      : "bg-red-400"
                  }`}>
                  {subscription.status}
                </span>
              </p>
              <p className='font-bold'>{subscription.id}</p>

              <p className='font-bold'>{subscription.payer_email}</p>
              <div className='max-w-max mx-auto'>
                {subscription.status === "ACTIVE" ? (
                  <>
                    <button
                      className='text-red-500 border-0'
                      onClick={handleCancelSubscripion}>
                      cancel subscription
                    </button>
                  </>
                ) : (
                  <button>activate subscription</button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  )
}

export default SubscriptionManagement
