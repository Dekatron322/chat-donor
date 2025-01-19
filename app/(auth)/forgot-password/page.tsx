"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import Footer from "components/Footer/Footer"

const Page: React.FC = () => {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)

  const router = useRouter() // Initialize the router

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Simulate an API call or some asynchronous action
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setShowSuccessNotification(true)
      setLoading(false)

      // Redirect to the success page
      router.push("/success")
    } catch (error) {
      setError("Failed to sign in. Please try again.")
      setShowErrorNotification(true)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#22266A]">
        <div className="auth flex rounded-[20px] bg-[#FFFFFF] max-sm:mb-40 max-sm:w-[95%] xl:max-w-[434px]">
          <div className="w-full justify-center px-[53px] py-[60px] max-sm:px-7">
            <div className="mb-8 flex items-center justify-center">
              <Image src="/AuthImages/amd-logo.png" width={250} height={74} alt="profile" />
            </div>
            <div className="mb-8 flex items-center">
              <Image src="AuthImages/ForgotPassword.svg" width={250} height={38} alt="profile" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="search-bg mb-3  h-[56px] items-center  justify-between  rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
                <p className="text-xs text-[#9D99AC]">Email</p>
                <div className="flex">
                  <input
                    type="text"
                    id="username"
                    placeholder="Shereefadamu001@gmail.com"
                    className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                    style={{ width: "100%", height: "24px" }}
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>

              <div className="mt-5 flex w-full gap-6">
                <button
                  type="submit"
                  className="button-primary h-[50px] w-full rounded-md max-sm:h-[45px]"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Continue"}
                </button>
              </div>
            </form>

            <div className="mt-2 flex justify-center gap-1">
              <p className="text-xs text-[#044982]">Don&apos;t have an Account </p>
              <Link href="/signup" className="text-xs text-[#EEC202] underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {showSuccessNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5  flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#0F920F] bg-[#F2FDF2] text-[#0F920F] shadow-[#05420514] md:right-16">
          <span className="clash-font text-sm  text-[#92E3A9]">Login Successfully</span>
          <Image src="AuthImages/Star.svg" width={16} height={16} alt="dekalo" />
        </div>
      )}
      {showErrorNotification && (
        <div className="animation-fade-in 0 absolute bottom-16  m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#D14343] bg-[#FEE5E5] text-[#D14343] shadow-[#05420514] md:right-16">
          <Image src="AuthImages/Star.svg" width={16} height={16} alt="dekalo" />
          <span className="clash-font text-sm  text-[#D14343]">{error}</span>
        </div>
      )}
    </>
  )
}

export default Page
