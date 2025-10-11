"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { apiFetch } from "@/lib/api"
import { useUser } from "@/context/UserContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AccountCard } from "@/components/bank_account/AccountCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface AccountApplication {
  id: number
  full_name: string
  mother_name: string
  phone: string
  branch: { id: number; name: string } | null
  account_type: string
  monthly_income: string
  gender: string
  nationality: string
  fayda_number: string
  national_id_file?: string
  status: "pending" | "approved" | "rejected" | string
  created_at: string
  updated_at: string
}

type StatusFilter = "all" | "pending" | "approved" | "rejected"

export default function BranchAdminDashboard() {
  const { user, loading: userLoading } = useUser()

  const [applications, setApplications] = useState<AccountApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null)
  const [branches, setBranches] = useState<{ id: number; name: string }[]>([])
  const [branchesLoading, setBranchesLoading] = useState(false)
  const [branchesError, setBranchesError] = useState<string | null>(null)

  const normalizedRole = useMemo(() => (user?.role ?? "").toString().toLowerCase(), [user])
  const isAuthorized = useMemo(
    () => ["branch_admin", "admin", "superadmin"].includes(normalizedRole),
    [normalizedRole],
  )

  const branchId = useMemo(() => {
    if (!user) return null
    const nestedBranch = (user as any)?.branch
    if (nestedBranch?.id) return Number(nestedBranch.id)
    if ((user as any)?.branch_id) return Number((user as any).branch_id)
    return null
  }, [user])

  const effectiveBranchId = selectedBranchId ?? branchId ?? null

  useEffect(() => {
    if (branchId && selectedBranchId === null) {
      setSelectedBranchId(branchId)
    }
  }, [branchId, selectedBranchId])

  const loadBranches = useCallback(async () => {
    setBranchesLoading(true)
    setBranchesError(null)
    try {
      const res = await apiFetch("/v1/branches/")
      if (!res.ok) {
        throw new Error(`Failed to load branches (${res.status})`)
      }
      const data: { id: number; name: string }[] = await res.json()
      setBranches(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error("BranchAdminDashboard: loadBranches", err)
      setBranchesError(err?.message || "Unable to load branches.")
    } finally {
      setBranchesLoading(false)
    }
  }, [])

  const loadApplications = useCallback(async () => {
    if (!user || !isAuthorized) return
    const targetBranchId = selectedBranchId ?? branchId ?? null
    try {
      setLoading(true)
      setError(null)

      const query = targetBranchId ? `?branch=${targetBranchId}` : ""
      const res = await apiFetch(`/v1/accounts/${query}`)

      if (!res.ok) {
        throw new Error(`Failed to load applications (${res.status})`)
      }

      const data: AccountApplication[] = await res.json()
      const scoped = targetBranchId
        ? data.filter((item) => Number(item.branch?.id) === targetBranchId)
        : data
      setApplications(scoped)
    } catch (err: any) {
      console.error("BranchAdminDashboard: loadApplications", err)
      setError(err?.message || "Unable to load applications.")
    } finally {
      setLoading(false)
    }
  }, [branchId, isAuthorized, selectedBranchId, user])

  useEffect(() => {
    if (!userLoading && user && isAuthorized) {
      loadApplications()
    }
  }, [user, userLoading, isAuthorized, loadApplications])

  useEffect(() => {
    if (!userLoading && user && isAuthorized && (normalizedRole !== "branch_admin" || !branchId)) {
      loadBranches()
    }
  }, [userLoading, user, isAuthorized, normalizedRole, branchId, loadBranches])

  useEffect(() => {
    if (!userLoading && user && !isAuthorized) {
      setLoading(false)
      setError("You do not have permission to view the branch admin dashboard.")
    }
  }, [user, userLoading, isAuthorized])

  const resolvedBranchName = useMemo(() => {
    if (user?.branch?.name) return user.branch.name
    if (branches.length > 0 && effectiveBranchId) {
      return branches.find((branch) => Number(branch.id) === effectiveBranchId)?.name || "Selected Branch"
    }
    if (effectiveBranchId) return `Branch #${effectiveBranchId}`
    return "Unknown"
  }, [branches, effectiveBranchId, user])

  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        if (statusFilter === "all") return true
        return app.status.toLowerCase() === statusFilter
      })
      .filter((app) => {
        if (!searchTerm) return true
        const haystack = `${app.full_name} ${app.phone} ${app.account_type}`.toLowerCase()
        return haystack.includes(searchTerm.toLowerCase())
      })
  }, [applications, statusFilter, searchTerm])

  const summary = useMemo(() => {
    const base = { total: applications.length, pending: 0, approved: 0, rejected: 0 }
    applications.forEach((app) => {
      const status = app.status?.toLowerCase()
      if (status === "approved") base.approved += 1
      else if (status === "rejected") base.rejected += 1
      else base.pending += 1
    })
    return base
  }, [applications])

  if (userLoading || loading) {
    return <div className="p-10 text-center text-gray-600">Loading dashboard...</div>
  }

  if (!user) {
    return null
  }

  if (!isAuthorized) {
    return (
      <div className="p-10 text-center text-rammisBlue">
        <h2 className="text-2xl font-semibold">Access Restricted</h2>
        <p className="mt-3 text-slate-600">Your account does not have permission to manage branch applications.</p>
        <Button className="mt-6" asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    )
  }

  if (!effectiveBranchId) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-rammisBlue/10 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-rammisBlue">Select a Branch</h2>
          <p className="mt-2 text-sm text-slate-600">
            This branch admin account is not currently linked to a branch. Choose a branch to continue.
          </p>

          <div className="mt-6">
            {branchesLoading ? (
              <p className="text-sm text-slate-500">Loading branches...</p>
            ) : branchesError ? (
              <p className="text-sm text-red-500">{branchesError}</p>
            ) : branches.length > 0 ? (
              <Select
                value={selectedBranchId?.toString() ?? ""}
                onValueChange={(value) => setSelectedBranchId(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-slate-500">No branches available. Contact the system administrator.</p>
            )}
          </div>

          <Button
            className="mt-6 w-full bg-rammisBlue text-white hover:bg-rammisBlue/90"
            onClick={loadApplications}
            disabled={!selectedBranchId}
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-rammisBlue/60">Branch Admin</p>
            <h1 className="mt-2 text-3xl font-bold text-rammisBlue">Account Applications</h1>
            <p className="text-sm text-slate-500">
              Managing new accounts for branch: <span className="font-semibold text-rammisBlue">{resolvedBranchName}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {(normalizedRole !== "branch_admin" || branches.length > 0) && (
              <Select
                value={effectiveBranchId?.toString() ?? ""}
                onValueChange={(value) => setSelectedBranchId(Number(value))}
                disabled={normalizedRole === "branch_admin" && !!branchId}
              >
                <SelectTrigger className="min-w-[220px]">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branchId && normalizedRole === "branch_admin" && user.branch?.name && (
                    <SelectItem value={branchId.toString()}>{user.branch.name}</SelectItem>
                  )}
                  {branches
                    .filter((branch) => branch.id !== branchId)
                    .map((branch) => (
                      <SelectItem key={branch.id} value={branch.id.toString()}>
                        {branch.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
            <Button onClick={loadApplications} className="bg-rammisBlue text-white hover:bg-rammisBlue/90">
              Refresh
            </Button>
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, phone, or account type"
              className="w-full min-w-[240px] sm:w-64"
            />
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-rammisBlue/10 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Total Applications</p>
            <p className="text-2xl font-bold text-rammisBlue">{summary.total}</p>
          </div>
          <div className="rounded-xl border border-rammisBlue/10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Pending</p>
              <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-600">
                {summary.pending}
              </Badge>
            </div>
            <Button
              size="sm"
              variant={statusFilter === "pending" ? "default" : "outline"}
              className="mt-3"
              onClick={() => setStatusFilter("pending")}
            >
              View Pending
            </Button>
          </div>
          <div className="rounded-xl border border-rammisBlue/10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Approved</p>
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-600">
                {summary.approved}
              </Badge>
            </div>
            <Button
              size="sm"
              variant={statusFilter === "approved" ? "default" : "outline"}
              className="mt-3"
              onClick={() => setStatusFilter("approved")}
            >
              View Approved
            </Button>
          </div>
          <div className="rounded-xl border border-rammisBlue/10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Rejected</p>
              <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-600">
                {summary.rejected}
              </Badge>
            </div>
            <Button
              size="sm"
              variant={statusFilter === "rejected" ? "default" : "outline"}
              className="mt-3"
              onClick={() => setStatusFilter("rejected")}
            >
              View Rejected
            </Button>
          </div>
        </section>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "approved" ? "default" : "outline"}
            onClick={() => setStatusFilter("approved")}
          >
            Approved
          </Button>
          <Button
            variant={statusFilter === "rejected" ? "default" : "outline"}
            onClick={() => setStatusFilter("rejected")}
          >
            Rejected
          </Button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {filteredApplications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-rammisBlue/20 bg-white p-12 text-center text-slate-500">
            {applications.length === 0
              ? "No applications have been submitted for your branch yet."
              : "No applications match the current filters."}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredApplications.map((application) => (
              <AccountCard key={application.id} application={application} onRefresh={loadApplications} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
