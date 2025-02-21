import React, { useEffect, useState } from "react"
import { RxCaretSort, RxCross2, RxDotsVertical } from "react-icons/rx"
import { PiShieldChevronFill, PiShieldPlusFill } from "react-icons/pi"
import Image from "next/image"
import { IoMdFunnel } from "react-icons/io"
import { IoFunnelOutline } from "react-icons/io5"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"
import axios from "axios"

import { LiaTimesSolid } from "react-icons/lia"
import { FiXCircle } from "react-icons/fi"
import { FaRegCheckCircle } from "react-icons/fa"
import Dropdown from "components/Dropdown/Dropdown"
import { RiArrowDownSLine } from "react-icons/ri"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import Link from "next/link"

type SortOrder = "asc" | "desc" | null
type Order = {
  product_service: string
  cost: string
  maximum_redeemable: string
  tag: string
  date: string
  amount: string
}

type OptionType = {
  value: string
  label: string
}

const ProjectInfo = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [products, setProducts] = useState<any[]>([]) // Holds products fetched from the API
  const [error, setError] = useState<string>("") // Error state

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const fetchProjectProducts = async (projectId: string) => {
    try {
      const response = await axios.get(`https://api.donorsrec.chats.cash/project/project/${projectId}/`)
      const projectData = response.data
      const updatedProducts = projectData.products.map((product: any) => ({
        ...product,
        amount: (Number(product.quantity) || 0) * (Number(product.cost) || 0), // Fallback to 0 if invalid
      }))

      setProducts(updatedProducts) // Set products data from the API response
    } catch (error) {
      setError("Failed to fetch project data.")
      console.error("Error fetching project data:", error)
    }
  }

  // Use effect to fetch project data when component mounts
  useEffect(() => {
    const projectId = localStorage.getItem("projectId") // Retrieve projectId from localStorage

    if (projectId) {
      fetchProjectProducts(projectId)
    } else {
      setError("No project ID found in localStorage.")
    }
  }, [])

  const router = useRouter() // Initialize the router

  const handleView = async (event: React.FormEvent<HTMLFormElement>) => {
    // Redirect to the success page
    router.push("/projects/project-info")
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalReminderOpen, setIsModalReminderOpen] = useState(false)

  const confirmCancellation = () => {
    console.log("Order canceled")
    setIsModalOpen(false)
  }

  const handleCancelReminderOrder = () => {
    setIsModalReminderOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const doorModelIcons: Record<string, React.ReactNode> = {
    "Alima Core": <PiShieldChevronFill className="size-5" />,
    "Alima Elite": <PiShieldPlusFill className="size-5" />,
  }

  const getPaymentStyle = (product_service: string) => {
    switch (product_service) {
      case "PRODUCT":
        return { backgroundColor: "#F0F9FF", color: "#026AA2" }
      case "SERVICE":
        return { backgroundColor: "#F8F9FC", color: "#363F72" }
      default:
        return {}
    }
  }

  const dotStyle = (product_service: string) => {
    switch (product_service) {
      case "PRODUCT":
        return { backgroundColor: "#026AA2" }
      case "SERVICE":
        return { backgroundColor: "#363F72" }

      default:
        return {}
    }
  }

  const toggleSort = (column: keyof Order) => {
    const isAscending = sortColumn === column && sortOrder === "asc"
    setSortOrder(isAscending ? "desc" : "asc")
    setSortColumn(column)

    const sortedOrders = [...products].sort((a, b) => {
      if (a[column] < b[column]) return isAscending ? 1 : -1
      if (a[column] > b[column]) return isAscending ? -1 : 1
      return 0
    })

    setProducts(sortedOrders)
  }

  const handleCancelSearch = () => {
    setSearchText("")
  }

  const filteredOrders = products.filter((product) =>
    Object.values(product).some((value) => String(value).toLowerCase().includes(searchText.toLowerCase()))
  )

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredOrders.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage)

  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page)
  }

  const handleRowsChange = (event: { target: { value: any } }) => {
    setRowsPerPage(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="flex-3 relative  flex flex-col rounded-md ">
      <div className="flex items-center justify-between ">
        <div className="flex gap-4">
          <div className="flex h-[42px] w-[380px] items-center justify-between gap-3 rounded-md border border-[#707FA3] px-3 py-1 text-[#707070] max-2xl:w-[300px]">
            <Image src="/DashboardImages/Search.svg" width={16} height={16} alt="Search Icon" />
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="h-[42px] w-full bg-transparent outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && <RxCross2 onClick={handleCancelSearch} style={{ cursor: "pointer" }} />}
          </div>
        </div>
        <button className="button-primary-two gap-2" type="button" onClick={handleCancelReminderOrder}>
          <img src="/DashboardImages/excel-file copy.png" alt="Search Icon" />
          <p>Export</p>
        </button>
      </div>

      <div className="mt-6 w-full overflow-x-auto rounded-[10px] bg-white shadow-md">
        <div className="flex items-center justify-between px-5 py-4 text-[#25396F]">
          <p className="text-lg font-semibold">Products/Services ({products.length})</p>
          <div className="flex items-center gap-3">
            <p className="text-sm">Filter by:</p>

            <p className="text-sm">Today</p>
            <RiArrowDownSLine />
          </div>
        </div>
        {currentRows.some((product) => product.quantity > 0) && (
          <table className="w-full min-w-[600px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th
                  className="flex cursor-pointer items-center gap-2 whitespace-nowrap  bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("product_service")}
                >
                  Name <RxCaretSort />
                </th>

                <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("tag")}
                >
                  <p className="flex items-center gap-2">
                    Tag <RxCaretSort />
                  </p>
                </th>
                <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("cost")}
                >
                  <p className="flex items-center gap-2">
                    Unit Cost (NGN) <RxCaretSort />
                  </p>
                </th>
                <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("amount")}
                >
                  <p className="flex items-center gap-2">
                    Quantity <RxCaretSort />
                  </p>
                </th>
                <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("amount")}
                >
                  <p className="flex items-center gap-2">
                    Amount (NGN) <RxCaretSort />
                  </p>
                </th>

                <th className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"></th>
              </tr>
            </thead>
            <tbody className="text-[#25396F]">
              {currentRows.map((product, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-[#FCFCFE]"} // Alternating row colors
                >
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2">{product?.tag}</div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <div className="flex">
                      <div
                        style={getPaymentStyle(product.product_service)}
                        className="flex items-center justify-center gap-1 rounded-full px-2 py-1"
                      >
                        <span className="pr-l size-2 rounded-full" style={dotStyle(product.product_service)}></span>
                        {product.product_service}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2 pr-4">{product.cost}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2">{product.quantity || "0"}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2">₦{Number(product.amount).toLocaleString("en-NG")}</div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-1 text-sm">
                    <div className="flex items-center gap-2">
                      <RxDotsVertical />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

export default ProjectInfo
