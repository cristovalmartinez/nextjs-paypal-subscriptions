import { NextRequest } from "next/server"
import { handleApiError } from "@/lib/errorHandlers"
import { handleVerifyWebhookSignature } from "@/lib/helpers/paypal.helpers"
import { handleApiResponse } from "@/lib/utils"

/**
 * Route handler function handles webhook events from PayPal
 * @param {NextRequest} req - The request object containing payload.
 * @returns {Promise<NextResponse>} - Response payment object.
 * @docs https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
export async function POST(req: NextRequest): Promise<any> {
  try {
    // Verify the PayPal webhook signature (optional but recommended)
    const signatureVerification = await handleVerifyWebhookSignature(req)
    if (!signatureVerification) {
      throw new Error("Invalid PayPal webhook signature")
    }

    const eventData = await req.json()

    // Handle webhook events
    switch (eventData.event_type) {
      case "PAYMENT.CAPTURE.COMPLETED":
        /*
          Example payload for PAYMENT.CAPTURE.COMPLETED:
          {
            "id": "PAYID-LF7EQRUM2G71091MB200934A",
            "event_version": "1.0",
            "create_time": "2022-04-05T12:00:00Z",
            "resource_type": "capture",
            "resource": {
              "id": "PAYID-LF7EQRUM2G71091MB200934A",
              "status": "COMPLETED",
              "final_capture": true,
              "seller_protection": {
                "status": "ELIGIBLE",
                "dispute_categories": ["ITEM_NOT_RECEIVED", "UNAUTHORIZED_TRANSACTION"],
                "dispute_eligibility": "ELIGIBLE",
                "protection_eligibility": "ELIGIBLE",
                "protection_eligibility_type": "ITEM_NOT_RECEIVED_ELIGIBLE"
              },
              "amount": {
                "currency_code": "USD",
                "value": "10.00"
              },
              "seller_receivable_breakdown": {
                "gross_amount": {"currency_code": "USD", "value": "10.00"},
                "paypal_fee": {"currency_code": "USD", "value": "0.50"},
                "net_amount": {"currency_code": "USD", "value": "9.50"}
              },
              "seller_receivable_amount": {"currency_code": "USD", "value": "9.50"},
              "seller_receivable_refund": {"currency_code": "USD", "value": "0.00"},
              "invoice_id": "INV123",
              "custom_id": "CUS123",
              "create_time": "2022-04-05T12:00:00Z",
              "update_time": "2022-04-05T12:00:00Z",
              "links": [
                {"href": "https://api.paypal.com/v2/payments/captures/PAYID-LF7EQRUM2G71091MB200934A", "rel": "self", "method": "GET"}
              ]
            }
          }
        */

        break

      default:
        // Handle all other event types
        console.log("Event type:")
        break
    }

    // Respond with success status
    return handleApiResponse(
      200,
      true,
      { message: "Webhook event received successfully." },
      null
    )
  } catch (error: any) {
    console.error("Error handling webhook event: ", error)
    throw handleApiError(error, 400, "Error handling webhook event.")
  }
}
