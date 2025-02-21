"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Links } from "./Links"
import { CollapsedLogoIcon, LogoIcon } from "./Icons"
import clsx from "clsx"

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("id")
      if (userId) {
        try {
          const response = await axios.get(`https://api.donorsrec.chats.cash/custom-user/get-user-detail/${userId}/`)
          setUser(response.data)
          console.log("User details fetched successfully:", response.data)
        } catch (error) {
          console.error("Error fetching user details:", error)
        }
      }
      setLoading(false)
    }

    fetchUserDetails()
  }, [])

  const handleSignOut = async () => {
    if (!user?.email) {
      console.error("User email is not available")
      return
    }

    try {
      const response = await fetch("https://api.donorsrec.chats.cash/custom-user/sign-out/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      })

      if (response.ok) {
        // Clear local storage and redirect user to login page
        localStorage.clear()
        window.location.href = "/"
      } else {
        console.error("Failed to sign out")
      }
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <>
      <div
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(false)}
        className={clsx("sidebar flex h-full flex-col justify-between border-r border-[#E4E4E4] max-sm:hidden", {
          "w-20": isCollapsed,
          "w-64": !isCollapsed,
        })}
      >
        <div className="h-full justify-between border-0 lg:mt-6 lg:h-auto lg:space-y-4">
          <div className="px-7 transition-opacity lg:block">
            <Link href="/">{isCollapsed ? <CollapsedLogoIcon /> : <LogoIcon />}</Link>
          </div>

          <div className="mb-2 h-full border-[#E4E4E4] lg:h-auto lg:space-y-1">
            <Links isCollapsed={isCollapsed} />
          </div>
        </div>
        <div className="my-6 flex h-auto flex-col justify-between border-t px-6">
          <div className="flex items-center space-x-2 pt-5 text-[#707FA3]">
            <img src="/DashboardImages/Vector (1).png" />
            <p className="hidden text-xs font-semibold lg:block 2xl:text-base">Settings</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 pt-5 text-[#E42C66]">
            <img src="/DashboardImages/Group (2).png" />
            <p className="hidden text-xs font-semibold lg:block 2xl:text-base">Log Out</p>
          </button>
        </div>
      </div>

      {/* Sign-Out Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ease-in-out">
          <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg transition-all duration-300 ease-in-out">
            <h2 className="text-lg font-semibold">Confirm Sign Out</h2>
            <p className="mt-4 text-gray-600">Are you sure you want to sign out?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700"
              >
                Cancel
              </button>
              <button onClick={handleSignOut} className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SideBar
