"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { subscriptionDetails, fetchTransactions } from "@/lib/actions/paypal.actions"
import { formatErrorMessage } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

const user = {
  subscription: { id: "I-MKXUPAH0DACW", plan_id: "P-52H90698VH844913UM27FALI" },
}

const Invoices: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [invoices, setInvoices] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    const handleFetchSubscriptionDetails = async () => {
      try {
        const data = await subscriptionDetails(user.subscription.id)
        if (data.error) {
          throw new Error(data.error)
        }
        setInvoices(data)
      } catch (error: any) {
        setError(error.message)
        toast({
          variant: "destructive",
          title: "Fetching Subscription Details Error",
          description: formatErrorMessage(error),
        })
      }
    }

    const handleFetchTransactions = async () => {
      try {
        const data = await fetchTransactions(user.subscription.id)
        if (data?.error) {
          throw new Error(data?.error)
        }
        setTransactions(data)
      } catch (error: any) {
        setError(error.message)
        toast({
          variant: "destructive",
          title: "Fetching Transactions Error",
          description: formatErrorMessage(error),
        })
      } finally {
        setIsLoading(false)
      }
    }

    handleFetchSubscriptionDetails()
    handleFetchTransactions()
  }, [toast])

  const handleRowClick = (transaction: any) => {
    setSelectedTransaction(transaction)
  }

  const handleCloseDetail = () => {
    setSelectedTransaction(null)
  }

  return (
    <div className='relative'>
      {isLoading ? (
        "Loading..."
      ) : transactions.length > 0 ? (
        <div className='flex flex-col'>
          <Table className='max-w-xl mx-auto border'>
            <TableCaption></TableCaption>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>Next Payment Due</TableCell>
                <TableCell>{invoices.next_payment_date}</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Current Balance</TableCell>
                <TableCell className='text-right'>{invoices.balance}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Table className='mt-10'>
            <TableCaption>A list of your recent transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Services Description</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>Services decscription test</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <button onClick={() => handleRowClick(transaction)}>View</button>
                  </TableCell>
                  <TableCell>
                    <button className='border-0'>Download</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div>
          No transactions to display{" "}
          <span className='block'>{error && "Error: " + error}</span>
        </div>
      )}

      {selectedTransaction && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3 }}
          className='fixed bottom-0 left-0 px-10 right-0 h-2/3 w-full z-[99999] bg-white shadow-xl border rounded overflow-y-scroll'>
          <div className='p-4'>
            <button
              onClick={handleCloseDetail}
              className='text-red-500 border-0 font-bold'>
              Close
            </button>
            <h2 className='text-xl font-bold mb-4 mt-10'>Transaction Details</h2>
            <p className='text-xl'>
              <strong>Amount received on</strong> {selectedTransaction.date}
            </p>
            <p className='text-2xl font-bold my-5'>{selectedTransaction.amount}</p>
            <div className='flex space-x-10'>
              <div>
                <p>
                  <strong>Transaction ID:</strong> {selectedTransaction.id}
                </p>
                <p>
                  <strong>Paid By:</strong> {selectedTransaction.name}
                </p>
                <p>
                  <strong>Billing:</strong> {invoices.payer_address}
                </p>
              </div>
              <div>
                <p>
                  <strong>Paid To:</strong> My business
                </p>
                <p>
                  <strong>Billing:</strong>{" "}
                  <span className='block'>{invoices.pay_to_address}</span>
                </p>
                <p>
                  <strong>Tax Identification number:</strong>{" "}
                  <span className='block'>123456789</span>
                </p>
              </div>
            </div>
            <p className='max-w-lg text-xs text-gray-400 font-medium mt-10'>
              Payments processed by lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              Payments processed by lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              Payments processed by lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Invoices
