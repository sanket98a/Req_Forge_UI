"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from "lucide-react"
import ChatInterface from "@/components/chatInterfaces"


const fetchRequirementDetails = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const details = [
        {
          id: 1,
          title:
            "CarPlay Siri: The system shall support CarPlay Siri trigger through Steering Wheel Control (PTT), refered to in 34_SWC SRS – 1. SYS_REQ_CarPlaySiriTrigger_#1: The system shall support CarPlay Siri trigger through Steering Wheel Control (PTT) without any user intervention.",
          systemReqId: "sys_req_highresdisplay_1",
          description:
            "The system shall support a high-resolution display with a minimum resolution of 1122px x 684px to take advantage of CarPlay's high resolution mode (@3x).",
          preconditions: ["The IVI system is powered on and connected to a compatible display."],
          steps: [
            "Ensure the IVI system's display has a minimum resolution of 1122px x 684px or greater.",
            "Connect the IVI system to an iOS device running iOS 12.0 or later with CarPlay support.",
            "Start the CarPlay interface on the iOS device.",
          ],
          token: "#818",
        },
        {
          id: 2,
          title:
            "CarPlay Siri: The system shall support activation of the system's CarPlay Siri function if initiated from device side",
          systemReqId: "sys_req_siriactivation_1",
          description:
            "The system shall support activation of CarPlay Siri when the user activates Siri on their connected iOS device.",
          preconditions: [
            "The IVI system is connected to an iOS device with CarPlay support.",
            "CarPlay is active on the IVI system.",
          ],
          steps: [
            "Activate Siri on the connected iOS device using the device's native method.",
            "Verify that Siri activates on the IVI system's display.",
            "Verify that voice commands are processed correctly.",
          ],
          token: "#819",
        },
      ]

      resolve(details.find((detail) => detail.id === id) || details[0])
    }, 300)
  })
}

/**
 * RequirementDetails component
 *
 * Displays detailed information about a selected requirement including:
 * - Requirement title and navigation
 * - Chat interface for discussing the requirement
 * - System requirement details
 * - Actions like download and feedback
 *
 * The component handles loading state, navigation between requirements,
 * and chat functionality.
 */
export default function RequirementDetails() {
  // State for requirement details
  const [currentDetail, setCurrentDetail] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalDetails, setTotalDetails] = useState(2)
  const [loading, setLoading] = useState(true)

  // Fetch requirement details on component mount and when currentIndex changes
  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchRequirementDetails(currentIndex + 1)
        setCurrentDetail(data)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch requirement details:", error)
        setLoading(false)
      }
    }

    loadDetails()
  }, [currentIndex])

  /**
   * Navigate to the previous requirement
   */
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setLoading(true)
    }
  }

  /**
   * Navigate to the next requirement
   */
  const handleNext = () => {
    if (currentIndex < totalDetails - 1) {
      setCurrentIndex(currentIndex + 1)
      setLoading(true)
    }
  }

  if (loading) {
    return <div>Loading requirement details...</div>
  }

  return (
    <Card className="overflow-hidden border-none shadow-none bg-transparent p-0">
      <div className="flex p-2 md:p-4 border rounded-md bg-white justify-between items-center">
        <div className="flex-1">
          <p className="">{currentDetail.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handlePrevious} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {currentIndex + 1}/{totalDetails}
          </span>
          <Button variant="ghost" size="sm" onClick={handleNext} disabled={currentIndex === totalDetails - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side - Chat Interface */}
        <div className="max-h-[350px] overflow-y-scroll hide-scrollbar">
          <ChatInterface />
        </div>

        {/* Right side - System Requirements */}
        <div className="border rounded-md max-h-[350px] overflow-y-scroll hide-scrollbar p-3 bg-white" >
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium">
                System Requirement ID: <span className="text-gray-600">{currentDetail.systemReqId}</span>
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Description:</p>
              <p className="text-sm text-gray-600">{currentDetail.description}</p>
            </div>

            <div>
              <p className="text-sm font-medium">Precondition (of System):</p>
              <ol className="list-decimal list-inside text-sm text-gray-600 pl-4">
                {currentDetail.preconditions.map((precondition, index) => (
                  <li key={index}>{precondition}</li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-sm font-medium">Steps:</p>
              <ol className="list-decimal list-inside text-sm text-gray-600 pl-4">
                {currentDetail.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <Button variant="outline" size="sm" className="text-xs py-1 h-7">
              Read Token: {currentDetail.token}
            </Button>
            <Button variant="outline" size="sm" className="text-xs py-1 h-7">
              Download
            </Button>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" className="p-1 h-7 w-7">
                <ThumbsUp className="h-3 w-3 text-green-500" />
              </Button>
              <Button variant="outline" size="sm" className="p-1 h-7 w-7">
                <ThumbsDown className="h-3 w-3 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
