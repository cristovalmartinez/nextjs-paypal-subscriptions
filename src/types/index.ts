export namespace PayPalContextProvider {
  /**
   * Context to manage PayPal SDK initialization and provide access to PayPal object.
   */
  export interface PayPalContextProps {
    // The PayPal SDK object
    paypal: any
    // Function to initialize the PayPal SDK
    initializePayPal: () => void
  }

  export interface PayPalProviderProps {
    payPalClientId: string
    children: React.ReactNode
    currency?: string
    payPalSDKUrl: string
  }

  export interface PayPalButtonProps {
    planId: string
  }
}

export interface CustomLogger {
  info(message: string): void
  error(message: string): void
}

export interface ApiResponse<T> {
  status: number
  success: boolean
  data: T | null
  error: ApiError | null
}

export interface ApiError {
  type: string
  details?: { path?: string; message: string }[]
}

export interface RefundResponse {
  message: string
}

export interface PaymentIntent {
  paymentIntent: {
    id: string
    clientSecret: string | null
  }
}
