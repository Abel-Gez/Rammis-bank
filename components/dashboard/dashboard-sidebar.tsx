"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Newspaper,
  Briefcase,
  Users,
  FileText,
  Settings,
  BarChart3,
  ClipboardList,
} from "lucide-react"
import { useUser } from "@/context/UserContext"
import { useToast } from "@/hooks/use-toast"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()

  const normalizedRole = (user?.role ?? "").toString().trim().toLowerCase()

  const allNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: null },
    { name: "News Management", href: "/dashboard/blog", icon: Newspaper, roles: ["superadmin", "admin", "marketing", "staff"] },
    { name: "Job Vacancies", href: "/dashboard/vacancies", icon: Briefcase, roles: ["superadmin", "admin", "hr"] },
    { name: "Job Applications", href: "/dashboard/applications", icon: ClipboardList, roles: ["superadmin", "admin", "hr"] },
    { name: "Branch Accounts", href: "/dashboard/branchAdmin", icon: Users, roles: ["superadmin", "admin", "branch_admin"] },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart3, roles: ["superadmin", "admin"] },
    { name: "Content Pages", href: "/dashboard/pages", icon: FileText, roles: ["superadmin", "admin", "marketing", "staff"] },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["superadmin", "admin", "hr", "marketing"] },
  ]

  const navigation = allNavigation.filter((item) => !item.roles || item.roles.includes(normalizedRole))

  const protectedPrefixes: Record<string, string[]> = {
    vacancies: ["superadmin", "admin", "hr"],
    applications: ["superadmin", "admin", "hr"],
    branchAdmin: ["superadmin", "admin", "branch_admin"],
  }

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-border">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
            const permissionKey = Object.entries(protectedPrefixes).find(([key, roles]) =>
              item.href.startsWith(`/dashboard/${key}`) && !roles.includes(normalizedRole),
            )

            if (permissionKey) {
              event.preventDefault()
              toast({
                title: "Access denied",
                description: "You do not have permission to view this section.",
                variant: "destructive",
              })
              router.push("/dashboard")
            }
          }

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
              onClick={handleClick}
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
