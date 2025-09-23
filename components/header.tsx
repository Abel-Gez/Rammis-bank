"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Media & News", href: "/news" },
    { name: "Vacancy", href: "/vacancy" },
    { name: "Contact Us", href: "/contact" },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image src="/rammis-bank-logo.jpg" alt="Rammis Bank Logo" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row ">
                <span className="text-xs text-blue-600">Baankii Raammis</span>
                <span className="text-xs text-blue-600">ራሚስ ባንክ</span>
                </div>
              <span className="text-xl font-bold text-blue-900">Rammis Bank</span>
              <span className="text-xs text-blue-600">Flow to the highest!</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent" asChild>
              <Link href="/register">Register</Link>
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800 text-white" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  asChild
                >
                  <Link href="/register">Register</Link>
                </Button>
                <Button className="bg-blue-900 hover:bg-blue-800 text-white" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
