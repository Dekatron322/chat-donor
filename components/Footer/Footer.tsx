"use client"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { FiSun } from "react-icons/fi"
import { IoMoonOutline } from "react-icons/io5"

const Footer = () => {
  const [isMoonIcon, setIsMoonIcon] = useState(true)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const toggleIcon = () => {
    setIsMoonIcon(!isMoonIcon)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div className="fixed bottom-0 w-full bg-[#000000] px-7 py-4 max-sm:bottom-0 max-sm:right-0">
      <p className="text-center text-[#F3F3F3]">@2025 All Rights Reserved Altima</p>
    </div>
  )
}

export default Footer
function setMounted(arg0: boolean) {
  throw new Error("Function not implemented.")
}
