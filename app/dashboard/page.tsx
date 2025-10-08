"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { apiFetch } from "@/lib/api"

type Vacancy = {
  id: number
  title: string
  department: string
  location: string
  status: string
  created_at: string
}

export default function VacancyDashboardPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)

  const fetchVacancies = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("accessToken")
      const res = await apiFetch("/vacancies/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        setVacancies(data)
      } else {
        console.error("Failed to fetch vacancies")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVacancies()
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-rammisBlue">Job Vacancies</h1>
        <Button asChild className="bg-rammisBlue hover:bg-rammisBlue/90 text-white">
          <Link href="/dashboard/vacancies/create">Create Vacancy</Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading vacancies...</p>
      ) : vacancies.length === 0 ? (
        <p>No vacancies found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left">Title</th>
                <th className="px-4 py-2 border-b text-left">Department</th>
                <th className="px-4 py-2 border-b text-left">Location</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
                <th className="px-4 py-2 border-b text-left">Created At</th>
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((vacancy) => (
                <tr key={vacancy.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{vacancy.title}</td>
                  <td className="px-4 py-2 border-b">{vacancy.department}</td>
                  <td className="px-4 py-2 border-b">{vacancy.location}</td>
                  <td className="px-4 py-2 border-b">{vacancy.status}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(vacancy.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/dashboard/vacancies/${vacancy.id}/edit`}>Edit</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        const confirmDelete = confirm(
                          "Are you sure you want to delete this vacancy?"
                        )
                        if (!confirmDelete) return

                        const token = localStorage.getItem("accessToken")
                        const res = await apiFetch(`/vacancies/${vacancy.id}/`, {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                        if (res.ok) fetchVacancies()
                        else alert("Failed to delete vacancy.")
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
