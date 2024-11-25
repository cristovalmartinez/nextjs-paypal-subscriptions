"use client"

import { useEffect } from "react"

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "30rem",
        margin: "auto",
        color: "black",
      }}>
      <div>
        <h2>Oops. Something went wrong.</h2>

        <p className='text-sm'>{`Error: "${error.message}"`}</p>
        <button
          className='p-5'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }>
          Try again
        </button>
      </div>
    </div>
  )
}

export default Error
