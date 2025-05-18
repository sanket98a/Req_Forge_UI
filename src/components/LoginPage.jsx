import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    // Dummy check for demo
    if (username !== "admin" || password !== "admin123") {
      setError(true)
    } else {
      setError(false)
     navigate('/home')
    }
  }

  return (
    <div className="min-h-screen w-[100vw] flex flex-col items-center justify-center px-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-1">Requirement Forge</h1>
      <p className="text-sm text-gray-500 mb-6">Version 0.0.2</p>

      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Enter your credentials</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-2 top-[38px] text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <Button className="w-full mt-2" onClick={handleLogin}>
            Login
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>Invalid username or password.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-lg font-medium">
          🛠️🧑‍💻🚧 <span className="text-blue-700 font-bold">Work in Progress</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Please Note: All activities in this app will be logged for future improvement and debug.
        </p>
      </div>
    </div>
  )
}
