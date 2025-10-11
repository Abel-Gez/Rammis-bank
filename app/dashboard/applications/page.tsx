"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/api"

interface VacancySummary {
  id: number
  title: string
  department?: string
  employment_type?: string
  is_active?: boolean
  applications_count?: number
}

export default function ApplicationsDashboardPage() {
  const [vacancies, setVacancies] = useState<VacancySummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadVacancies = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFetch("/vacancies/")
      if (!res.ok) throw new Error("Failed to load vacancies")
      const data = await res.json()
      setVacancies(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVacancies()
  }, [])

  if (loading) {
    return <p className="py-10 text-center text-gray-500">Loading vacancies...</p>
  }

  if (error) {
    return (
      <div className="py-10 text-center space-y-4">
        <p className="text-gray-600">{error}</p>
        <Button className="bg-rammisBlue hover:bg-rammisBlue/90" onClick={loadVacancies}>
          Retry
        </Button>
      </div>
    )
  }

  if (vacancies.length === 0) {
    return <p className="py-10 text-center text-gray-500">No vacancies available yet.</p>
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-rammisBlue">Applications Dashboard</h1>
          <p className="text-gray-600">Select a vacancy to review its submitted applications.</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-rammisBlue border-rammisBlue/20">
          {vacancies.length} vacancies
        </Badge>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vacancies.map((vacancy) => (
          <Card key={vacancy.id} className="border border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-rammisBlue">{vacancy.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {vacancy.department || "Department not specified"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Employment Type:</span> {vacancy.employment_type || "—"}
              </p>
              <p>
                <span className="font-medium text-gray-700">Status:</span> {vacancy.is_active ? "Active" : "Closed"}
              </p>
              <p>
                <span className="font-medium text-gray-700">Applications:</span> {vacancy.applications_count ?? "—"}
              </p>
              <Button asChild className="w-full bg-rammisBlue hover:bg-rammisBlue/90 text-white">
                <Link href={`/dashboard/vacancies/${vacancy.id}/applications`}>
                  View Applications
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
