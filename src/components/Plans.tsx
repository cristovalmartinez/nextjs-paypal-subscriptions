"use client"

import React, { useState } from "react"
import PlanCard, { Plan } from "@/components/PlanCard"
import discountCodeData from "../../public/data/discountData.json"

const Plans: React.FC<{ plans: Plan[] }> = ({ plans }) => {
  const [discountCode, setDiscountCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [discountedPrice, setDiscountedPrice] = useState<{ [key: string]: number }>({})

  const handleDiscountCodeForm = (e: React.FormEvent) => {
    e.preventDefault()
    const discount = discountCodeData.find(
      (code) => code.name.toLowerCase() === discountCode.toLowerCase()
    )

    if (discount) {
      const discountValue = parseFloat(discount.discount) / 100

      const updatedPrices = plans.reduce((acc, plan) => {
        const originalPrice = parseFloat(plan.price.replace("€", ""))
        const newPrice = originalPrice - originalPrice * discountValue
        return { ...acc, [plan.planId]: newPrice }
      }, {})

      setDiscountedPrice(updatedPrices)
      setError(null)
    } else {
      setError("Invalid discount code")
      setDiscountedPrice({})
    }
  }

  return (
    <div className='flex flex-col lg:space-x-4'>
      <div className='flex lg:flex-row'>
        {plans.map((plan) => (
          <PlanCard
            key={plan.planId}
            plan={plan}
            discountCode={discountCode}
            discountedPrice={
              discountedPrice[plan.planId] || parseFloat(plan.price.replace("€", ""))
            }
          />
        ))}
      </div>
      <form
        onSubmit={handleDiscountCodeForm}
        className='flex flex-row justify-center w-full items-center mt-4'>
        <label htmlFor='discountCode' className='mr-2'>
          <span className='block'>Do you have a discount code?</span>
          <input
            required
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            type='text'
            className='border border-gray-300 py-2 px-2'
            placeholder='Discount code'
          />
        </label>
        <button type='submit' className='ml-2 py-2 px-4 bg-blue-500 text-white'>
          Apply
        </button>
      </form>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  )
}

export default Plans
