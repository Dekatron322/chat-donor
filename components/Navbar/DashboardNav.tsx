"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import axios from "axios"
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import { RxCross2 } from "react-icons/rx"

const DashboardNav = () => {
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  const handleCancelSearch = () => {
    setSearchText("")
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const toggleUtilities = () => {
    setIsUtilitiesOpen(!isUtilitiesOpen)
  }

  const pathname = usePathname()

  const getNavLinkClass = (path: string) => {
    return pathname === path ? "text-[#EEC202]" : "text-white"
  }

  const getNavImageSrc = (path: string, defaultSrc: string, activeSrc: string) => {
    return pathname === path ? activeSrc : defaultSrc
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("id")
      if (userId) {
        try {
          const response = await axios.get(`https://api.shalomescort.org/custom-user/get-user-detail/${userId}/`)
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

  if (loading) {
    return (
      <nav className="containerbg hidden border-b px-16 py-4 max-sm:px-3 md:block">
        <div className="flexBetween">
          <p className="text-[28px] font-semibold text-[#25396F]">Donor</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/DashboardImages/Icon container.png" alt="avatar" />
              <img src="/DashboardImages/Icon container (1).png" alt="avatar" />
              <Image src="/main-logo.png" width={40} height={40} alt="avatar" className="rounded-full" />
              <div>
                <p className="text-sm font-medium text-[#25396F]">loading...</p>

                {/* <p className="text-xs text-gray-500">{user.email}</p> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="containerbg hidden border-b px-16 py-4 max-sm:px-3 md:block">
        <div className="flexBetween">
          <p className="text-[28px] font-semibold text-[#25396F]">Donor</p>

          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2">
                <img src="/DashboardImages/Icon container.png" alt="avatar" />
                <img src="/DashboardImages/Icon container (1).png" alt="avatar" />
                <Image src="/main-logo.png" width={40} height={40} alt="avatar" className="rounded-full" />
                <div>
                  <p className="text-sm font-medium text-[#25396F]">{user.username}</p>
                  {/* <p className="text-xs text-gray-500">{user.email}</p> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="block border-b bg-[#EEFCF6] px-16 py-4 max-md:px-3 md:hidden">
        <div className="flex items-center justify-between">
          <FormatAlignLeftIcon onClick={toggleNav} style={{ cursor: "pointer" }} />
          <Link href="/" className="content-center">
            <Image src="/Logo.png" width={150} height={43} alt="dekalo" />
          </Link>
          <div className="flex h-[50px] items-center justify-center gap-1 rounded-full bg-[#EDF2F7] px-1">
            <Image src="/main-logo.png" width={40} height={40} alt="avatar" />
          </div>
        </div>

        <div
          className={`fixed left-0 top-0 z-50 h-full w-[250px] bg-[#35C78A] transition-transform duration-300 ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end p-4">
            <RxCross2 className="text-white" onClick={toggleNav} style={{ cursor: "pointer" }} />
          </div>
          <div className="mt-4 flex flex-col items-start space-y-2 p-4">
            <Link href="/projects" className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/dashboard")}`}>
              <Image
                src={getNavImageSrc("/projects", "/Icons/Graph.svg", "/Icons/Graph-active.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Projects</p>
            </Link>

            <Link href="/logout" className="fixed bottom-2 mt-10 flex items-center gap-2 pb-4 text-white">
              <Image src="/Icons/Logout.svg" width={20} height={20} alt="logout" />
              <p className="mt-1">Logout</p>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default DashboardNav
