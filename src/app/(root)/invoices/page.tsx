import Invoices from "@/components/Invoices"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

// Handles server default caching for the page.
export const dynamic = "force-dynamic"

/**
 * Metadata for SEO.
 *
 * @function
 * @returns {Object} The metadata for the page.
 */
export const metadata = {
  title: "Invoices",
  description: "View invoice and account details.",
}

/**
 * Invoices page.
 *
 * @page
 * @returns {JSX.Element} The rendered React page.
 */
const InvoicesPage = () => {
  return (
    <div className='flex w-full pt-20'>
      <div className='mx-auto'>
        <Invoices />
      </div>
    </div>
  )
}

export default InvoicesPage
