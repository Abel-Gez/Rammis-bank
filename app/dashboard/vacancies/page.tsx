"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { apiFetch } from "@/lib/api"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Briefcase, MapPin, Layers } from "lucide-react"

type Vacancy = {
  id: number
  title: string
  location: string
  department: string
  employment_type: string
  is_active: boolean
}

export default function VacancyListPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVacancies() {
      try {
        const res = await apiFetch("/vacancies/")
        if (res.ok) {
          const data = await res.json()
          setVacancies(data)
        } else {
          console.error("Failed to fetch vacancies", res.status)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchVacancies()
  }, [])

  if (loading) return <p className="p-10 text-center">Loading vacancies...</p>

  return (
    <ProtectedRoute requiredRoles={["HR", "SUPERADMIN"]}>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-rammisBlue">Vacancy Management</h1>
            <Button asChild className="bg-rammisBlue hover:bg-rammisBlue/90 text-white">
              <Link href="/dashboard/vacancies/create">+ Post New Vacancy</Link>
            </Button>
          </div>

          {vacancies.length === 0 ? (
            <p className="text-center text-gray-600">No vacancies found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vacancies.map((vacancy) => (
                <Card
                  key={vacancy.id}
                  className={`border ${
                    vacancy.is_active ? "border-green-200" : "border-gray-200"
                  } hover:shadow-md transition-shadow`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{vacancy.title}</span>
                      {vacancy.is_active ? (
                        <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          Closed
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-1 text-gray-600 mb-4">
                      <p className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-rammisBlue" />
                        {vacancy.location}
                      </p>
                      <p className="flex items-center gap-1">
                        <Layers className="w-4 h-4 text-rammisBlue" />
                        {vacancy.department || "—"}
                      </p>
                      <p className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-rammisBlue" />
                        {vacancy.employment_type}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        asChild
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Link href={`/dashboard/vacancies/${vacancy.id}/edit`}>Edit</Link>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={async () => {
                          if (!confirm("Are you sure you want to delete this vacancy?")) return
                          try {
                            const res = await apiFetch(`/vacancies/${vacancy.id}/`, {
                              method: "DELETE",
                            })
                            if (res.ok) {
                              setVacancies((prev) => prev.filter((v) => v.id !== vacancy.id))
                            } else {
                              console.error("Failed to delete", res.status)
                            }
                          } catch (err) {
                            console.error(err)
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}