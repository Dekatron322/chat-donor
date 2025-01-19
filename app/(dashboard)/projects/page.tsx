"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import PreOrderTable from "components/Tables/PreOrderTable"

interface PaymentAccount {
  id: number
  src: any
  name: string
  balance: string
}

export default function PreOrder() {
  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex  w-full flex-col">
          <DashboardNav />
          <div className="flex flex-col">
            <div className="max-sm-my-4 flex w-full gap-6 px-16  max-2xl:px-6 max-md:flex-col max-md:px-0 max-sm:px-3 md:my-8">
              <div className="w-full">
                <PreOrderTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
