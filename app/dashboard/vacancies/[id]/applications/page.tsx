"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { apiFetch } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

type Application = {
  id: number
  full_name: string
  email?: string
  mobile_number: string
  position_applied?: string
  current_employment_status?: string
  created_at: string
}

export default function VacancyApplicationsPage() {
  const params = useParams()
  const { id } = params as { id: string }
  const [applications, setApplications] = useState<Application[]>([])
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await apiFetch(`/applications/?vacancy=${id}`)
        if (!res.ok) throw new Error("Failed to fetch applications")
        const data = await res.json()
        setApplications(data)
      } catch (err: any) {
        toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" })
      }
    }
    fetchApplications()
  }, [id, toast])

  const handleDelete = async (appId: number) => {
    if (!confirm("Are you sure you want to delete this application?")) return
    setDeletingId(appId)
    try {
      const res = await apiFetch(`/vacancies/applications/${appId}/`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete application")
      setApplications(applications.filter(a => a.id !== appId))
      toast({ title: "Deleted", description: "Application removed" })
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" })
    } finally {
      setDeletingId(null)
    }
  }

  if (applications.length === 0) {
    return <p className="text-center py-10 text-gray-500">No applications found for this vacancy.</p>
  }

  return (
    <div className="min-h-screen py-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-rammisBlue mb-6">Job Applications</h1>

      <div className="space-y-4">
        {applications.map(a => (
          <Card key={a.id} className="border hover:shadow-md">
            <CardHeader>
              <CardTitle>{a.full_name}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p>Email: {a.email || "-"}</p>
                <p>Mobile: {a.mobile_number}</p>
                <p>Position: {a.position_applied || "-"}</p>
                <p>Current Status: {a.current_employment_status || "-"}</p>
                <p>Applied on: {new Date(a.created_at).toLocaleDateString()}</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDelete(a.id)}
                disabled={deletingId === a.id}
              >
                {deletingId === a.id ? "Deleting..." : "Delete"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
