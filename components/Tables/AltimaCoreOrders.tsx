import React, { useState } from "react"
import { RxCaretSort, RxCross2, RxDotsVertical } from "react-icons/rx"
import { PiShieldChevronFill, PiShieldPlusFill } from "react-icons/pi"
import Image from "next/image"
import { IoMdFunnel } from "react-icons/io"
import { IoFunnelOutline } from "react-icons/io5"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"
import Select from "react-select"

import { LiaTimesSolid } from "react-icons/lia"
import { FiXCircle } from "react-icons/fi"
import { FaRegCheckCircle } from "react-icons/fa"
import Dropdown from "components/Dropdown/Dropdown"
import { RiArrowDownSLine } from "react-icons/ri"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"

type SortOrder = "asc" | "desc" | null
type Order = {
  program_id: string
  beneficiary: string
  email: string
  image: any
}

type OptionType = {
  value: string
  label: string
}

const AltimaCoreOrders = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([])

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const router = useRouter() // Initialize the router

  const handleView = async (event: React.FormEvent<HTMLFormElement>) => {
    // Redirect to the success page
    router.push("/projects/project-info")
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [isModalReminderOpen, setIsModalReminderOpen] = useState(false)

  const handleCancelOrder = () => {
    setIsModalOpen(true)
  }

  const handleStatusOrder = () => {
    setIsStatusModalOpen(true)
  }

  const confirmStatusChange = () => {
    console.log("Order canceled")
    setIsStatusModalOpen(false)
  }

  const confirmCancellation = () => {
    console.log("Order canceled")
    setIsModalOpen(false)
  }

  const closeReminderModal = () => {
    setIsModalReminderOpen(false)
  }

  const handleCancelReminderOrder = () => {
    setIsModalReminderOpen(true)
  }

  const confirmReminder = () => {
    console.log("Reminder Sent")
    setIsModalReminderOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeStatusModal = () => {
    setIsStatusModalOpen(false)
  }

  const [orders, setOrders] = useState<Order[]>([
    {
      program_id: "1234567",
      beneficiary: "Olivia Rhye",
      email: "karlkeller@gmail.com",
      image: "/DashboardImages/Avatar copy.png",
    },
    {
      program_id: "1234567",
      beneficiary: "Olivia Rhye",
      email: "karlkeller@gmail.com",
      image: "/DashboardImages/Avatar copy.png",
    },
    {
      program_id: "1234567",
      beneficiary: "Olivia Rhye",
      email: "karlkeller@gmail.com",
      image: "/DashboardImages/Avatar copy.png",
    },
    {
      program_id: "1234567",
      beneficiary: "Olivia Rhye",
      email: "karlkeller@gmail.com",
      image: "/DashboardImages/Avatar copy.png",
    },
    {
      program_id: "1234567",
      beneficiary: "Olivia Rhye",
      email: "karlkeller@gmail.com",
      image: "/DashboardImages/Avatar copy.png",
    },
    {
      program_id: "1234567",
      beneficiary: "Olivia Rhye",
      email: "karlkeller@gmail.com",
      image: "/DashboardImages/Avatar copy.png",
    },
  ])

  const doorModelIcons: Record<string, React.ReactNode> = {
    "Alima Core": <PiShieldChevronFill className="size-5" />,
    "Alima Elite": <PiShieldPlusFill className="size-5" />,
  }

  const getPaymentStyle = (tag: string) => {
    switch (tag) {
      case "Service":
        return { backgroundColor: "#F0F9FF", color: "#026AA2" }
      case "Product":
        return { backgroundColor: "#F8F9FC", color: "#363F72" }
      default:
        return {}
    }
  }

  const dotStyle = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "Service":
        return { backgroundColor: "#026AA2" }
      case "Product":
        return { backgroundColor: "#363F72" }

      default:
        return {}
    }
  }

  const toggleSort = (column: keyof Order) => {
    const isAscending = sortColumn === column && sortOrder === "asc"
    setSortOrder(isAscending ? "desc" : "asc")
    setSortColumn(column) // Now correctly typed to accept `string`

    const sortedOrders = [...orders].sort((a, b) => {
      if (a[column] < b[column]) return isAscending ? 1 : -1
      if (a[column] > b[column]) return isAscending ? -1 : 1
      return 0
    })

    setOrders(sortedOrders) // Ensure `setOrders` is also correctly typed
  }

  const handleCancelSearch = () => {
    setSearchText("")
  }

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
  )

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredOrders.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage)

  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page)
  }

  // Handle row selection
  const handleRowsChange = (event: { target: { value: any } }) => {
    setRowsPerPage(Number(event.target.value))
    setCurrentPage(1) // Reset to the first page
  }

  return (
    <div className="flex-3 relative  flex flex-col rounded-md ">
      <div className="mt-6 w-full overflow-x-auto  bg-white shadow-md">
        <table className="w-full min-w-[600px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th
                className="flex cursor-pointer items-center gap-2 whitespace-nowrap  bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("program_id")}
              >
                <MdOutlineCheckBoxOutlineBlank className="text-lg" />
                Program ID <RxCaretSort />
              </th>

              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("beneficiary")}
              >
                <p className="flex items-center gap-2">
                  Beneficiary <RxCaretSort />
                </p>
              </th>
              <th
                className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                onClick={() => toggleSort("email")}
              >
                <p className="flex items-center gap-2">
                  Email Address <RxCaretSort />
                </p>
              </th>

              <th className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"></th>

              <th className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"></th>
            </tr>
          </thead>
          <tbody className="text-[#25396F]">
            {currentRows.map((order, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-[#FCFCFE]"} // Alternating row colors
              >
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MdOutlineCheckBoxOutlineBlank className="text-lg" />
                    {order.program_id}
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <div className="flex">
                    <div className="flex items-center justify-center  gap-2 rounded-full px-2 py-1">
                      <img src={order.image} />
                      <p>{order.beneficiary}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <div className="flex items-center gap-2 pr-4">{order.email}</div>
                </td>

                <td className="whitespace-nowrap px-4 py-1 text-sm">
                  <div className="flex items-center  justify-end gap-2">
                    <Link href="/projects/project-info" className="flex items-center gap-2 text-[#17CE89] underline">
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-1">
            <p>Items</p>
            <select value={rowsPerPage} onChange={handleRowsChange} className=" border bg-[#F2F2F2] p-1">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center ">
            <button
              className={`px-2 ${currentPage === 1 ? "cursor-not-allowed text-gray-400" : "text-[#000000]"}`}
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaCircleChevronLeft />
            </button>

            {/* <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`flex h-[27px] w-[30px] items-center justify-center rounded-md ${
                    currentPage === index + 1 ? "bg-[#000000] text-white" : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div> */}

            <p>
              Showing {currentPage} of {totalPages}
            </p>

            <button
              className={`px-2  ${currentPage === totalPages ? "cursor-not-allowed text-gray-400" : "text-[#000000]"}`}
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaCircleChevronRight />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-style w-80 rounded-md p-4 shadow-md">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-medium">Cancel Order</h2>
              <LiaTimesSolid onClick={closeModal} className="cursor-pointer" />
            </div>
            <div className="my-3 flex w-full items-center justify-center">
              <img src="/DashboardImages/WarningCircle.png" alt="" />
            </div>
            <p className="mb-4 text-center text-xl font-medium">Are you sure you want to cancel this Order</p>
            <div className="flex w-full justify-between gap-3">
              <button className="button__primary flex w-full" onClick={confirmCancellation}>
                <FaRegCheckCircle />
                <p className="text-sm">Yes, Cancel</p>
              </button>
              <button className="button__danger w-full" onClick={closeModal}>
                <FiXCircle />
                <p className="text-sm">No, Leave</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AltimaCoreOrders
