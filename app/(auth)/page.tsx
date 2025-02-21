"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const router = useRouter()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post("https://api.donorsrec.chats.cash/custom-user/sign-in/", {
        email,
        password,
      })

      // Log the posted data
      console.log("Data posted:", {
        email,
        password,
      })

      // Handle the response as needed
      console.log("Login successful:", response.data)

      const userId = response.data.id
      localStorage.setItem("id", userId.toString())
      console.log("User ID set in localStorage:", localStorage.getItem("id")) // Log the value to confirm

      // Redirect based on department
      setShowSuccessNotification(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/projects")
    } catch (error) {
      setError("Login failed. Please try again.")
      console.error("Login error:", error)

      setShowErrorNotification(true)
      setTimeout(() => setShowErrorNotification(false), 1000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative flex h-screen flex-grow justify-center bg-[#252525]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/AuthImages/bg.jpeg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Foreground Content */}
      <div className="z-10 flex w-full flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <img src="/Logo.png" alt="profile" className="max-sm:w-[214px]" />
        </div>
        <h1 className="my-6 text-3xl text-white">Hi, welcome back</h1>
        <div className="flex h-auto rounded-[10px] border bg-[#FFFFFF] max-sm:w-[92%] md:w-[450px] xl:max-w-[450px]">
          <div className="w-full justify-center p-6 max-sm:px-7">
            <form onSubmit={handleSubmit}>
              <label className="text-sm text-[#222222]">Email Address</label>
              <div className="search-bg py-auto mb-3 flex h-[52px] items-center justify-between rounded-md px-3">
                <div className="flex w-full items-center">
                  <img src="/AuthImages/Group.png" alt="profile" />
                  <input
                    type="email"
                    id="email"
                    placeholder="chatngo@gmail.com"
                    className="h-[52px] w-full bg-transparent text-sm outline-none focus:outline-none"
                    style={{
                      padding: "0 12px",
                      lineHeight: "53px",
                      height: "53px",
                    }}
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              <label className="text-sm text-[#222222]">Password</label>
              <div className="search-bg py-auto mb-3 flex h-[52px] items-center justify-between rounded-md px-3">
                <div className="flex w-full items-center gap-3">
                  <img src="/AuthImages/Vector.png" alt="profile" />
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter Password"
                    className="h-[53px] w-full bg-transparent text-sm outline-none focus:outline-none"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button type="button" className="focus:outline-none" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                      <RemoveRedEyeOutlinedIcon />
                    ) : (
                      <Image
                        className="icon-style"
                        src="/AuthImages/eye-close-line.svg"
                        width={24}
                        height={24}
                        alt="toggle password visibility"
                      />
                    )}
                  </button>
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="mt-5 flex w-full gap-6">
                <button
                  type="submit"
                  className="button-primary h-[50px] w-full rounded-md max-sm:h-[45px]"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
              <Link href="#" className="mt-5 flex content-center items-center">
                <p className="text-sm text-[#17CE89]">Forgot Password</p>
              </Link>
              <div className="mt-8 flex w-full items-center gap-2 text-sm">
                <p>Don’t have an account?</p>
                <Link href="/signup" className="text-[#17CE89] hover:underline">
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showSuccessNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5  flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#0F920F] bg-[#F2FDF2] text-[#0F920F] shadow-[#05420514] md:right-16">
          <Image src="/check-circle.svg" width={16} height={16} alt="dekalo" />
          <span className="clash-font text-sm  text-[#0F920F]">Logged up Successfully</span>
        </div>
      )}
      {showErrorNotification && (
        <div className="animation-fade-in 0 absolute bottom-16  m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#D14343] bg-[#FEE5E5] text-[#D14343] shadow-[#05420514] md:right-16">
          <Image src="/check-circle-failed.svg" width={16} height={16} alt="dekalo" />
          <span className="clash-font text-sm  text-[#D14343]">{error}</span>
        </div>
      )}
    </section>
  )
}

export default SignIn
