"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import { useRouter } from "next/navigation"
import Beneficieries from "components/Tables/Beneficieries"
import Image from "next/image"
import { IoFunnelOutline } from "react-icons/io5"
import { IoMdFunnel } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import { useState } from "react"

interface PaymentAccount {
  id: number
  src: any
  name: string
  balance: string
  action: string
}

export default function PreOrder() {
  const [searchText, setSearchText] = useState("")
  const router = useRouter()

  const handleCancelSearch = () => {
    setSearchText("")
  }

  const confirmStatusChange = () => {
    console.log("Order canceled")
  }

  const handleGoBack = () => {
    router.back()
  }
  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <DashboardNav />

          <div className="flex flex-col px-16 max-2xl:px-6 max-sm:px-3">
            <button onClick={handleGoBack} className="flex items-center gap-2 md:my-8">
              <img src="/DashboardImages/Group.png" />
              <p className="text-sm">Go back</p>
            </button>

            <div className="max-sm-my-4 flex w-full gap-6  max-md:flex-col">
              <div className="flex w-full items-start gap-6">
                <div className="flex w-full flex-col">
                  <Beneficieries />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
