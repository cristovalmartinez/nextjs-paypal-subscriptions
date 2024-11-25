import SignOutButton from "@/components/SignOutButton"
import React from "react"

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <header className='fixed bg-white dark:bg-neutral-900 top-0 left-0 right-0 w-full h-16 shadow-lg z-50 lg:px-[5rem]'>
        <nav className='flex justify-between items-center w-full h-full'>
          <div />

          <SignOutButton />
        </nav>
      </header>
      <main className='flex w-full pt-16 min-h-screen'>{children}</main>
    </>
  )
}

export default layout
