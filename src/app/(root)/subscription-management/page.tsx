import SubscriptionManagement from "@/components/SubscriptionManagement"
import React from "react"

// Handles server default caching for the page.
export const dynamic = "force-dynamic"

/**
 * Metadata for SEO.
 *
 * @function
 * @returns {Object} The metadata for the page.
 */
export const metadata = {
  title: "Subscription management",
  description: "Manage account subscription.",
}

/**
 * subscriptions management page.
 *
 * @page
 * @returns {JSX.Element} The rendered React page.
 */
const SubscriptionManagementPage: React.FC = async (): Promise<any> => {
  const response = await fetch("http://localhost:3000/data/priceData.json", {
    cache: "no-cache",
  })
  const plans = await response.json()

  return (
    <>
      <SubscriptionManagement plans={plans} />
    </>
  )
}

export default SubscriptionManagementPage
