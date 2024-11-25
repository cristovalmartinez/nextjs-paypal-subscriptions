import { handleEnvError } from "@/lib/errorHandlers"

const payPalSecretKey = process.env.PAYPAL_SECRET_KEY as string
const payPalClientId = process.env.PAYPAL_CLIENT_ID as string
const payPalWebHookId = process.env.PAYPAL_WEBHOOK_ID as string
const environment = process.env.NODE_ENV as string

// Throw error if env variables are not defined.
if (!payPalSecretKey || !payPalClientId || !payPalWebHookId || !environment) {
  throw handleEnvError(
    "PayPal",
    `PAYPAL_SECRET_KEY: ${payPalSecretKey}, PAYPAL_CLIENT_ID: ${payPalClientId}, PAYPAL_WEBHOOK_ID: ${payPalClientId} or NODE_ENV: ${environment}`
  )
}

// Define PayPal API URL for requests.
const payPalAPIUrl =
  environment === "production"
    ? " https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com"

// Define PayPal SDK URL for requests.
const payPalSDKUrl =
  environment === "production" ? " https://paypal.com" : "https://sandbox.paypal.com"

// Export the PayPal client.
export const payPalConfig = {
  payPalAPIUrl,
  payPalWebHookId,
  payPalClientId,
  payPalSDKUrl,
  payPalSecretKey,
}
