
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

/**
 * LanguagePage component
 *
 * Displays a dialog for selecting the application language.
 * Uses shadcn Dialog component for the modal interface.
 *
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onOpenChange - Function to call when the open state changes
 */
export default function LanguagePage() {
  // State to track the selected language
  const [selectedLanguage, setSelectedLanguage] = useState("english")
const [openDialog, setDialogOpen] = useState(true) // true to show initially
  // Available languages
  const languages = [
    { id: "english", name: "English" },
    { id: "spanish", name: "Spanish" },
    { id: "french", name: "French" }
  ]

  /**
   * Handle form submission
   * Logs the selected language and closes the dialog
   */
  const handleSubmit = () => {
    console.log("Selected language:", selectedLanguage)
    onOpenChange(false)
  }

  return (
    <div className="w-[100vw]">
    <Dialog open={openDialog} onOpenChange={setDialogOpen}>
      <DialogContent className="bg-gray-50 sm:max-w-md">

        <div className="p-1">
          <h3 className="text-sm font-medium mb-4">Select Language</h3>

          <div className="grid grid-cols-2 gap-2 ">
            {languages.map((language) => (
              <Button
                key={language.id}
                variant={selectedLanguage === language.id ? "secondary" : "outline"}
                onClick={() => setSelectedLanguage(language.id)}
              >
                {language.name}
              </Button>
            ))}
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
