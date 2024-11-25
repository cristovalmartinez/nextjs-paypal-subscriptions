"use client"

import React from "react"
import PayPalButton from "@/components/PayPalPayButton"

export interface Plan {
  name: string
  price: string
  benefits: string[]
  planId: string
}

const PlanCard: React.FC<{
  plan: Plan
  discountCode: string
  discountedPrice: number
}> = ({ plan, discountedPrice }) => {
  return (
    <div className='relative'>
      <div
        className={`max-w-sm rounded-xl xl:w-[15rem] p-6 bg-white group h-full rounded-2xl ease-in duration-300 border border-[#0B0641] bg-[#0B0641] bg-opacity-[5%]`}>
        <div className='flex flex-row gap-10 items-center'>
          <p className='text-lg font-bold block capitalize'>{plan.name}</p>
        </div>
        <div>
          <div className=''>
            <div className='flex justify-start items-baseline mb-5'>
              <p className='text-[1.5rem] font-bold block'>
                €{discountedPrice.toFixed(2)}
              </p>
            </div>

            <PayPalButton planId={plan.planId} price={discountedPrice} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanCard
