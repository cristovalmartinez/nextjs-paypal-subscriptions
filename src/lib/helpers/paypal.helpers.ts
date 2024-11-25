import { payPalConfig } from "@/services/paypal"
import crypto from "crypto"

const { payPalAPIUrl, payPalWebHookId } = payPalConfig

/**
 * Fetches an access token from PayPal API using client credentials.
 * @returns {Promise<string | { error: string }>} The access token or an error object.
 */
export const handleFetchToken = async () => {
  // Encode client ID and secret for basic auth
  const authString = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
  const encodedAuthString = Buffer.from(authString).toString("base64")

  const tokenResponse = await fetch(`${payPalAPIUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedAuthString}`,
    },
    body: "grant_type=client_credentials",
  })

  const { access_token } = await tokenResponse.json()

  return access_token
}

export async function handleVerifyWebhookSignature(req: any): Promise<boolean> {
  const transmissionId = req.headers["paypal-transmission-id"]
  const transmissionTime = req.headers["paypal-transmission-time"]
  const transmissionSig = req.headers["paypal-transmission-sig"]

  const webhookEventBody = JSON.stringify(req.json())

  // Construct the expected signature
  const expectedSig = crypto
    .createHmac("sha256", payPalWebHookId)
    .update(webhookEventBody + transmissionId + transmissionTime)
    .digest("base64")

  // Compare the expected signature with the received signature
  return expectedSig === transmissionSig
}
