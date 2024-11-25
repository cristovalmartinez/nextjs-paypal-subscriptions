"use client"

import React, { createContext, FC, useContext, useEffect, useState } from "react"
import type { PayPalContextProvider } from "@/types"

declare global {
  interface Window {
    paypal: any
  }
}

const PayPalContext = createContext<PayPalContextProvider.PayPalContextProps | undefined>(
  undefined
)

/**
 * Custom hook to access PayPal context values.
 *
 * @returns PayPalContextProps
 */
const usePayPal = () => {
  const context = useContext(PayPalContext)
  if (!context) {
    throw new Error("usePayPal must be used within a PayPalProvider")
  }
  return context
}

/**
 * Provider component to initialize PayPal SDK and provide context values.
 *
 * @param children - Child components wrapped by the provider.
 * @param payPalClientId - PayPal client ID from developer settings to access API.
 */
const PayPalProvider: FC<PayPalContextProvider.PayPalProviderProps> = ({
  children,
  payPalClientId,
  payPalSDKUrl,
}) => {
  const [paypal, setPayPal] = useState<any>(null)
  let scriptLoaded = false

  /**
   * Function to initialize the PayPal SDK.
   *
   */
  function initializePayPal() {
    if (!scriptLoaded) {
      const script = document.createElement("script")
      script.src = `${payPalSDKUrl}/sdk/js?client-id=${payPalClientId}&vault=true&intent=subscription`
      script.async = true
      script.defer = true
      script.onload = () => {
        setPayPal(window?.paypal)
      }
      document.body.appendChild(script)
      scriptLoaded = true
    }
  }

  useEffect(() => {
    initializePayPal()
  }, [payPalClientId])

  return (
    <PayPalContext.Provider value={{ paypal, initializePayPal }}>
      {children}
    </PayPalContext.Provider>
  )
}

export { usePayPal, PayPalProvider }
