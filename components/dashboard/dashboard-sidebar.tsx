"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Newspaper, Briefcase, Users, FileText, Settings, BarChart3 } from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "News Management",
      href: "/dashboard/news",
      icon: Newspaper,
    },
    {
      name: "Job Vacancies",
      href: "/dashboard/vacancies",
      icon: Briefcase,
    },
    {
      name: "Customer Applications",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
    {
      name: "Content Pages",
      href: "/dashboard/pages",
      icon: FileText,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-border">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-rammisLightBlue/40 text-rammisBlue"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
