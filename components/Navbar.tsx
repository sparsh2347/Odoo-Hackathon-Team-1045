'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Search, Bell, User, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#3a3741] border-b border-[#fed5ff] backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#947bc5] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-[#ebebeb]">StackIt</span>
          </Link>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/questions" className="text-[#ebebeb] hover:text-[#947bc5] transition-colors">
              Questions
            </Link>
            <Link href="/blogs" className="text-[#ebebeb] hover:text-[#947bc5] transition-colors">
              Blogs
            </Link>
            <Link href="/announcements" className="text-[#ebebeb] hover:text-[#947bc5] transition-colors">
              Announcements
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ebebeb] w-4 h-4" />
              <input
                type="text"
                placeholder="Search questions, blogs..."
                className="w-full pl-10 pr-4 py-2 bg-[#2b2731] border border-[#fed5ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947bc5] text-[#ebebeb]"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Button variant="ghost" size="icon" className="text-[#ebebeb] hover:text-[#947bc5]">
                  <Bell className="w-5 h-5" />
                </Button>
                <Link href="/dashboard">
                  <Button className="bg-[#947bc5] hover:bg-[#8a6bb8] text-white">
                    Dashboard
                  </Button>
                </Link>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-[#ebebeb] hover:text-[#947bc5]"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-[#3a3741] border border-[#fed5ff] rounded-lg shadow-lg"
                    >
                      <Link href="/profile" className="block px-4 py-2 text-[#ebebeb] hover:bg-[#2b2731]">
                        Profile
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center w-full px-4 py-2 text-[#ebebeb] hover:bg-[#2b2731]"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-[#ebebeb] hover:text-[#947bc5]">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-[#947bc5] hover:bg-[#8a6bb8] text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#ebebeb] hover:text-[#947bc5]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}