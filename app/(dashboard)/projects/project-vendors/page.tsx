"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import { useRouter } from "next/navigation"
import Beneficieries from "components/Tables/Beneficieries"
import Image from "next/image"
import { IoFunnelOutline } from "react-icons/io5"
import { IoMdFunnel } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import { useState } from "react"
import Vendors from "components/Tables/Vendors"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"

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

          <div className="flex  flex-col  px-16 max-sm:px-3">
            <div className="flex items-center gap-2 md:mt-8">
              <p>Project</p>
              <MdOutlineKeyboardArrowRight />
              <p>Vendors</p>
            </div>
            <button onClick={handleGoBack} className="flex items-center gap-2 md:my-8">
              <img src="/DashboardImages/Group.png" />
              <p className="text-sm">Go back</p>
            </button>

            <div className="flex justify-between gap-4">
              <div className="flex h-[48px] w-[380px] items-center justify-between gap-3 rounded-md border border-[#707FA3] px-3 py-1 text-[#707070] max-2xl:w-[300px]">
                <Image src="/DashboardImages/Search.svg" width={16} height={16} alt="Search Icon" />
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  className="h-[46px] w-full bg-transparent outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                {searchText && <RxCross2 onClick={handleCancelSearch} style={{ cursor: "pointer" }} />}
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-md border border-[#17CE89] px-4 py-2 text-sm text-[#17CE89]">
                  <img src="/DashboardImages/Cloud Import.png" />
                  Import Vendors
                </button>
              </div>
            </div>
            <div className="max-sm-my-4 flex w-full gap-6 max-md:flex-col max-md:px-0">
              <div className="flex w-full items-start gap-6">
                <div className="flex w-full flex-col">
                  <Vendors />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
