"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, User, Bot } from 'lucide-react'

/**
 * Mock API function for chat
 *
 * In a real application, this would be replaced with an actual API call
 * to send chat messages to a backend service.
 *
 * @param {string} message - The message to send
 * @returns {Promise} Promise that resolves to a response object
 */
const chatApi = {
  sendMessage: (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          content: "This is a placeholder response. Replace this API with your actual implementation.",
          timestamp: new Date().toISOString(),
        })
      }, 500)
    })
  },
}

/**
 * ChatInterface component
 * 
 * Provides a chat interface for discussing requirements with an AI assistant.
 * Features:
 * - Message history display with user and assistant messages
 * - Input field for new messages
 * - Loading state handling
 * - Auto-scrolling to the latest message
 */
export default function ChatInterface() {
  // State for chat functionality
  const [query, setQuery] = useState("")
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hello! I'm your requirements assistant. How can I help you with this requirement today?" },
    { role: "user", content: "Can you explain how this requirement relates to the CarPlay specifications?" },
    { role: "assistant", content: "This requirement aligns with Apple's CarPlay specifications for high-resolution displays. The 1122px x 684px minimum resolution is needed to support CarPlay's @3x high-resolution mode, which provides a better visual experience for users." }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef(null)

  // Scroll to bottom of chat when chat history updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  /**
   * Handle chat form submission
   * Sends the message to the API and updates the chat history
   *
   * @param {Event} e - The form submit event
   */
  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message to chat
    setChatHistory((prev) => [...prev, { role: "user", content: query }])
    setIsLoading(true)

    try {
      // Get response from API
      const response = await chatApi.sendMessage(query)
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.content,
        },
      ])
    } catch (error) {
      console.error("Failed to get chat response:", error)
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
        },
      ])
    } finally {
      setIsLoading(false)
      setQuery("")
    }
  }

  return (
    <div className="border rounded-md bg-white overflow-hidden flex flex-col h-full">
      <div className="p-2 bg-gray-50 border-b">
        <h3 className="text-sm font-medium">Chat Interface</h3>
      </div>

      <div className="flex-1 p-3 overflow-y-auto">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              message.role === "user" ? "bg-blue-50 ml-4" : "bg-gray-50 mr-4"
            }`}
          >
            <div className="flex items-start">
              <div className="mr-2 mt-0.5">
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-blue-600" />
                ) : (
                  <Bot className="h-4 w-4 text-gray-600" />
                )}
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleChatSubmit} className="p-2 border-t">
        <div className="flex items-center">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter query or type '/' for suggestions"
            className="flex-1 text-sm h-8"
            disabled={isLoading}
          />
          <Button type="submit" variant="outline" size="icon" className="ml-2 h-8 w-8" disabled={isLoading}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        {isLoading && <p className="text-xs text-gray-500 mt-1">Processing your query...</p>}
      </form>
    </div>
  )
}
