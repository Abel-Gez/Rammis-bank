"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { apiFetch } from "@/lib/api"

type EmployerEntry = {
  employer: string
  role: string
  length: string
}

const emptyEmployer: EmployerEntry = { employer: "", role: "", length: "" }

export default function JobApplicationPage() {
  const router = useRouter()
  const params = useParams()
  const vacancyIdParam = params?.vacancyId
  const vacancyId = useMemo(() => (Array.isArray(vacancyIdParam) ? vacancyIdParam[0] : vacancyIdParam), [vacancyIdParam])
  const { toast } = useToast()

  const [vacancyTitle, setVacancyTitle] = useState("")
  const [fullName, setFullName] = useState("")
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [residence, setResidence] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [additionalMobileNumber, setAdditionalMobileNumber] = useState("")
  const [email, setEmail] = useState("")
  const [locationApplied, setLocationApplied] = useState("")
  const [currentEmploymentStatus, setCurrentEmploymentStatus] = useState("")
  const [currentEmployer, setCurrentEmployer] = useState("")
  const [currentRole, setCurrentRole] = useState("")
  const [currentBasicSalary, setCurrentBasicSalary] = useState("")
  const [educationDetails, setEducationDetails] = useState("")
  const [previousEmployers, setPreviousEmployers] = useState<EmployerEntry[]>([emptyEmployer])
  const [totalBankingExperience, setTotalBankingExperience] = useState("")
  const [totalNonBankingExperience, setTotalNonBankingExperience] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchVacancy = async () => {
      if (!vacancyId) return
      try {
        const res = await apiFetch(`/vacancies/${vacancyId}/`)
        if (!res.ok) throw new Error("Failed to fetch vacancy")
        const data = await res.json()
        setVacancyTitle(data.title || "")
      } catch (err) {
        console.error(err)
        toast({
          variant: "destructive",
          title: "Could not load vacancy",
          description: "Please refresh the page or try again later.",
        })
      }
    }

    fetchVacancy()
  }, [vacancyId, toast])

  const handleAddEmployer = () => {
    setPreviousEmployers((prev) => [...prev, { ...emptyEmployer }])
  }

  const handleRemoveEmployer = (index: number) => {
    setPreviousEmployers((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleEmployerChange = (index: number, field: keyof EmployerEntry, value: string) => {
    setPreviousEmployers((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const resetForm = () => {
    setFullName("")
    setGender("male")
    setAge("")
    setResidence("")
    setMobileNumber("")
    setAdditionalMobileNumber("")
    setEmail("")
    setLocationApplied("")
    setCurrentEmploymentStatus("")
    setCurrentEmployer("")
    setCurrentRole("")
    setCurrentBasicSalary("")
    setEducationDetails("")
    setPreviousEmployers([emptyEmployer])
    setTotalBankingExperience("")
    setTotalNonBankingExperience("")
    setFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast({
        variant: "destructive",
        title: "Attachment required",
        description: "Please attach your CV or supporting document before submitting.",
      })
      return
    }

    if (!locationApplied.trim()) {
      toast({
        variant: "destructive",
        title: "Preferred location missing",
        description: "Let us know which branch or city you prefer to work in.",
      })
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("full_name", fullName)
      formData.append("gender", gender)
      formData.append("age", age)
      formData.append("residence", residence)
      formData.append("mobile_number", mobileNumber)
      formData.append("position_applied", vacancyTitle)
      formData.append("location_applied", locationApplied)
      formData.append("file_attachment", file)

      if (email) formData.append("email", email)
      if (additionalMobileNumber) formData.append("additional_mobile_number", additionalMobileNumber)
      if (currentEmploymentStatus) formData.append("current_employment_status", currentEmploymentStatus)
      if (currentEmployer) formData.append("current_employer", currentEmployer)
      if (currentRole) formData.append("current_role", currentRole)
      if (currentBasicSalary) formData.append("current_basic_salary", currentBasicSalary)

      if (educationDetails.trim()) {
        const entries = educationDetails
          .split("\n")
          .map((entry) => entry.trim())
          .filter(Boolean)
        if (entries.length) {
          formData.append("education_details", JSON.stringify(entries))
        }
      }

      const cleanedEmployers = previousEmployers.filter(
        (entry) => entry.employer.trim() || entry.role.trim() || entry.length.trim(),
      )

      if (cleanedEmployers.length) {
        formData.append(
          "previous_employers",
          JSON.stringify(cleanedEmployers.map((entry) => entry.employer.trim())),
        )
        formData.append(
          "roles_previous_employers",
          JSON.stringify(cleanedEmployers.map((entry) => entry.role.trim())),
        )
        formData.append(
          "length_service_previous",
          JSON.stringify(cleanedEmployers.map((entry) => entry.length.trim())),
        )
      }

      if (totalBankingExperience) formData.append("total_banking_experience", totalBankingExperience)
      if (totalNonBankingExperience) formData.append("total_non_banking_experience", totalNonBankingExperience)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vacancy-applications/`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to submit application")

      toast({
        title: "Application submitted",
        description: "Thank you for applying. Our HR team will contact you soon.",
      })

      resetForm()
      router.push("/jobs")
    } catch (err) {
      console.error(err)
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "We couldn't submit your application. Please try again shortly.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rammisBlue/5 via-white to-rammisLightBlue/10">
      <Header />
      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-rammisBlue text-white px-4 py-2">Job Application</Badge>
            <h1 className="mt-4 text-4xl font-bold text-rammisBlue">Apply for {vacancyTitle || "Rammis Bank"}</h1>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Share your credentials and experience to join our growing team. Please provide accurate details and attach your
              latest resume.
            </p>
            <p className="mt-2 text-sm text-rammisBlue/70">
              Prefer a different opportunity? <Link href="/jobs" className="underline">Browse all vacancies</Link>
            </p>
          </div>

          <Card className="shadow-xl border border-rammisBlue/10">
            <CardHeader className="bg-rammisBlue/5 border-b border-rammisBlue/10">
              <CardTitle className="text-rammisBlue text-2xl">Candidate Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-10 py-8">
              <form onSubmit={handleSubmit} className="space-y-10">
                <section className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-rammisBlue font-semibold">
                        Full Name <span className="text-rammisRed">*</span>
                      </Label>
                      <Input
                        id="full_name"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-rammisBlue font-semibold">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Optional email for communication"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-rammisBlue font-semibold">
                        Gender <span className="text-rammisRed">*</span>
                      </Label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full rounded-md border border-rammisBlue/20 bg-white px-3 py-2 text-sm shadow-sm focus:border-rammisBlue focus:outline-none focus:ring-2 focus:ring-rammisBlue/40"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other / Prefer not to say</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-rammisBlue font-semibold">
                        Age <span className="text-rammisRed">*</span>
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        min={18}
                        placeholder="Enter your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="residence" className="text-rammisBlue font-semibold">
                        Residence <span className="text-rammisRed">*</span>
                      </Label>
                      <Input
                        id="residence"
                        placeholder="City or town you live in"
                        value={residence}
                        onChange={(e) => setResidence(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="mobile_number" className="text-rammisBlue font-semibold">
                        Mobile Number <span className="text-rammisRed">*</span>
                      </Label>
                      <Input
                        id="mobile_number"
                        placeholder="Primary contact number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additional_mobile_number" className="text-rammisBlue font-semibold">
                        Additional Mobile Number
                      </Label>
                      <Input
                        id="additional_mobile_number"
                        placeholder="Secondary contact number"
                        value={additionalMobileNumber}
                        onChange={(e) => setAdditionalMobileNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                <Separator className="bg-rammisBlue/10" />

                <section className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="position_applied" className="text-rammisBlue font-semibold">
                        Position Applied <span className="text-rammisRed">*</span>
                      </Label>
                      <Input id="position_applied" value={vacancyTitle} readOnly className="bg-slate-100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location_applied" className="text-rammisBlue font-semibold">
                        Preferred Work Location <span className="text-rammisRed">*</span>
                      </Label>
                      <Input
                        id="location_applied"
                        placeholder="City or branch name"
                        value={locationApplied}
                        onChange={(e) => setLocationApplied(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current_employment_status" className="text-rammisBlue font-semibold">
                        Current Employment Status
                      </Label>
                      <Input
                        id="current_employment_status"
                        placeholder="Employed, Self-employed, Student, etc."
                        value={currentEmploymentStatus}
                        onChange={(e) => setCurrentEmploymentStatus(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current_basic_salary" className="text-rammisBlue font-semibold">
                        Current Monthly Salary (ETB)
                      </Label>
                      <Input
                        id="current_basic_salary"
                        type="number"
                        min={0}
                        placeholder="Optional"
                        value={currentBasicSalary}
                        onChange={(e) => setCurrentBasicSalary(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current_employer" className="text-rammisBlue font-semibold">
                        Current Employer
                      </Label>
                      <Input
                        id="current_employer"
                        placeholder="Where do you currently work?"
                        value={currentEmployer}
                        onChange={(e) => setCurrentEmployer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current_role" className="text-rammisBlue font-semibold">
                        Current Role / Title
                      </Label>
                      <Input
                        id="current_role"
                        placeholder="What is your position?"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                <Separator className="bg-rammisBlue/10" />

                <section className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="education_details" className="text-rammisBlue font-semibold">
                      Education Details
                    </Label>
                    <Textarea
                      id="education_details"
                      placeholder="List your academic qualifications, one per line."
                      value={educationDetails}
                      onChange={(e) => setEducationDetails(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <Label className="text-rammisBlue font-semibold">Previous Employment</Label>
                        <p className="text-sm text-rammisBlue/70">Add your most recent employers, roles, and duration of service.</p>
                      </div>
                      <Button type="button" variant="outline" onClick={handleAddEmployer} className="border-rammisBlue text-rammisBlue">
                        Add Employer
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {previousEmployers.map((entry, index) => (
                        <div
                          key={index}
                          className="grid gap-4 rounded-lg border border-rammisBlue/10 bg-white/80 p-4 shadow-sm md:grid-cols-3"
                        >
                          <div className="space-y-2">
                            <Label className="text-sm text-rammisBlue" htmlFor={`employer-${index}`}>
                              Employer
                            </Label>
                            <Input
                              id={`employer-${index}`}
                              placeholder="Company name"
                              value={entry.employer}
                              onChange={(e) => handleEmployerChange(index, "employer", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-rammisBlue" htmlFor={`role-${index}`}>
                              Role
                            </Label>
                            <Input
                              id={`role-${index}`}
                              placeholder="Position held"
                              value={entry.role}
                              onChange={(e) => handleEmployerChange(index, "role", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-rammisBlue" htmlFor={`length-${index}`}>
                              Length of Service
                            </Label>
                            <Input
                              id={`length-${index}`}
                              placeholder="e.g. 2 years"
                              value={entry.length}
                              onChange={(e) => handleEmployerChange(index, "length", e.target.value)}
                            />
                          </div>
                          {previousEmployers.length > 1 ? (
                            <div className="md:col-span-3 flex justify-end">
                              <Button
                                type="button"
                                variant="ghost"
                                className="text-rammisRed hover:text-rammisRed/80"
                                onClick={() => handleRemoveEmployer(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="total_banking_experience" className="text-rammisBlue font-semibold">
                        Total Banking Experience (years)
                      </Label>
                      <Input
                        id="total_banking_experience"
                        type="number"
                        min={0}
                        placeholder="Years in banking"
                        value={totalBankingExperience}
                        onChange={(e) => setTotalBankingExperience(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total_non_banking_experience" className="text-rammisBlue font-semibold">
                        Total Non-Banking Experience (years)
                      </Label>
                      <Input
                        id="total_non_banking_experience"
                        type="number"
                        min={0}
                        placeholder="Years in other industries"
                        value={totalNonBankingExperience}
                        onChange={(e) => setTotalNonBankingExperience(e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                <Separator className="bg-rammisBlue/10" />

                <section className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file_attachment" className="text-rammisBlue font-semibold">
                      Attach Resume <span className="text-rammisRed">*</span>
                    </Label>
                    <input
                      id="file_attachment"
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required
                      className="block w-full rounded-md border border-rammisBlue/20 bg-white px-3 py-2 text-sm shadow-sm focus:border-rammisBlue focus:outline-none focus:ring-2 focus:ring-rammisBlue/40"
                    />
                    <p className="text-xs text-rammisBlue/60">Accepted formats: PDF, DOC, DOCX. Max size 5MB.</p>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-rammisBlue/70">
                      By submitting, you confirm that the information provided is accurate and complete to the best of your knowledge.
                    </p>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-rammisBlue hover:bg-rammisBlue/90 text-white px-6"
                    >
                      {loading ? "Submitting Application..." : "Submit Application"}
                    </Button>
                  </div>
                </section>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
