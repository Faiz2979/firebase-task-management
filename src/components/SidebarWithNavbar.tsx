"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface User {
  name: string
  email: string
  picture: string
}

export default function SidebarWithNavbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("authToken")
    if (storedUser) {
      const decodedToken = JSON.parse(atob(storedUser.split(".")[1]))
      setUser(decodedToken)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setUser(null)
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Sidebar Toggle Button (Mobile) */}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden text-gray-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo & Brand */}
            <Link href="/" className="text-xl font-bold text-gray-800">
              TaskCanvas
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/tasks" className="text-gray-600 hover:text-gray-900">
                Tasks
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </div>

            {/* User Menu / Login */}
            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Image
                      src={user.picture || "/placeholder.svg"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <span className="hidden md:block text-sm font-medium text-gray-700">{user.name}</span>
                  </div>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => router.push("/auth/login")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 md:translate-x-0`}
      >
        <div className="p-5 flex justify-between items-center border-b border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-5">
          <Link href="/tasks" className="block px-4 py-3 hover:bg-gray-700">
            Tasks
          </Link>
          <Link href="/pricing" className="block px-4 py-3 hover:bg-gray-700">
            Pricing
          </Link>
          <Link href="/about" className="block px-4 py-3 hover:bg-gray-700">
            About
          </Link>
        </nav>
      </div>

      {/* Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Spacing supaya konten tidak tertutup navbar */}
      <div className="h-16" />
    </>
  )
}
