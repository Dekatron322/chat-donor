import React, { useEffect, useState } from "react"
import { RxCaretSort, RxCross2 } from "react-icons/rx"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import * as XLSX from "xlsx"
import Image from "next/image"
import { IoMdFunnel } from "react-icons/io"
import { IoFunnelOutline } from "react-icons/io5"

type SortOrder = "asc" | "desc" | null
type Order = {
  program_id: string
  beneficiary: string
  phone_number: string
  dob: string
  verification: string
  origination: string
  email: string
  image: any
  date: string
}

type OptionType = {
  value: string
  label: string
}

interface ApiResponse {
  beneficiarys: Beneficiary[] // Adjust the key name to match the API response exactly
}
interface Beneficiary {
  id: string
  beneficiary_id: string
  beneficiary_type: string
  first_name: string
  last_name: string
  gender: string
  dob: string
  age: string
  age2: string
  category: string
  location: string // JSON string; can be parsed into an object
  created_at: string
  status: boolean
  pub_date: string
}

const Approved = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter() // Initialize the router

  const [isModalOpen, setIsModalOpen] = useState(false)

  const confirmCancellation = () => {
    console.log("Order canceled")
    setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const projectId = localStorage.getItem("projectId")

    if (projectId) {
      fetch(`https://api.donorsrec.chats.cash/project/project/${projectId}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch project data")
          }
          return response.json() as Promise<ApiResponse> // Explicitly typing the JSON response
        })
        .then((data) => {
          setBeneficiaries(data.beneficiarys || []) // Safely access `beneficiarys`
        })
        .catch((error) => {
          setError("Error fetching beneficiaries")
          console.error("Error:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setError("Project ID not found in localStorage")
      setLoading(false)
    }
  }, [])

  const toggleSort = (column: keyof Beneficiary) => {
    const isAscending = sortColumn === column && sortOrder === "asc"
    setSortOrder(isAscending ? "desc" : "asc")
    setSortColumn(column) // Now correctly typed to accept `string`

    const sortedOrders = [...beneficiaries].sort((a, b) => {
      if (a[column] < b[column]) return isAscending ? 1 : -1
      if (a[column] > b[column]) return isAscending ? -1 : 1
      return 0
    })

    setBeneficiaries(sortedOrders) // Ensure `setOrders` is also correctly typed
  }

  const handleCancelSearch = () => {
    setSearchText("")
  }

  const filteredOrders = beneficiaries.filter((order) =>
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(beneficiaries) // Convert JSON data to worksheet
    const workbook = XLSX.utils.book_new() // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Beneficiaries") // Append the worksheet to the workbook
    XLSX.writeFile(workbook, "beneficiaries.xlsx") // Save the workbook as an Excel file
  }

  return (
    <div className="flex-3 relative  flex flex-col rounded-md ">
      <div className="mb-6 flex gap-4">
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
        <button className="button-oulined border-[#707FA3]" type="button">
          <IoMdFunnel />
          <p>Sort By</p>
        </button>
        <button className="button-oulined border-[#707FA3]" type="button">
          <IoFunnelOutline />
          <p>Filter</p>
        </button>
      </div>
      <div className=" w-full overflow-x-auto  rounded-md bg-white shadow-md">
        <div className="mb-5 flex items-center  justify-between px-4 pt-3">
          <div className="flex gap-5">
            <p className=" text-lg font-semibold text-[#25396F]">Project Beneficiary</p>
          </div>
          <div className="flex items-center gap-3">
            {/* <button className="flex items-center gap-2 rounded-md border border-[#17CE89] px-4 py-2 text-sm text-[#17CE89]">
              <img src="/DashboardImages/Cloud Import.png" />
              Import Beneficiaries
            </button> */}
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 rounded-md border border-[#17CE89] bg-[#17CE89] px-4 py-2 text-sm  text-[#ffffff]"
            >
              <img src="/DashboardImages/excel-file copy.png" />
              Export
            </button>
          </div>
        </div>
        {loading && <p className="text-center">Loading beneficiaries...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className="w-full min-w-[600px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th
                  className="flex cursor-pointer items-center gap-2 whitespace-nowrap  bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("beneficiary_id")}
                >
                  <MdOutlineCheckBoxOutlineBlank className="text-lg" />
                  ID <RxCaretSort />
                </th>

                <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("first_name")}
                >
                  <p className="flex items-center gap-2">
                    Beneficiary <RxCaretSort />
                  </p>
                </th>
                {/* <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("last_name")}
                >
                  <p className="flex items-center gap-2">
                    Phone Number <RxCaretSort />
                  </p>
                </th>
                <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("last_name")}
                >
                  <p className="flex items-center gap-2">
                    Email Address <RxCaretSort />
                  </p>
                </th> */}
                <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("age2")}
                >
                  <p className="flex items-center gap-2">
                    Date of Birth <RxCaretSort />
                  </p>
                </th>
                {/* <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("verification")}
                >
                  <p className="flex items-center gap-2">
                    Verification <RxCaretSort />
                  </p>
                </th> */}
                {/* <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("location")}
                >
                  <p className="flex items-center gap-2">
                    Origination <RxCaretSort />
                  </p>
                </th> */}
                <th
                  className="cursor-pointer whitespace-nowrap bg-[#F7F7F7] p-4 text-sm"
                  onClick={() => toggleSort("created_at")}
                >
                  <p className="flex items-center gap-2">
                    Date <RxCaretSort />
                  </p>
                </th>

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
                      {order.beneficiary_id}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <div className="flex">
                      <div className="flex items-center justify-center  gap-2 rounded-full px-2 py-1">
                        {/* <img src={order.image} /> */}
                        <p>{order.first_name}</p>
                        <p>{order.last_name}</p>
                      </div>
                    </div>
                  </td>
                  {/* <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2 pr-4">phone</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2 pr-4">email</div>
                  </td> */}
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2 pr-4">{order.dob}</div>
                  </td>

                  {/* <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <div className="flex">
                    <div
                      style={getPaymentStyle(order.verification)}
                      className="flex items-center justify-center gap-1 rounded-full px-2 py-1"
                    >
                      {order.verification}
                    </div>
                  </div>
                </td> */}
                  {/* <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2 pr-4">{order.location}</div>
                  </td> */}
                  <td className="whitespace-nowrap px-4 py-2 text-sm">
                    <div className="flex items-center gap-2 pr-4">{order.created_at}</div>
                  </td>

                  <td className="whitespace-nowrap px-4 py-1 text-sm">
                    <div className="flex items-center  justify-end gap-2">
                      <Link
                        href="/projects/beneficiary-profile"
                        className="flex items-center gap-2 text-[#17CE89] underline"
                      >
                        View
                      </Link>
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
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={400}>400</option>
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
    </div>
  )
}

export default Approved
