import React, { useEffect, useRef } from "react"

interface DropdownProps {
  label: string
  options: string[]
  value: string[] // Now expecting an array of strings
  onSelect: (options: string[]) => void
  disabled?: boolean
  isOpen: boolean
  toggleDropdown: () => void
  isMultiSelect?: boolean // New prop to control multiple selection (checkbox or radio)
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onSelect,
  disabled = false,
  isOpen,
  toggleDropdown,
  isMultiSelect = true, // Default to true for multi-selection (checkboxes)
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleDropdown()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, toggleDropdown])

  const handleOptionToggle = (option: string) => {
    if (isMultiSelect) {
      // Multi-select (checkbox)
      if (value.includes(option)) {
        onSelect(value.filter((selected) => selected !== option)) // Deselect option
      } else {
        onSelect([...value, option]) // Select option
      }
    } else {
      // Single-select (radio button)
      onSelect([option]) // Select only the current option
      toggleDropdown() // Optionally close the dropdown after selecting
    }
  }

  return (
    <div className="" ref={dropdownRef}>
      <label className={`text-sm ${disabled ? "text-gray-500" : ""}`}>{label}</label>
      <div
        className={`relative h-[46px] w-full cursor-pointer rounded-lg border px-3 max-sm:mb-2 ${
          disabled
            ? "modal-style cursor-not-allowed opacity-45"
            : "modal-style border focus-within:border-[#1B5EED4D] focus-within:bg-[#FBFAFC]"
        }`}
        onClick={() => {
          if (!disabled) toggleDropdown()
        }}
      >
        <div className="flex h-[46px] items-center justify-between">
          <span className={`text-sm ${disabled ? "text-gray-500" : ""}`}>
            {value.length > 0 ? value.join(", ") : `Select ${label}`}
          </span>
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""} ${
              disabled ? "text-gray-500" : "text-black"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-6-6a1 1 0 011.414-1.414L10 9.586l5.293-5.293A1 1 0 0117.707 5.293l-6 6A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isOpen && !disabled && (
          <div className="modal-style max-h-74 absolute left-0 top-[50px] z-10 w-full overflow-hidden rounded-lg border border-[#FFFFFF1A] shadow-lg">
            <div className="scrollbar-hide max-h-60 overflow-y-scroll">
              {options.map((option) => (
                <div key={option} className="flex items-center px-3 py-2 text-sm hover:bg-[#1B5EED4D]">
                  <input
                    type={isMultiSelect ? "checkbox" : "radio"} // Dynamically set the input type
                    className="mr-2"
                    checked={value.includes(option)}
                    onChange={() => handleOptionToggle(option)}
                    disabled={disabled} // Disable checkbox/radio if dropdown is disabled
                  />
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
