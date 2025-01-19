import { useState } from "react"
import { useRouter } from "next/navigation"

interface ImportBeneficiariesModalProps {
  projectId: string
  isOpen: boolean
  onClose: () => void
}

const ImportBeneficiariesModal = ({ projectId, isOpen, onClose }: ImportBeneficiariesModalProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData()
    formData.append("beneficiarys", file)

    try {
      const response = await fetch(`https://api.shalomescort.org/project/import-beneficiary-to-project/${projectId}/`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to import beneficiaries")
      }

      setSuccess("Beneficiaries imported successfully!")
      setLoading(false)
      onClose() // Close the modal after successful upload
    } catch (error) {
      setError("Error importing beneficiaries")
      setLoading(false)
    }
  }

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-96 rounded-md bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Import Beneficiaries</h3>

          {error && <p className="mb-2 text-red-500">{error}</p>}
          {success && <p className="mb-2 text-green-500">{success}</p>}

          <input type="file" onChange={handleFileChange} className="mb-4" />

          <div className="flex justify-between">
            <button onClick={onClose} className="rounded-md bg-gray-300 px-4 py-2 text-sm">
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="rounded-md bg-[#17CE89] px-4 py-2 text-sm text-white"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Import"}
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default ImportBeneficiariesModal
