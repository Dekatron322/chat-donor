import React, { useEffect, useState } from "react"
import { RxCaretSort, RxCheck, RxCross2 } from "react-icons/rx"
import { PiShieldChevronFill, PiShieldPlusFill } from "react-icons/pi"
import Image from "next/image"
import { IoMdFunnel } from "react-icons/io"
import { IoFunnelOutline } from "react-icons/io5"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"
import Select from "react-select"

import { RiArrowDownSLine } from "react-icons/ri"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import Link from "next/link"
import CreatProjectModal from "components/Modals/CreateProject"

type SortOrder = "asc" | "desc" | null
type Order = {
  id: string
  name: string
  total_funded: string
  amount_disbursed: string
  amount_spent: string
  budget: string
  date: string
  start_date: string
  end_date: string
  status: string
  beneficiarys: []
}

const PreOrderTable = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const router = useRouter() // Initialize the router

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.shalomescort.org/project/project/")
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const data = (await response.json()) as Order[]
        const formattedOrders = data.map((project: any) => ({
          id: project.id,
          budget: project.budget,
          name: project.title,
          total_funded: project.total_funded || "N/A",
          amount_disbursed: project.amount_disbursed || "N/A",
          amount_spent: project.amount_spent || "N/A",
          date: new Date(project.pub_date).toLocaleDateString(),
          start_date: new Date(project.start_date).toLocaleDateString(),
          end_date: new Date(project.end_date).toLocaleDateString(),
          status: project.status,
          beneficiarys: project.beneficiarys || [],
        }))

        // Update state only if there are changes
        if (JSON.stringify(formattedOrders) !== JSON.stringify(orders)) {
          setOrders(formattedOrders)
        }
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchProjects()
  }, [orders])

  const calculatePercentage = (amountSpent: string, budget: string) => {
    const spent = Number(amountSpent)
    const totalBudget = Number(budget)
    if (!totalBudget) return 0 // Avoid division by zero
    return Math.round((spent / totalBudget) * 100)
  }

  const [isModalReminderOpen, setIsModalReminderOpen] = useState(false)

  const getPaymentStyle = (status: string) => {
    switch (status) {
      case "ONGOING":
        return { backgroundColor: "#E2F1FD", color: "#53A6EB" }
      case "ENDED":
        return { backgroundColor: "#FAE8EE", color: "#E42C66" }
      case "ACTIVE":
        return { backgroundColor: "#EEFCF6", color: "#35C78A" }
      case "PAUSE":
        return { backgroundColor: "#E2F1FD", color: "#53A6EB" }

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredOrders.slice(indexOfFirstRow, indexOfLastRow)

  const handleViewProject = (projectId: string) => {
    // Store project ID in localStorage
    localStorage.setItem("projectId", projectId)

    // Redirect to /projects/project-info
    router.push("/projects/project-info")
  }

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }

  const handleSort = (order: "asc" | "desc") => {
    setSortOrder(order)
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return order === "asc" ? dateA - dateB : dateB - dateA
    })
    setOrders(sortedOrders)
    setDropdownOpen(false) // Close the dropdown after selecting
  }

  return (
    <div className="flex-3 relative  flex flex-col rounded-md ">
      <div className="flex items-center justify-between ">
        <div className="flex gap-4 max-sm:mt-2">
          <div className="flex h-[42px] w-[380px] items-center justify-between gap-3 rounded-md border border-[#707FA3] px-3 py-1 text-[#707070] max-2xl:w-[300px] max-sm:w-[150px]">
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
          <div className="relative">
            <button
              className="button-oulined flex h-12 items-center gap-2 border-[#707FA3]"
              type="button"
              onClick={toggleDropdown}
            >
              <IoMdFunnel />
              <p>Sort By</p>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full z-10 mt-2 w-40 rounded-md border border-[#707FA3] bg-white shadow-md">
                <button
                  className={`flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100 ${
                    sortOrder === "asc" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => handleSort("asc")}
                >
                  Old to New
                  {sortOrder === "asc" && <RxCheck className="text-lg" />}
                </button>
                <button
                  className={`flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100 ${
                    sortOrder === "desc" ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => handleSort("desc")}
                >
                  New to Old
                  {sortOrder === "desc" && <RxCheck className="text-lg" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-10 mt-10 grid grid-cols-3 gap-4 max-2xl:grid-cols-3 max-sm:grid-cols-1">
        {currentRows.map((order) => {
          const percentage = calculatePercentage(order.amount_spent, order.budget)
          return (
            <div key={order.id} className="w-full rounded-md bg-white p-4 shadow-md">
              <p className="font-bold text-[#25396F]">{order.name}</p>
              <div className="flex justify-between">
                <div className="mb-3 mt-1 flex items-center gap-2">
                  <img src="/DashboardImages/Vector.png" alt="Beneficiaries" />
                  <p className="text-[#707FA3]">{order.beneficiarys?.length || 0} Beneficiaries</p>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="my-2 h-2 w-full rounded bg-gray-300">
                <div className="h-full rounded bg-[#17CE89]" style={{ width: `${percentage}%` }}></div>
              </div>
              <div className="mb-4 flex w-full items-center justify-between">
                <p className="text-[#25396F]">
                  ₦{Number(order.amount_spent).toLocaleString("en-NG")}/₦{Number(order.budget).toLocaleString("en-NG")}{" "}
                  Spent
                </p>
                <p className="rounded-full bg-[#F5F6F8] px-3 py-2 text-xs">{percentage}%</p>
              </div>
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-2">
                  <img src="/DashboardImages/Frame (1).png" alt="Beneficiaries" />
                  <p>
                    {order.start_date} - {order.end_date}
                  </p>
                </div>
                <div className="flex text-xs">
                  <div
                    style={getPaymentStyle(order.status)}
                    className="flex items-center justify-center gap-1 rounded-full px-2 py-1"
                  >
                    {order.status}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleViewProject(order.id)}
                className="mt-3 flex items-center gap-2 rounded-md border border-[#17CE89] px-5 py-3 text-sm text-[#17CE89]"
              >
                View
              </button>
            </div>
          )
        })}
      </div>

      {isModalReminderOpen && (
        <CreatProjectModal isOpen={isModalReminderOpen} closeModal={() => setIsModalReminderOpen(false)} />
      )}
    </div>
  )
}

export default PreOrderTable
