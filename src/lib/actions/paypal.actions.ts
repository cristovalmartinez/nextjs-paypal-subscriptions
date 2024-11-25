"use server"

import { Transaction } from "@/models/Transactions"
import { Subscription } from "@/models/Subscription"
import { handleFetchToken } from "../helpers/paypal.helpers"
import { payPalConfig } from "@/services/paypal"
import e from "express"

const { payPalAPIUrl } = payPalConfig

/**
 * Retrieves the details of a subscription.
 *
 * @param {string} subscriptionId - The ID of the subscription.
 * @returns {Promise<void>} - A promise that resolves when the subscription details are retrieved.
 */
export const subscriptionDetails = async (subscriptionId: string): Promise<any> => {
  try {
    // Fetch access token
    const accessToken: string = await handleFetchToken()

    // Fetch subscription details using the subscription ID and access token
    const subscriptionsResponse = await fetch(
      `${payPalAPIUrl}/v1/billing/subscriptions/${subscriptionId}`,
      {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const data = await subscriptionsResponse.json()

    if (data?.debug_id) {
      throw new Error(JSON.stringify(data.details, null, 2))
    }

    const subscription = new Subscription(data).flat()

    console.log(subscription)

    // Return the subscription details
    return subscription
  } catch (error: Error | any) {
    return {
      error: error.message,
    }
  }
}

/**
 * Changes a subscription.
 *
 * @param {string} subscriptionId - subscription ID.
 * @param {string} planId - New plan ID to change.
 * @returns {Promise<void>} - A promise that resolves when the subscription details are retrieved.
 */
export const changeSubscription = async (subscriptionId: string, planId: string) => {
  try {
    // Fetch access token
    const accessToken: string = await handleFetchToken()

    // Fetch subscription details using the subscription ID and access token
    const subscriptionsResponse = await fetch(
      `${payPalAPIUrl}/v1/billing/subscriptions/${subscriptionId}/revise`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ plan_id: planId }),
      }
    )
    const data = await subscriptionsResponse.json()
    if (data?.debug_id) {
      throw new Error(JSON.stringify(data.details, null, 2))
    }

    // Return the subscription details
    return data
  } catch (error: Error | any) {
    return {
      error: error.message,
    }
  }
}

/**
 * activates a subscription. CAUTION: cannot activate cancelled subscriptions.
 *
 * @param {string} subscriptionId - The ID of the subscription.
 * @returns {Promise<void>} - A promise that resolves when the subscription details are retrieved.
 * @docs https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_activate
 */
export const activateSubscription = async (subscriptionId: string) => {
  try {
    // Fetch access token
    const accessToken: string = await handleFetchToken()

    const subscriptionsResponse = await fetch(
      `${payPalAPIUrl}/v1/billing/subscriptions/${subscriptionId}/activate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reason: "Reactivating the subscription" }),
      }
    )
    const data = await subscriptionsResponse.json()

    if (data?.debug_id) {
      throw new Error(JSON.stringify(data.details, null, 2))
    }

    // Return the data
    return data
  } catch (error: Error | any) {
    return {
      error: error.message,
    }
  }
}

/**
 * pauses a subscription.
 *
 * @param {string} subscriptionId - The ID of the subscription.
 * @returns {Promise<void>} - A promise that resolves when the subscription details are retrieved.
 * @docs https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_suspend
 */
export const pauseSubscription = async (subscriptionId: string) => {
  try {
    // Fetch access token
    const accessToken: string = await handleFetchToken()

    const subscriptionsResponse = await fetch(
      `${payPalAPIUrl}/v1/billing/subscriptions/${subscriptionId}/suspend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reason: "Pausing the subscription" }),
      }
    )
    const data = await subscriptionsResponse.json()

    if (data?.debug_id) {
      throw new Error(JSON.stringify(data.details, null, 2))
    }

    // Return the data
    return data
  } catch (error: Error | any) {
    return {
      error: error.message,
    }
  }
}

/**
 * Cancels a subscription.
 *
 * @param {string} subscriptionId - The ID of the subscription.
 * @returns {Promise<void>} - A promise that resolves when the subscription details are retrieved.
 */
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    // Fetch access token
    const accessToken: string = await handleFetchToken()

    // cancel the subscription with ID and access token
    const subscriptionsResponse = await fetch(
      `${payPalAPIUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const data = await subscriptionsResponse.json()

    if (data?.debug_id) {
      throw new Error(JSON.stringify(data.details, null, 2))
    }

    // Return the data
    return data
  } catch (error: Error | any) {
    return {
      error: error.message,
    }
  }
}

/**
 * Fetches the transactions for a given subscription.
 *
 * @param {string} subscriptionId - The ID of the subscription.
 * @returns {Promise<any>} - A promise that resolves with the transactions data.
 * @docs https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_transactions
 */
export const fetchTransactions = async (subscriptionId: string) => {
  try {
    const accessToken: string = await handleFetchToken()

    const transactionsResponse = await fetch(
      `${payPalAPIUrl}/v1/billing/subscriptions/${subscriptionId}/transactions?start_time=2000-01-21T07:50:20.940Z&end_time=${new Date().toISOString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const data = await transactionsResponse.json()

    if (data?.debug_id) {
      throw new Error(JSON.stringify(data.details, null, 2))
    }

    // Map the transactions data to instances of Transaction and convert them to plain objects
    const transactions = data.transactions.map((transaction: any) =>
      new Transaction(transaction).flat()
    )

    return transactions
  } catch (error: Error | any) {
    return {
      error: error.message,
    }
  }
}
