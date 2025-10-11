// app/dashboard/layout.tsx
import { ReactNode } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { UserProvider } from "@/context/UserContext"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar" 

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ProtectedRoute requiredRoles={["ADMIN", "staff", "SUPERADMIN", "HR", "MARKETING"]}>
        <div className="min-h-screen bg-gray-50">
          <DashboardHeader />
          <div className="flex">
            <DashboardSidebar />
            <main className="flex-1 p-8">{children}</main>
          </div>
        </div>
      </ProtectedRoute>
    </UserProvider>
  )
}
