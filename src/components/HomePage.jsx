"use client"

import { useState } from "react"
import Header from "@/components/Header"
import StakeholderRequirementsTable from "@/components/StakeholderRequirementsTable"
import ProjectSettings from "@/components/ProjectSettings"
import RequirementDetails from "@/components/RequirementDetails"
import Footer from "@/components/Footer"

/**
 * Main application component that handles page navigation and rendering
 *
 * Currently only the homepage is implemented and active.
 * Other pages are disabled but the navigation structure is maintained for future expansion.
 */
export default function RequirementForge() {
  // State to track the currently active page (only home is active)
  const [currentPage] = useState("home")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 px-4">
        {/* Homepage content */}
        <div>
          {/* Top row with requirements table and project settings side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Requirements table - 3 columns wide */}
            <div className="lg:col-span-3">
              <StakeholderRequirementsTable />
            </div>

            {/* Project settings - 1 column wide */}
            <div className="lg:col-span-1">
              <ProjectSettings />
            </div>
          </div>

          {/* Bottom row - Requirement details */}
          <div className="mb-4">
            <RequirementDetails />
          </div>
        </div>
      </main>

      {/* <Footer currentPage={currentPage} disabled={true} /> */}
    </div>
  )
}
