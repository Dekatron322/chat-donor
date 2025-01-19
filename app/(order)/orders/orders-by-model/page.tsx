"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import AltimaCoreOrders from "components/Tables/AltimaCoreOrders"
import AltimaEliteOrders from "components/Tables/AltimaEliteOrders"
import CompletedOrders from "components/Tables/CompletedOrders"
import { useState } from "react"
import { PiTableDuotone } from "react-icons/pi"
import { RiArrowDownSLine } from "react-icons/ri"

export default function TabTable() {
  const [activeTab, setActiveTab] = useState("elite")

  return (
    <section className="my-6 h-full w-full rounded-lg shadow-md">
      <div className="flex-col rounded-lg bg-white">
        <p className="p-4 text-lg font-semibold text-[#25396F]">Project Feedback</p>

        <div className="flex items-center justify-between  px-4 pt-3">
          <div className="flex gap-3">
            <div
              className={`flex cursor-pointer items-center gap-1 ${
                activeTab === "core" ? " border-b-2 border-[#17CE89] px-3 pb-1 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("core")}
            >
              <p className="bottom-bar">Feedback</p>
            </div>

            <div
              className={`flex cursor-pointer items-center gap-1 ${
                activeTab === "elite" ? "border-b-2 border-[#17CE89] px-3 pb-1 font-semibold" : ""
              }`}
              onClick={() => setActiveTab("elite")}
            >
              <p className="bottom-bar">Complaint</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm">Filter by:</p>

            <p className="text-sm">Today</p>
            <RiArrowDownSLine />
          </div>
        </div>
        <div className="flex  w-full flex-col">
          <div className="flex flex-col">
            <div className="max-sm-my-4 flex w-full gap-6 max-md:flex-col max-md:px-0 ">
              {activeTab === "core" && (
                <div className="w-full">
                  <AltimaCoreOrders />
                </div>
              )}
              {activeTab === "elite" && (
                <div className="w-full">
                  <AltimaEliteOrders />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
