"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const subMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openSubMenu = (name: string) => {
    if (subMenuTimer.current) {
      clearTimeout(subMenuTimer.current)
      subMenuTimer.current = null
    }
    setActiveSubMenu(name)
  }

  const closeSubMenuWithDelay = () => {
    if (subMenuTimer.current) {
      clearTimeout(subMenuTimer.current)
    }
    subMenuTimer.current = setTimeout(() => {
      setActiveSubMenu(null)
      subMenuTimer.current = null
    }, 180)
  }

  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "/about",
      subMenus: [
        { name: "Company Profile", href: "/about/company-profile" },
        { name: "Organizational Structure", href: "/about/organizational-structure" },
        { name: "Board Directors", href: "/about/board-directors" },
        { name: "Sharia Board", href: "/about/sharia-board" },
        { name: "Executive Management", href: "/about/executive-management" },
      ],
    },
    {
      name: "Services",
      href: "/services",
      subMenus: [
        { name: "Digital Banking", href: "/services/digital-banking" },
        { name: "Retail Banking", href: "/services/retail-banking" },
        { name: "Financing", href: "/services/financing" },
      ],
    },
    {
      name: "Media & News",
      href: "/news",
      subMenus: [
        { name: "News and Press Release", href: "/news/news-and-press-release" },
        { name: "Annual Reports", href: "/news/annual-reports" },
        { name: "International Standards", href: "/news/international-standards" },
        { name: "Gallery", href: "/news/gallery" },
      ],
    },
    { name: "Vacancy", href: "/jobs" },
    { name: "Contact Us", href: "/contact" },
  ]

  const toggleSubMenu = (name: string) => {
    setActiveSubMenu((current) => (current === name ? null : name))
  }

  return (
    <header className="sticky top-0 z-50 border-b border-rammisBlue/15 bg-slate-100/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(29,67,127,0.05)]">
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/60 via-slate-100/30 to-white/60" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(70,156,201,0.18),transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between gap-6 h-20">
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Rammis Bank Logo"
                  width={190}
                  height={72}
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.subMenus && openSubMenu(item.name)}
                  onMouseLeave={closeSubMenuWithDelay}
                >
                  <Link
                    href={item.href}
                    className="group relative flex items-center px-1 py-2 font-semibold tracking-wide text-rammisBlue transition-colors duration-300 hover:text-rammisLightBlue"
                    onClick={() => setActiveSubMenu(null)}
                  >
                    {item.name}
                    {item.subMenus && (
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeSubMenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-rammisBlue via-rammisLightBlue to-rammisBlue transition-all duration-300 group-hover:w-full" />
                  </Link>

                  {item.subMenus && activeSubMenu === item.name && (
                    <div
                      className="absolute left-1/2 z-50 mt-3 w-56 -translate-x-1/2 rounded-xl border border-rammisBlue/10 bg-white/95 p-2 shadow-xl backdrop-blur-lg"
                      onMouseEnter={() => openSubMenu(item.name)}
                      onMouseLeave={closeSubMenuWithDelay}
                    >
                      {item.subMenus.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block rounded-lg px-4 py-2 text-sm text-rammisBlue transition-colors hover:bg-rammisBlue/10"
                          onClick={() => setActiveSubMenu(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden md:flex w-[200px] max-w-xs">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-xl border border-rammisBlue/15 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur placeholder:text-slate-400 focus:border-rammisBlue focus:outline-none focus:ring-2 focus:ring-rammisBlue/30"
                  aria-label="Search site content"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rammisBlue/70"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m2.1-5.4a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z" />
                </svg>
              </div>
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-rammisBlue hover:bg-white/70 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-3 rounded-2xl border border-rammisBlue/10 bg-white/90 backdrop-blur px-4 py-4 shadow-xl">
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex-1 rounded-lg px-3 py-2 text-rammisBlue font-medium hover:bg-rammisBlue/5 transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setActiveSubMenu(null)
                        }}
                      >
                        {item.name}
                      </Link>
                      {item.subMenus && (
                        <button
                          type="button"
                          className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-rammisBlue hover:bg-rammisBlue/5"
                          onClick={() => toggleSubMenu(item.name)}
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              activeSubMenu === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {item.subMenus && activeSubMenu === item.name && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-rammisBlue/15 pl-3">
                        {item.subMenus.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block rounded-lg px-3 py-2 text-sm text-rammisBlue/90 hover:bg-rammisBlue/5"
                            onClick={() => {
                              setIsMenuOpen(false)
                              setActiveSubMenu(null)
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
