"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import { Dash } from "utils"

import ProjectInfo from "components/Tables/ProjectInfo"
import { useRouter } from "next/navigation"
import ProjectSummary from "components/Tables/ProjectSummary"
import TabTable from "app/(order)/orders/orders-by-model/page"
import TransactionsInfo from "components/Tables/TransactionsInfo"
import Link from "next/link"
import { useEffect, useState } from "react"
import ImportBeneficiariesModal from "components/Modals/ImportBeneficiery"
import CreatProjectModal from "components/Modals/CreateProject"
import { IoMdAdd } from "react-icons/io"
import AddproductModal from "components/Modals/AddProductModal"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"

interface ProjectData {
  title: string
  beneficiarys: any[]
  products: {
    vendors: any[]
  }[]
}

export default function PreOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectId, setProjectId] = useState<string>("")
  const [projectName, setProjectName] = useState<string>("")

  const [totalBeneficiaries, setTotalBeneficiaries] = useState<number>(0)
  const [totalVendors, setTotalVendors] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    // Get project ID from localStorage
    const projectId = localStorage.getItem("projectId")

    if (projectId) {
      // Fetch project data from the API
      fetch(`https://api.shalomescort.org/project/project/${projectId}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch project data")
          }
          return response.json() // Return JSON data
        })
        .then((data: unknown) => {
          const projectData = data as ProjectData // Explicitly cast `data` to `ProjectData`
          // Update project name
          setProjectName(projectData.title) // Ensure `title` exists in `ProjectData` interface
          // Update total beneficiaries and vendors
          setTotalBeneficiaries(projectData.beneficiarys?.length || 0)
          setTotalVendors(projectData.products.reduce((total, product) => total + (product.vendors?.length || 0), 0))
        })
        .catch((error) => {
          console.error("Error fetching project data:", error)
        })
    }
  }, [])

  const handleOpenModal = () => {
    const projectId = localStorage.getItem("projectId")
    if (projectId) {
      setProjectId(projectId)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleGoBack = () => {
    router.back()
  }

  const [isModalReminderOpen, setIsModalReminderOpen] = useState(false)

  const handleCancelReminderOrder = () => {
    const projectId = localStorage.getItem("projectId")
    if (projectId) {
      setProjectId(projectId)
      setIsModalReminderOpen(true)
    }
  }

  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <DashboardNav />

          <div className="flex flex-col px-16 max-2xl:px-6 max-sm:px-3">
            <div className="flex items-center gap-2 md:mt-8">
              <p>Project</p>
              <MdOutlineKeyboardArrowRight />
              <p>{projectName || "Loading..."}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <button onClick={handleGoBack} className="flex items-center gap-2 md:my-8">
                <img src="/DashboardImages/Group.png" />
                <p className="text-sm">Go back</p>
              </button>
              {/* <div className="flex gap-2">
                <button
                  className="flex items-center gap-2 rounded-md border border-[#17CE89] px-4 py-2 text-sm text-[#17CE89]"
                  onClick={handleOpenModal}
                >
                  <img src="/DashboardImages/Cloud Import.png" />
                  Import Beneficiaries
                </button>
                <button
                  className="flex items-center gap-2 rounded-md border border-[#17CE89] px-4 py-2 text-sm text-[#17CE89]"
                  onClick={handleCancelReminderOrder}
                >
                  <IoMdAdd />
                  Add Product
                </button>
              </div> */}
            </div>
            <div className="max-sm-my-4 flex w-full gap-6 max-md:flex-col max-md:px-0">
              <div className="flex w-full items-start gap-6">
                <div className="flex flex-col md:w-[70%] 2xl:w-full">
                  {/* <div className="flex w-full gap-6 max-lg:grid max-lg:grid-cols-2">
                    {/* <div className="flex w-full cursor-pointer gap-2">
                      <div className="small-card rounded-md bg-white p-2 shadow-md transition duration-500">
                        <h5 className="mb-3 font-medium text-[#727272]">Total Beneficiaries</h5>
                        <div className="flex items-end justify-between">
                          <div className="w-full border-b pb-2">
                            <h5 className="text-3xl font-medium max-2xl:text-xl">{totalBeneficiaries}</h5>
                          </div>
                        </div>

                        <div className="mt-3 flex w-full items-center justify-end gap-4">
                          <Link
                            href="project-beneficieries"
                            className="flex items-center justify-center gap-3 rounded-md border-2 border-[#17CE89] px-4 py-2 text-[#17CE89] transition-all duration-300 ease-out hover:bg-[#EEFCF6]"
                          >
                            <img src="/DashboardImages/user-tag.png" />
                            <p className="text-sm">View Beneficiaries</p>
                          </Link>
                        </div>
                      </div>
                    </div> */}
                  {/* <div className="flex w-full cursor-pointer gap-2">
                      <div className="small-card rounded-md bg-white p-2 shadow-md transition duration-500">
                        <h5 className="mb-3 font-medium text-[#727272]">Total Vendors</h5>
                        <div className="flex items-end justify-between">
                          <div className="w-full border-b pb-2">
                            <h5 className="text-3xl font-medium max-2xl:text-xl">1</h5>
                          </div>
                        </div>

                        <div className="mt-3 flex w-full items-center justify-end gap-4">
                          <Link
                            href="#"
                            className="flex items-center justify-center gap-3 rounded-md border-2 border-[#17CE89] px-4 py-2 text-[#17CE89]"
                          >
                            <img src="/DashboardImages/user-tag.png" />
                            <p className="text-sm">View Vendors</p>
                          </Link>
                        </div>
                      </div>
                    </div> 
                  </div> */}

                  <ProjectInfo />
                  {/* <TabTable /> */}
                  <TransactionsInfo />
                </div>

                <ProjectSummary />

                <ImportBeneficiariesModal projectId={projectId} isOpen={isModalOpen} onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalReminderOpen && (
        <AddproductModal
          isOpen={isModalReminderOpen}
          projectId={projectId}
          closeModal={() => setIsModalReminderOpen(false)}
        />
      )}
    </section>
  )
}
