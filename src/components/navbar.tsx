"use client"

import { WorkflowIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
interface User {
  name: string
  email: string
  picture: string
}

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false) // State untuk kontrol visibilitas navbar

  useEffect(() => {
    const storedUser = localStorage.getItem("authToken")
    if (storedUser) {
      const decodedToken = JSON.parse(atob(storedUser.split(".")[1]))
      setUser(decodedToken)
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true) // Tampilkan navbar jika scroll > 100px
      } else {
        setIsVisible(false) // Sembunyikan navbar jika scroll di atas
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setUser(null)
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white border-b shadow-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <WorkflowIcon />
              <span>Socialize</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 font-semibold">
            <Link href="/tasks" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm">
              Chats
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm">
              About
            </Link>
          </div>

          {/* User Menu / Login Button */}
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
  )
}
