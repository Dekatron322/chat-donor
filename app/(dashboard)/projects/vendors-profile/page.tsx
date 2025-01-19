"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import { Dash } from "utils"

import ProjectInfo from "components/Tables/ProjectInfo"
import { useRouter } from "next/navigation"
import TabTable from "app/(order)/orders/orders-by-model/page"
import TransactionsInfo from "components/Tables/TransactionsInfo"
import BeneProfile from "components/Tables/BeneficiaryProfile"
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs"

interface PaymentAccount {
  id: number
  src: any
  name: string
  balance: string
  action: string
}

export default function VendorsProfile() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }
  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <DashboardNav />

          <div className="flex flex-col px-16 max-sm:px-3">
            <button onClick={handleGoBack} className="flex items-center gap-2 md:my-8">
              <img src="/DashboardImages/Group.png" />
              <p className="text-sm">Go back</p>
            </button>
            <div className="max-sm-my-4 flex w-full gap-6 max-md:flex-col max-md:px-0">
              <div className="flex w-full items-start gap-6">
                <div className="flex w-[70%] items-start gap-6 max-lg:grid max-lg:grid-cols-2 2xl:w-full">
                  <div className="flex w-full flex-col ">
                    <ProjectInfo />

                    <TransactionsInfo />
                  </div>

                  <BeneProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
