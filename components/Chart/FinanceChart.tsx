import React, { useState } from "react"

const FinanceChart = () => {
  const [activeTab, setActiveTab] = useState("revenue")

  return (
    <div className="flex gap-6">
      {/* Main Trends Section */}
      <div className="flex-3 flex w-3/4 rounded-md border p-5">
        <div className="w-full flex-col">
          {/* Tabs Header */}
          <div className="flex w-full items-center gap-5 border-b">
            <p className="bottom-bar text-2xl">Trends</p>

            <div
              className={`flex cursor-pointer items-center gap-1 ${
                activeTab === "revenue" ? "border-b-2 border-black px-3 pb-1 font-semibold text-black" : ""
              }`}
              onClick={() => setActiveTab("revenue")}
            >
              <img src="/DashboardImages/List.png" alt="" className="icon-style" />
              <img src="/DashboardImages/List-light.png" alt="" className="dark-icon-style" />
              <p className="bottom-bar">Revenue Trends</p>
            </div>

            <div
              className={`flex cursor-pointer items-center gap-1 ${
                activeTab === "preorder" ? "border-b-2 border-black px-3 pb-1 font-semibold text-black" : ""
              }`}
              onClick={() => setActiveTab("preorder")}
            >
              <img src="/DashboardImages/List.png" alt="" className="icon-style" />
              <img src="/DashboardImages/List-light.png" alt="" className="dark-icon-style" />
              <p className="">Pre-order Trends</p>
            </div>
          </div>

          {/* Tabs Content */}
          <div className="mt-4">
            {activeTab === "revenue" && (
              <>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <p className="text-3xl font-medium">₹3,500,000</p>
                    <div className="flex items-center justify-center gap-1 rounded-full bg-[#EEF5F0] px-2 py-1 text-[#589E67]">
                      <img src="/DashboardImages/TrendUp.png" />
                      <p className="text-xs font-medium">12%</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="button-oulined" type="button">
                      <p>January, 2023 - December, 2023</p>
                      <img src="/DashboardImages/CaretDown.png" alt="dekalo" className="icon-style" />
                      <img src="/DashboardImages/CaretDown-dark.png" alt="dekalo" className="dark-icon-style" />
                    </button>
                    <button className="button-oulined" type="button">
                      <p>Month</p>
                      <img src="/DashboardImages/CaretDown.png" alt="dekalo" className="icon-style" />
                      <img src="/DashboardImages/CaretDown-dark.png" alt="dekalo" className="dark-icon-style" />
                    </button>
                  </div>
                </div>
                <img src="/DashboardImages/Frame 63.svg" alt="Revenue Trends Chart" className="w-full" />
                <div className="bottom-style mt-4 flex h-8 items-center justify-center rounded-[4px] border">
                  <p className="text-xs">Clear spike in revenue around July 2024 after a marketing campaign.</p>
                </div>
              </>
            )}
            {activeTab === "preorder" && <img src="/images/Vector 367.svg" alt="Pre-order Trends Chart" />}
          </div>
        </div>
      </div>

      {/* Secondary Section */}
      <div className="flex w-1/4 flex-col justify-between rounded-md border  p-5">
        <p className="text-xl font-medium">Model Popularity</p>
        <div className="flex flex-col items-center">
          <img src="/DashboardImages/Frame 482750.svg" alt="" className="w-full" />
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#589E67]"></span>
              <p className="text-base font-medium">Altima Core (65%)</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="size-2 rounded-full bg-black"></span>
              <p className="text-base font-medium">Altima Elite (35%)</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-center font-medium">Insight</p>
          <div className="bottom-style mt-1 flex items-center justify-center rounded-[4px] border py-2">
            <p className="text-center text-xs">
              Altima Core is the top <br />
              choice among customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceChart
