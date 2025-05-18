"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ChevronDown } from "lucide-react"

/**
 * ProjectSettings component
 *
 * Displays and manages project settings including:
 * - Project/Platform selection
 * - Feature selection
 * - File upload functionality
 * - Form submission
 *
 * Uses shadcn UI components for consistent styling.
 */
export default function ProjectSettings() {
  // State for form fields
  const [projectName, setProjectName] = useState("gcn-ai")
  const [featureName, setFeatureName] = useState("Tuner")
  const [file, setFile] = useState(null)

  /**
   * Handle file selection
   * Validates that only Excel files are uploaded
   *
   * @param {Event} e - The file input change event
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setFile(selectedFile)
    } else {
      alert("Please upload only Excel files (.xlsx)")
      e.target.value = null
    }
  }

  /**
   * Handle form submission
   * In a real application, this would send the data to an API
   */
  const handleSubmit = () => {
    // Simulate API submission
    console.log("Submitting data:", { projectName, featureName, file })
    alert("Data submitted successfully!")
  }

  return (
    <Card className="p-4 ">
      <div className="space-y-4 h-66">
        <div>
          <label className="text-sm font-medium block mb-1">Project/Platform Name:</label>
          <Select value={projectName} onValueChange={setProjectName}>
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gen-ai">gen-ai</SelectItem>
              <SelectItem value="project-x">project-x</SelectItem>
              <SelectItem value="infotainment-v2">infotainment-v2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Feature Name:</label>
          <Select value={featureName} onValueChange={setFeatureName}>
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select feature" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tuner">Tuner</SelectItem>
              <SelectItem value="Navigation">Navigation</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
              <SelectItem value="Phone">Phone</SelectItem>
            </SelectContent>
          </Select>

          {/* <div className="mt-2 flex items-center space-x-2">
           
            <Button variant="outline" size="sm" className="p-1">
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="p-1">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div> */}
        </div>

        <div className="flex space-x-2">
          <Button className="flex-1" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => document.getElementById("file-upload").click()}>
            Browse files
          </Button>
          <input id="file-upload" type="file" accept=".xlsx" className="hidden" onChange={handleFileChange} />
        </div>

        {file && <div className="text-sm text-green-600">File selected: {file.name}</div>}

        
      </div>
    </Card>
  )
}
