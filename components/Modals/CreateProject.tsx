import Dropdown from "components/Dropdown/Dropdown"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { LiaTimesSolid } from "react-icons/lia"
import Select from "react-select"

type OptionType = {
  value: string
  label: string
}

const options: OptionType[] = [
  { value: "1", label: "Abia" },
  { value: "2", label: "Adamawa" },
  { value: "3", label: "Benue" },
  { value: "4", label: "Gombe" },
  { value: "5", label: "Edo" },
  { value: "6", label: "Ekiti" },
  { value: "7", label: "Zamfara" },
  { value: "8", label: "Yola" },
  { value: "9", label: "FCT" },
  { value: "10", label: "Kogi" },
  { value: "11", label: "Kaduna" },
  { value: "12", label: "Lagos" },
  { value: "13", label: "Kwara" },
  { value: "14", label: "Plateau" },
  { value: "15", label: "Rivers" },
  { value: "16", label: "Sokoto" },
]

type CreatProjectModalProps = {
  isOpen: boolean
  closeModal: () => void
}

const CreatProjectModal = ({ isOpen, closeModal }: CreatProjectModalProps) => {
  const [isModalReminderOpen, setIsModalReminderOpen] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false)
  const [isCurDropdownOpen, setIsCurDropdownOpen] = React.useState<boolean>(false)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = React.useState<boolean>(false)

  const [projectName, setProjectName] = useState("")
  const [sdg, setSdg] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [currency, setCurrency] = useState<string[]>([])
  const [budget, setBudget] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [country, setCountry] = useState<string[]>([])
  const [selectedStates, setSelectedStates] = useState<OptionType[]>([])
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateProject = async () => {
    const payload = {
      title: projectName,
      sdg: sdg.join(", "),
      description,
      currency: currency.join(", "),
      budget,
      start_date: startDate,
      end_date: endDate,
      country: country.join(", "),
      state: selectedStates.map((state) => state.label).join(", "),
      status: "ACTIVE",
      pub_date: new Date().toISOString(),
    }

    try {
      const response = await fetch("https://api.shalomescort.org/project/project/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Project created successfully:", data)
        setShowSuccessNotification(true) // Show success notification
        setTimeout(() => closeModal(), 3000) // Close modal after delay
      } else {
        setError("An error occurred")
        setShowErrorNotification(true) // Show error notification
      }
    } catch (error) {
      console.error("Error creating project:", error)
      setShowErrorNotification(true)
    }
  }

  useEffect(() => {
    if (showSuccessNotification || showErrorNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false)
        setShowErrorNotification(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showSuccessNotification, showErrorNotification])

  const closeReminderModal = () => {
    setIsModalReminderOpen(false)
  }

  const confirmReminder = () => {
    console.log("Reminder Sent")
    setIsModalReminderOpen(false)
  }

  if (!isOpen) return null
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[#25396F]">
        <div className="modal-style max-h-[70vh] overflow-y-auto rounded-md bg-white shadow-md sm:w-[500px]">
          <div className="flex w-full justify-end px-4 pt-4">
            <LiaTimesSolid onClick={closeModal} className="cursor-pointer" />
          </div>

          <div className="flex w-full justify-center border-b">
            <h2 className="mb-4 text-center text-lg font-medium">New Cash Project</h2>
          </div>
          <div className="flex flex-col gap-3 p-4">
            {/* Input Fields */}
            <label>
              Project name
              <input
                type="text"
                placeholder="Enter name of Project"
                className="h-[46px] w-full rounded-md border bg-transparent px-4 outline-none transition-all duration-300 ease-in-out hover:border-[#17CE89] focus:border-[#17CE89] active:border-2"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </label>

            <Dropdown
              label="SDG"
              options={[
                "No Poverty",
                "Zero Hunger",
                "Good Health and well-being",
                "Quality Education",
                "Gender Equality",
                "Clean Water and Sanitation",
                "Affordable and clean energy",
                "Decent work and Economic Growth",
              ]}
              value={sdg}
              onSelect={setSdg}
              isOpen={isDropdownOpen}
              toggleDropdown={() => setDropdownOpen(!isDropdownOpen)}
              isMultiSelect={true}
            />

            <label className="text-sm">
              Description
              <textarea
                className="h-[120px] w-full rounded-md border bg-transparent p-2 text-sm outline-none focus:outline-none"
                placeholder="Enter Your Message Here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>

            <Dropdown
              label="Project Currency"
              options={["Naira", "Dollar", "Euro", "Kuwait Dinar"]}
              value={currency}
              onSelect={setCurrency}
              isOpen={isCurDropdownOpen}
              toggleDropdown={() => setIsCurDropdownOpen(!isCurDropdownOpen)}
              isMultiSelect={true}
            />

            <label>
              Budget
              <input
                type="number"
                placeholder="Enter Budget"
                className="h-[46px] w-full rounded-md border bg-transparent px-4 outline-none transition-all duration-300 ease-in-out hover:border-[#17CE89] focus:border-[#17CE89] active:border-2"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </label>

            <div className="grid w-full grid-cols-2 gap-2">
              <label>
                Start date
                <input
                  type="date"
                  className="h-[46px] w-full rounded-md border bg-transparent px-4 outline-none transition-all duration-300 ease-in-out hover:border-[#17CE89] focus:border-[#17CE89] active:border-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                End date
                <input
                  type="date"
                  className="h-[46px] w-full rounded-md border bg-transparent px-4 outline-none transition-all duration-300 ease-in-out hover:border-[#17CE89] focus:border-[#17CE89] active:border-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>

            <Dropdown
              label="Country"
              options={["Nigeria", "Ghana", "China", "Rwanda", "Sychelles", "United Kingdom"]}
              value={country}
              onSelect={setCountry}
              isOpen={isCountryDropdownOpen}
              toggleDropdown={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              isMultiSelect={true}
            />

            <div className="my-2 w-full">
              <label>
                Select State
                <Select
                  options={options}
                  isMulti
                  className="search-bg text-xs text-black"
                  value={selectedStates}
                  onChange={(selected) => setSelectedStates(selected as OptionType[])}
                  placeholder="Select State"
                />
              </label>
              <p className="text-xs text-[#707FA3]">You can add multiple states/regions</p>
            </div>
          </div>

          <div className="flex w-full justify-between gap-3 px-4 pb-4">
            <button className="button__primary flex w-full" onClick={handleCreateProject}>
              <p>Create Project</p>
            </button>
            <button className="w-full rounded-md border" onClick={closeModal}>
              <p>Cancel</p>
            </button>
          </div>
        </div>
      </div>

      {showSuccessNotification && (
        <div className="animation-fade-in fixed bottom-16 m-5  flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#0F920F] bg-[#F2FDF2] text-[#0F920F] shadow-[#05420514] md:right-16">
          <Image src="/check-circle.svg" width={16} height={16} alt="dekalo" />
          <span className="clash-font text-sm  text-[#0F920F]">Project Created Successfully</span>
        </div>
      )}
      {showErrorNotification && (
        <div className="animation-fade-in 0 fixed bottom-16  m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#D14343] bg-[#FEE5E5] text-[#D14343] shadow-[#05420514] md:right-16">
          <Image src="/check-circle-failed.svg" width={16} height={16} alt="dekalo" />
          <span className="clash-font text-sm  text-[#D14343]">Failed to create project</span>
        </div>
      )}
    </div>
  )
}

export default CreatProjectModal
