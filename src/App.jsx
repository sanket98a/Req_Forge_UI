import { BrowserRouter as Router, Routes, Route } from "react-router"


import Login from "./components/LoginPage"
import Footer from "./components/Footer"
import RequirementForge from "./components/HomePage"
import SettingsPage from "./components/SettingsPage"
import ModePage from "./components/ModePage"
import LanguagePage from "./components/LanguagePage"
import HowToUsePage from "./components/HowToUsePage"
import HistoryPage from "./components/HistoryPage"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/home" element={<RequirementForge />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/" element={<Login/>} />
            <Route path="/mode" element={<ModePage />} />
            <Route path="/how-to-use" element={<HowToUsePage />} />
            <Route path="/language" element={<LanguagePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
