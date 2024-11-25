"use client"

import React, { useEffect } from "react"
import { usePayPal } from "@/contexts/PayPalContext"
import { useRouter } from "next/navigation"
import type { PayPalContextProvider } from "@/types"

const PayPalButton: React.FC<
  PayPalContextProvider.PayPalButtonProps & { price: number }
> = ({ planId, price }) => {
  const { paypal } = usePayPal()
  const router = useRouter()

  function handlePaymentSuccess() {
    router.push(`/`)
  }

  function handlePaymentError(err: Error) {
    alert(err)
  }

  useEffect(() => {
    if (paypal) {
      paypal
        .Buttons({
          style: { shape: "rect" },
          createSubscription: function (data: any, actions: any) {
            return actions.subscription.create({
              plan_id: planId,
              custom_id: planId,
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
              purchase_units: [
                {
                  amount: {
                    currency_code: "EUR",
                    value: price,
                  },
                },
              ],
            })
          },
          onApprove: function (data: any, actions: any) {
            return actions.subscription.get().then(function (details: any) {
              handlePaymentSuccess()
            })
          },
          onError: handlePaymentError,
        })
        .render(`#paypal-button-container-${planId}`)
    }
  }, [paypal, planId, price])

  return <div id={`paypal-button-container-${planId}`} className='z-10 pb-2'></div>
}

export default PayPalButton
