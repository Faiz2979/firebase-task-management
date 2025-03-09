"use client"

import { MessageSquare } from "lucide-react"

export default function ChatBlankPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar placeholder - this would be your actual sidebar */}
      <div className="w-80 hidden md:block"></div>

      {/* Blank chat state */}
      <div className="flex-1 bg-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <div className="flex justify-center mb-6">
            <MessageSquare className="h-24 w-24 text-gray-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-300 mb-3">Welcome to Socialize</h1>
          <p className="text-gray-500 mb-6">
            Select a chat from the sidebar to begin messaging.
          </p>
        </div>
      </div>
    </div>
  )
}

