import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { NewsManagement } from "@/components/admin/news-management"

export default function AdminNewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <NewsManagement />
        </main>
      </div>
    </div>
  )
}
