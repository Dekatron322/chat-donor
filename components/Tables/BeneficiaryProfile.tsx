import React from "react"
import { RxDotsVertical } from "react-icons/rx"
import clsx from "clsx"

const BeneProfile = () => {
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md xl:w-[400px]">
      <p className="text-center text-sm font-bold">Personal Details</p>

      <div className="mt-3  flex w-full flex-col items-center gap-2 rounded-lg border border-[#53DB92] p-3">
        <img src="/DashboardImages/Avatar copy 4.png" />
        <div className="flex items-center gap-3">
          <p className="font-semibold text-[#25396F]">Hakeem Mensah</p>
          <img src="/DashboardImages/verify.png" />
        </div>
        <p className="text-[#25396F]">ID: 00005</p>
        <div className="flex w-full items-center justify-between rounded-[24px]  bg-[#FAFAFA] px-4 py-2">
          <p className="text-sm text-[#25396F]">Phone Number</p>
          <p className="text-sm text-[#25396F]">+2348132205304</p>
        </div>

        <div className="flex w-full items-center justify-between rounded-[24px]  bg-[#FAFAFA] px-4 py-2">
          <p className="text-sm text-[#25396F]">Location</p>
          <p className="text-sm text-[#25396F]">Ikeja, Lagos, Nigeria</p>
        </div>

        <div className="flex w-full items-center justify-between rounded-[24px]  bg-[#FAFAFA] px-4 py-2">
          <p className="text-sm text-[#25396F]">Email Address</p>
          <p className="text-sm text-[#25396F]">Karlkeller@gmail.com</p>
        </div>

        <div className="flex w-full items-center justify-between rounded-[24px]  bg-[#FAFAFA] px-4 py-2">
          <p className="text-sm text-[#25396F]">Created</p>
          <p className="text-sm text-[#25396F]">12 Dec, 2020</p>
        </div>
        <div className="flex w-full items-center justify-between rounded-[24px]  bg-[#FAFAFA] px-4 py-2">
          <p className="text-sm text-[#25396F]">Status</p>
          <p className="text-sm text-[#25396F]">Verified</p>
        </div>
      </div>
    </div>
  )
}

export default BeneProfile
