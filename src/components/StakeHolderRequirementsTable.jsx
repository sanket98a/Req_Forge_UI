"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"

/**
 * Dummy API function to simulate fetching requirements
 *
 * In a real application, this would be replaced with an actual API call
 * to fetch requirements from a backend service.
 *
 * @returns {Promise} Promise that resolves to an array of requirement objects
 */
const fetchRequirements = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          selected: false,
          requirement:
            "CarPlay Siri: The system shall support activation of the system's CarPlay Siri function if initiated from device side",
          status: "ONGOING",
        },
        {
          id: 2,
          selected: false,
          requirement:
            "CarPlay Siri: The system shall support CarPlay Siri trigger through Steering Wheel Control (PTT), refered to in 34_SWC SRS",
          status: "ONGOING",
        },
        {
          id: 3,
          selected: false,
          requirement:
            "CarPlay Siri: The system shall take the same amount of time to timeout Apple Siri, as is taken on the native connected device",
          status: "Ongoing",
        },
        {
          id: 4,
          selected: false,
          requirement:
            "CarPlay Siri: System shall provide an option to cancel/exit the CarPlay Siri mode using SWC(PTT)",
          status: "ongoing",
        },
      ])
    }, 500)
  })
}

/**
 * StakeholderRequirementsTable component
 *
 * Displays a table of stakeholder requirements with:
 * - Select all functionality
 * - Individual requirement selection
 * - Status indicators
 * - Responsive design
 *
 * The component handles loading state and selection state management.
 */
export default function StakeholderRequirementsTable() {
  // State for requirements data
  const [requirements, setRequirements] = useState([])
  const [loading, setLoading] = useState(true)

  // State for selection tracking
  const [selectedCount, setSelectedCount] = useState(0)
  const [selectAll, setSelectAll] = useState(false)

  // Total count for demo purposes
  const totalCount = 15

  // Fetch requirements on component mount
  useEffect(() => {
    const loadRequirements = async () => {
      try {
        const data = await fetchRequirements()
        setRequirements(data)
        setSelectedCount(data.filter((req) => req.selected).length)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch requirements:", error)
        setLoading(false)
      }
    }

    loadRequirements()
  }, [])

  /**
   * Handle individual checkbox change
   * Updates the selected state of a specific requirement
   *
   * @param {number} id - The ID of the requirement to toggle
   */
  const handleCheckboxChange = (id) => {
    const updatedRequirements = requirements.map((req) => {
      if (req.id === id) {
        const newSelected = !req.selected
        return { ...req, selected: newSelected }
      }
      return req
    })

    setRequirements(updatedRequirements)
    setSelectedCount(updatedRequirements.filter((req) => req.selected).length)
    setSelectAll(updatedRequirements.every((req) => req.selected))
  }

  /**
   * Handle select all checkbox change
   * Updates the selected state of all requirements
   */
  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll
    const updatedRequirements = requirements.map((req) => ({
      ...req,
      selected: newSelectAll,
    }))

    setRequirements(updatedRequirements)
    setSelectedCount(newSelectAll ? requirements.length : 0)
    setSelectAll(newSelectAll)
  }

  if (loading) {
    return <div>Loading requirements...</div>
  }

  return (
    <div className="space-y-1">
      <Card className="overflow-hidden h-full">
        <div className="p-2 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="text-sm font-medium">Stakeholder Requirements</h2>
          <span className="text-xs text-gray-500">
            {selectedCount}/{totalCount}
          </span>
        </div>

        <div className=" overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">
                  <div className="flex items-center">
                    <Checkbox checked={selectAll} onCheckedChange={handleSelectAllChange} id="select-all" />
                    <label htmlFor="select-all" className="ml-2 text-sm">
                      Select All
                    </label>
                  </div>
                </TableHead>
                <TableHead>
                  <span className="text-sm">Stakeholder Requirement</span>
                </TableHead>
                <TableHead className="w-[80px]">
                  <span className="text-sm">Status</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requirements.map((req) => (
                <TableRow key={req.id} className={req.selected ? "bg-blue-50" : ""}>
                  <TableCell className="py-2">
                    <Checkbox checked={req.selected} onCheckedChange={() => handleCheckboxChange(req.id)} />
                  </TableCell>
                  <TableCell className="py-2">
                    <span className="text-sm">{req.requirement}</span>
                  </TableCell>
                  <TableCell className="py-2">
                    <span className="text-sm text-gray-500">{req.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
