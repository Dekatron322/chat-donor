"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import { Dash } from "utils"

import ProjectInfo from "components/Tables/ProjectInfo"
import { useRouter } from "next/navigation"
import ProjectSummary from "components/Tables/ProjectSummary"
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

export default function BeneficiaryProfile() {
  const router = useRouter()

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
            <div className="max-sm-my-4 flex w-full gap-6 max-md:px-0 ">
              <div className="flex w-full items-start gap-6">
                <div className="flex flex-col md:w-[70%] 2xl:w-full">
                  <div className="flex w-full gap-6 max-lg:grid max-lg:grid-cols-2">
                    <div className="flex w-full cursor-pointer gap-4 max-xl:flex-col">
                      <div className="small-card flex w-1/3 items-start gap-2 rounded-md bg-white  shadow-md transition duration-500">
                        <img src="/DashboardImages/Group 7843.png" className="max-2xl:h-10 max-2xl:w-10" />

                        <div className="flex w-full items-start justify-between">
                          <div className="w-full  pb-2">
                            <h5 className="mb-2 font-medium text-[#727272] max-2xl:text-sm">Total Received</h5>
                            <h5 className="text-xl font-medium max-2xl:text-lg">N50,000.00</h5>
                          </div>
                          <div className="flex items-start text-[#24B29F]">
                            <p>12%</p>
                            <BsArrowUpShort />
                          </div>
                        </div>
                      </div>
                      <div className="small-card flex w-1/3 items-start gap-2 rounded-md bg-white p-2 shadow-md transition duration-500">
                        <img src="/DashboardImages/Group 7844.png" className="max-2xl:h-10 max-2xl:w-10" />
                        <div className="flex w-full items-start justify-between">
                          <div className="w-full  pb-2">
                            <h5 className="mb-2 font-medium text-[#727272] max-2xl:text-sm">Total Spent</h5>
                            <h5 className="text-xl font-medium max-2xl:text-lg">N45,000.00</h5>
                          </div>
                          <div className="flex items-start  text-[#24B29F]">
                            <p>12%</p>
                            <BsArrowUpShort />
                          </div>
                        </div>
                      </div>
                      <div className="small-card flex w-1/3 items-start gap-2 rounded-md bg-white p-2 shadow-md transition duration-500">
                        <img src="/DashboardImages/Group 7844 copy.png" className="max-2xl:h-10 max-2xl:w-10" />

                        <div className="flex w-full items-start justify-between">
                          <div className="w-full  pb-2">
                            <h5 className="mb-2 font-medium text-[#727272] max-2xl:text-sm">Total Balance</h5>
                            <h5 className="text-xl font-medium max-2xl:text-lg">N5,000.00</h5>
                          </div>
                          <div className="flex items-start  text-[#FF725E]">
                            <p>12%</p>
                            <BsArrowDownShort />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ProjectInfo />
                  {/* <TabTable /> */}
                  <TransactionsInfo />
                </div>

                <BeneProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
