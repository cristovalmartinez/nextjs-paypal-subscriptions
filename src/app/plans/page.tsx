import Plans from "@/components/Plans"
import Link from "next/link"

export const dynamic = "force-dynamic"

/**
 * Metadata for SEO.
 *
 * @function
 * @returns {Object} The metadata for the page.
 */
export const metadata = {
  title: "Plans",
  description: "Choose a plan that suits your needs.",
}

/**
 * plans page.
 *
 * @page
 * @returns {JSX.Element} The rendered React page.
 */
const PlansPage = async (): Promise<JSX.Element> => {
  const response = await fetch("http://localhost:3001/data/priceData.json", {
    cache: "no-cache",
  })
  const plans = await response.json()

  return (
    <>
      <div className='bg-white font-sans flex flex-col px-5 xl:px-0 py-8 w-full gap-6 items-center pt-[10rem]'>
        <h1>Select a plan</h1>
        <p>Comprehensive subscriptions</p>
        <Plans plans={plans} />
        <Link className='block font-medium text-black' href='#'>
          Compare Plans and prices
        </Link>
      </div>
    </>
  )
}

export default PlansPage
