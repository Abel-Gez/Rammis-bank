import Link from "next/link"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Search, Briefcase, DollarSign } from "lucide-react"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

interface Vacancy {
  id: number
  title: string
  description?: string
  location?: string
  department?: string
  employment_type?: string
  salary_range?: string
  application_deadline?: string
  is_active?: boolean
}

async function fetchVacancies(): Promise<Vacancy[]> {
  try {
    const res = await fetch(`${API_BASE}/api/vacancies/`, {
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      console.error("Failed to fetch vacancies", res.status)
      return []
    }

    const data = await res.json()
    if (!Array.isArray(data)) return []

    return data.filter((vacancy: Vacancy) => vacancy?.is_active !== false)
  } catch (error) {
    console.error("Error fetching vacancies", error)
    return []
  }
}

function formatDate(value?: string | null) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const benefits = [
  "Competitive salary and performance bonuses",
  "Comprehensive health insurance",
  "Professional development opportunities",
  "Flexible working arrangements",
  "Annual leave and sick leave",
  "Retirement savings plan",
  "Training and certification support",
  "Career advancement opportunities",
]

export default async function JobsPage() {
  const vacancies = await fetchVacancies()
  const hasVacancies = vacancies.length > 0

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-3 bg-blue-10 border-t border-b border-rammisBlue/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="bg-white relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search job positions..."
                    className="pl-10 h-12 border-rammisBlue/20 focus-visible:ring-rammisBlue/50"
                  />
                </div>
              </div>
              <Select defaultValue="all-departments">
                <SelectTrigger className="bg-white w-full md:w-48 h-12 border-rammisBlue/20 focus:ring-rammisBlue/50">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all-departments">All Departments</SelectItem>
                  <SelectItem value="banking-operations">Banking Operations</SelectItem>
                  <SelectItem value="customer-service">Customer Service</SelectItem>
                  <SelectItem value="information-technology">Information Technology</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="branch-operations">Branch Operations</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-locations">
                <SelectTrigger className="bg-white w-full md:w-48 h-12 border-rammisBlue/20 focus:ring-rammisBlue/50">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                  <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
                  <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!hasVacancies ? (
              <div className="text-center py-20">
                <p className="text-lg text-gray-600">No job openings at the moment. Please check back later.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {vacancies.map((vacancy) => {
                  const deadline = formatDate(vacancy.application_deadline)

                  return (
                    <Card key={vacancy.id} className="bg-white hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <CardTitle className="text-2xl text-rammisBlue">{vacancy.title}</CardTitle>
                              {vacancy.employment_type ? (
                                <Badge className="bg-rammisLightBlue/20 text-rammisBlue border-rammisLightBlue/30">
                                  {vacancy.employment_type}
                                </Badge>
                              ) : null}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-rammisBlue/80">
                              {vacancy.department ? (
                                <div className="flex items-center">
                                  <Briefcase className="w-4 h-4 mr-1" />
                                  {vacancy.department}
                                </div>
                              ) : null}
                              {vacancy.location ? (
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {vacancy.location}
                                </div>
                              ) : null}
                              {vacancy.salary_range ? (
                                <div className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  {vacancy.salary_range}
                                </div>
                              ) : null}
                              {deadline ? (
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {deadline}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <Badge variant="outline" className="text-rammisBlue border-rammisBlue/30">
                              {vacancy.is_active === false ? "Closed" : "Accepting Applications"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <CardDescription className="text-base leading-relaxed text-rammisBlue/90">
                          {vacancy.description || "Details for this position will be provided soon."}
                        </CardDescription>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                          <Button asChild className="bg-rammisBlue hover:bg-rammisBlue/90 text-white">
                            <Link href={`/jobs/apply/${vacancy.id}`}>Apply Now</Link>
                          </Button>
                          <Button variant="outline">Save Job</Button>
                          <Button variant="ghost">Share</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-white border-t border-rammisBlue/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer competitive benefits and a supportive work environment that helps you grow both personally and professionally.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 bg-rammisLightBlue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-2 h-2 bg-rammisBlue rounded-full" />
                    </div>
                    <p className="text-rammisBlue/90 font-medium">{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-gray-400 to-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Ready to Start Your Career?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
                Don't see a position that matches your skills? Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Submit Resume
                </Button>
                <Button
                  size="lg"
                  variant="default"
                  className="bg-rammisBlue hover:bg-rammisBlue/90 hover:shadow-md transition-all duration-200 text-white"
                >
                  Contact HR
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
