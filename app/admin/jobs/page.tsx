import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { JobsManagement } from "@/components/admin/jobs-management"

export default function AdminJobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <JobsManagement />
        </main>
      </div>
    </div>
  )
}
