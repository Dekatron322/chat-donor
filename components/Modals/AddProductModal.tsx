import React, { useEffect, useState } from "react"
import Select from "react-select"
import { LiaTimesSolid } from "react-icons/lia"
import Dropdown from "components/Dropdown/SingleDropdown"

type OptionType = {
  id: string
  name: string
  user_id: string
}

type CreateProjectModalProps = {
  projectId: string
  isOpen: boolean
  closeModal: () => void
}

const AddproductModal = ({ projectId, isOpen, closeModal }: CreateProjectModalProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [isCurDropdownOpen, setIsCurDropdownOpen] = useState<boolean>(false)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<boolean>(false)

  const [prodectName, setProdectName] = useState("")
  const [productService, setProductService] = useState("")
  const [category, setCategory] = useState("")
  const [redeemable, setRedeemable] = useState("")
  const [cost, setCost] = useState("")

  const [vendors, setVendors] = useState<OptionType[]>([])
  const [selectedVendors, setSelectedVendors] = useState<OptionType[]>([])

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("https://api.shalomescort.org/vendor/")
        if (response.ok) {
          const data = (await response.json()) as OptionType[]
          setVendors(data)
        } else {
          console.error("Failed to fetch vendors:", response.status, response.statusText)
        }
      } catch (error) {
        console.error("Error fetching vendors:", error)
      }
    }

    fetchVendors()
  }, [])

  const handleCreateProject = async () => {
    if (!projectId) {
      console.error("Project ID is missing.")
      return
    }

    const payload = {
      product_service: productService,
      maximum_redeemable: "0",
      category_type: category,
      tag: prodectName,
      cost,
      vendors: selectedVendors.map((vendor) => ({
        id: vendor.id,
        name: vendor.name,
        user_id: vendor.user_id,
      })),
      pub_date: new Date().toISOString(),
    }

    try {
      const response = await fetch(`https://api.shalomescort.org/project/add-product-to-project/${projectId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        closeModal()
      } else {
        console.error("Failed to add product:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>

          {/* Side Panel */}
          <div
            className={`fixed right-0 top-0 h-full w-full  max-w-lg bg-white shadow-md transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between border-b p-4">
              <h2 className="text-lg font-medium">New Product / Service</h2>
              <LiaTimesSolid className="cursor-pointer text-xl" onClick={closeModal} />
            </div>

            <div className="flex flex-col gap-4 p-4">
              <div>
                <label>Vendor</label>
                <Select
                  options={vendors}
                  isMulti
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.id}
                  value={selectedVendors}
                  onChange={(selected) => setSelectedVendors(selected as OptionType[])}
                  placeholder="Select Vendor"
                  className="text-sm"
                />
              </div>

              <Dropdown
                label="Product/Service"
                options={["Product", "Service"]}
                value={productService}
                onSelect={setProductService}
                isOpen={isCountryDropdownOpen}
                toggleDropdown={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              />

              <Dropdown
                label="Category Type"
                options={[
                  "Medicine",
                  "Clothing",
                  "Cash",
                  "Hygiene Items",
                  "Fresh Food Items",
                  "Processed Food",
                  "Education",
                  "Humanitarian Overhead",
                ]}
                value={category}
                onSelect={setCategory}
                isOpen={isDropdownOpen}
                toggleDropdown={() => setDropdownOpen(!isDropdownOpen)}
              />

              {/* <label>
                Maximum Redeemable
                <input
                  type="number"
                  placeholder="Enter Maximum Redeemable"
                  value={redeemable}
                  onChange={(e) => setRedeemable(e.target.value)}
                  className="w-full rounded-md border bg-transparent px-4 py-2 focus:outline-none"
                />
              </label> */}

              <label>
                Name
                <input
                  type="text"
                  placeholder="Enter Product/Service Name"
                  value={prodectName}
                  onChange={(e) => setProdectName(e.target.value)}
                  className="w-full rounded-md border bg-transparent px-4 py-2 focus:outline-none"
                />
              </label>

              <label>
                Cost
                <input
                  type="number"
                  placeholder="NGN 0.00"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full rounded-md border bg-transparent px-4 py-2 focus:outline-none"
                />
              </label>
            </div>

            <div className="flex justify-between border-t p-4">
              <button onClick={handleCreateProject} className="rounded-md bg-green-500 px-4 py-2 text-white">
                Create Product
              </button>
              <button onClick={closeModal} className="rounded-md border px-4 py-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddproductModal
