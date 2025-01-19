"use client"
import { useState } from "react"
import { RiArrowDownSLine } from "react-icons/ri"
import Approved from "./Approved"
import Pending from "./Pending"
import Rejected from "./Rejected"

export default function Beneficieries() {
  const [activeTab, setActiveTab] = useState("core")

  return (
    <section className="h-full w-full ">
      <div className="flex-col ">
        {/* <div className="flex w-full items-center justify-between p-4">
          <p className=" text-lg font-semibold text-[#25396F]">Project Beneficieries</p>
          <div className="flex items-center gap-3">
            <p className="text-sm">Filter by:</p>

            <p className="text-sm">Today</p>
            <RiArrowDownSLine />
          </div>
        </div> */}

        <div className="flex  w-full flex-col">
          <div className="flex flex-col">
            <div className="max-sm-my-4 mb-10 flex w-full gap-6 max-md:flex-col max-md:px-0 ">
              {activeTab === "core" && (
                <div className="w-full">
                  <Approved />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
