import { Home, Smartphone, Globe, Clock, HelpCircle, Settings } from "lucide-react"
import { useNavigate, useLocation } from "react-router"

/**
 * Footer component
 *
 * Provides navigation between different pages of the application.
 */
export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const currentPage = location.pathname.slice(1) || "home"

  const isActive = (page) => currentPage === page

  const handleNavigate = (page) => {
    navigate(page === "home" ? "/home" : `/${page}`)
  }

  return (
    <footer className={`${location.pathname==="/"&&"hidden"} border-t bg-white py-2`}>
      <div className="flex items-center w-full justify-center overflow-x-auto space-x-4 max-w-4xl mx-auto px-4">
        <button
          onClick={() => handleNavigate("home")}
          className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap ${
            isActive("home") ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Home className="mr-2 h-4 w-4" /> Home
        </button>
        <button
          onClick={() => handleNavigate("mode")}
          className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap ${
            isActive("mode") ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Smartphone className="mr-2 h-4 w-4" /> Mode
        </button>
        <button
          onClick={() => handleNavigate("language")}
          className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap ${
            isActive("language") ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Globe className="mr-2 h-4 w-4" /> Language
        </button>
        <button
          onClick={() => handleNavigate("history")}
          className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap ${
            isActive("history") ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Clock className="mr-2 h-4 w-4" /> History
        </button>
        <button
          onClick={() => handleNavigate("how-to-use")}
          className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap ${
            isActive("how-to-use") ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <HelpCircle className="mr-2 h-4 w-4" /> How to use?
        </button>
        <button
          onClick={() => handleNavigate("settings")}
          className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap ${
            isActive("settings") ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Settings className="mr-2 h-4 w-4" /> Settings
        </button>
      </div>
    </footer>
  )
}
