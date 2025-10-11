"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useUser } from "@/context/UserContext"
import { apiFetch } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, ClipboardList, FileText, Megaphone, ShieldCheck, Users } from "lucide-react"

type Vacancy = {
  id: number
  title: string
  department: string
  location: string
  status: string
  posted_at: string
}

type QuickAction = {
  title: string
  description: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  roles?: string[]
}

export default function DashboardHomePage() {
  const { user, loading: userLoading } = useUser()
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loadingVacancies, setLoadingVacancies] = useState(false)

  const normalizedRole = useMemo(
    () => (user?.role ?? "").toString().trim().toLowerCase(),
    [user],
  )

  const displayName = user?.username || "Team Member"
  const isSuperAdmin = normalizedRole === "superadmin"
  const isAdmin = normalizedRole === "admin"
  const isBranchAdmin = normalizedRole === "branch_admin"
  const canManageVacancies = ["superadmin", "admin", "hr"].includes(normalizedRole)

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoadingVacancies(true)
      try {
        const res = await apiFetch("/vacancies/")
        if (!res.ok) {
          console.error("Failed to fetch vacancies:", res.status)
          return
        }
        const data = await res.json()
        setVacancies(data)
      } catch (error) {
        console.error("Vacancy fetch error:", error)
      } finally {
        setLoadingVacancies(false)
      }
    }

    if (canManageVacancies) {
      fetchVacancies()
    }
  }, [canManageVacancies])

  const quickActions: QuickAction[] = useMemo(
    () => [
      {
        title: "Manage Job Vacancies",
        description: "Post new openings and review current listings.",
        href: "/dashboard/vacancies",
        icon: Briefcase,
        roles: ["superadmin", "admin", "hr"],
      },
      {
        title: "Review Customer Accounts",
        description: "Track customer onboarding and approvals.",
        href: "/dashboard/branchAdmin",
        icon: Users,
        roles: ["superadmin", "admin", "branch_admin"],
      },
      {
        title: "Manage News & Updates",
        description: "Publish announcements for customers and staff.",
        href: "/dashboard/blog",
        icon: Megaphone,
        roles: ["superadmin", "admin", "marketing"],
      },
      {
        title: "Review Job Applications",
        description: "Screen applicants and manage interview stages.",
        href: "/dashboard/applications",
        icon: ClipboardList,
        roles: ["superadmin", "admin", "hr"],
      },
      {
        title: "Manage Content Pages",
        description: "Update website pages and marketing assets.",
        href: "/dashboard/pages",
        icon: FileText,
        roles: ["superadmin", "admin", "marketing"],
      },
      {
        title: "Compliance & Policies",
        description: "Review internal policies and governance updates.",
        href: "/dashboard/reports",
        icon: ShieldCheck,
        roles: ["superadmin", "admin"],
      },
    ],
    [],
  )

  const availableActions = quickActions.filter(
    (action) => !action.roles || action.roles.includes(normalizedRole),
  )

  if (userLoading) {
    return <div className="p-8 text-center text-gray-600">Loading dashboard...</div>
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-rammisBlue/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-rammisBlue">Welcome back, {displayName}</CardTitle>
            <CardDescription>
              Here is a quick overview of the tools and updates available to your role.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-rammisBlue/10 bg-rammisBlue/5 p-4">
              <p className="text-sm text-rammisBlue/70">Current role</p>
              <p className="text-lg font-semibold text-rammisBlue">
                {normalizedRole ? normalizedRole.replace("_", " ") : "team member"}
              </p>
            </div>
            <div className="rounded-lg border border-rammisBlue/10 bg-rammisLightBlue/5 p-4">
              <p className="text-sm text-rammisBlue/70">Need help?</p>
              <p className="text-sm text-slate-600">
              </p>
            </div>
          </CardContent>
        </Card>

        {(isSuperAdmin || isAdmin) && (
          <Card className="border-rammisBlue/10 bg-gradient-to-br from-rammisLightBlue/20 to-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-rammisBlue">Admin Tools</CardTitle>
              <CardDescription>Manage bank staff and role assignments.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild className="bg-rammisBlue text-white hover:bg-rammisBlue/90">
                <Link href="/dashboard/staff/create">Create Staff Account</Link>
              </Button>
              <Button asChild variant="outline" className="border-rammisBlue/30 text-rammisBlue hover:bg-rammisBlue/10">
                <Link href="/dashboard/roles">Manage Roles & Permissions</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        {isBranchAdmin && (
          <Card className="border-rammisBlue/10 bg-gradient-to-br from-white to-rammisBlue/5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-rammisBlue">Branch Overview</CardTitle>
              <CardDescription>Focus on accounts assigned to your branch.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Use the quick actions below to review applications and monitor branch performance.
            </CardContent>
          </Card>
        )}
      </section>

      {!isBranchAdmin && canManageVacancies && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-rammisBlue">Recent Job Vacancies</h2>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="border-rammisBlue/40 text-rammisBlue">

              </Button>
              <Button asChild className="bg-rammisBlue text-white hover:bg-rammisBlue/90">
                <Link href="/dashboard/vacancies/create">Create Vacancy</Link>
              </Button>
            </div>
          </div>

          <Card className="border border-rammisBlue/10">
            <CardContent className="p-0">
              {loadingVacancies ? (
                <p className="p-6 text-sm text-slate-500">Loading vacancies...</p>
              ) : vacancies.length === 0 ? (
                <p className="p-6 text-sm text-slate-500">No vacancies found.</p>
              ) : (
                <ul className="divide-y divide-rammisBlue/10">
                  {vacancies.slice(0, 5).map((vacancy) => (
                    <li key={vacancy.id} className="flex items-center justify-between gap-4 p-4">
                      <div>
                        <p className="font-medium text-rammisBlue">{vacancy.title}</p>
                        <p className="text-sm text-slate-500">
                          {vacancy.department} • {vacancy.location}
                        </p>
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <p className="capitalize">{vacancy.status}</p>
                        <p>{new Date(vacancy.posted_at).toLocaleDateString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-rammisBlue">Quick Actions</h2>
          <p className="text-sm text-slate-500">Tools highlighted based on your role.</p>
        </div>
        {availableActions.length === 0 ? (
          <Card className="border border-dashed border-rammisBlue/30 bg-white">
            <CardContent className="p-6 text-sm text-slate-500">
              We are preparing tools for your role. Please check back soon or contact a system administrator.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableActions.map((action) => {
              const Icon = action.icon
              return (
                <Card key={action.title} className="border border-rammisBlue/10 hover:-translate-y-0.5 hover:shadow-md transition">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2 text-rammisBlue">
                      <Icon className="h-4 w-4" />
                      <CardTitle className="text-base">{action.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm text-slate-500">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="border-rammisBlue/40 text-rammisBlue hover:bg-rammisBlue/10">
                      <Link href={action.href}>Open</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
