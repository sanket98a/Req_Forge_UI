"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"


export default function ModePage() {
  // State to track the selected mode
  const [selectedMode, setSelectedMode] = useState("assistant")
  const [openDialog, setDialogOpen] = useState(true) // true to show initially

  const handleSubmit = () => {
    console.log("Selected mode:", selectedMode)
    onOpenChange(false)
  }

  return (
    <div className="w-[100vw]">
    <Dialog open={openDialog} onOpenChange={setDialogOpen} >
      <DialogContent className="bg-gray-50 sm:max-w-lg">
        <DialogHeader>
          {/* <DialogTitle>Mode Options</DialogTitle> */}
          <DialogDescription>Select the mode you want to use</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="text-sm font-medium mb-4">Mode Options</h3>

          <div className="flex space-x-2 mb-6">
            <Button
              variant={selectedMode === "assistant" ? "secondary" : "outline"}
              onClick={() => setSelectedMode("assistant")}
              className="flex-1"
            >
              Assistant Mode
            </Button>
            <Button
              variant={selectedMode === "conversation" ? "secondary" : "outline"}
              onClick={() => setSelectedMode("conversation")}
              className="flex-1"
            >
              Conversation Mode
            </Button>
            <Button
              variant={selectedMode === "analysis" ? "secondary" : "outline"}
              onClick={() => setSelectedMode("analysis")}
              className="flex-1"
            >
              Analysis Mode
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}
