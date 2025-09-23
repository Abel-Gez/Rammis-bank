import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Users, Calendar, Search, Briefcase, GraduationCap, DollarSign } from "lucide-react"

export default function VacancyPage() {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Islamic Banking Specialist",
      department: "Banking Operations",
      location: "Addis Ababa",
      type: "Full-time",
      experience: "5+ years",
      education: "Bachelor's degree in Finance or related field",
      salary: "Competitive",
      deadline: "2024-02-15",
      description:
        "We are seeking an experienced Islamic Banking Specialist to join our growing team. The ideal candidate will have deep knowledge of Sharia principles and Islamic banking products.",
      requirements: [
        "Bachelor's degree in Finance, Economics, or Islamic Studies",
        "Minimum 5 years experience in Islamic banking",
        "Strong knowledge of Sharia principles and Islamic finance",
        "Excellent communication skills in Amharic and English",
        "Professional certification in Islamic banking preferred",
      ],
      responsibilities: [
        "Develop and manage Islamic banking products",
        "Ensure all products comply with Sharia principles",
        "Provide expert advice to customers on Islamic finance",
        "Train and mentor junior staff members",
        "Collaborate with Sharia board on product development",
      ],
      applications: 45,
      status: "active",
    },
    {
      id: 2,
      title: "Customer Service Representative",
      department: "Customer Service",
      location: "Addis Ababa",
      type: "Full-time",
      experience: "2+ years",
      education: "High school diploma or equivalent",
      salary: "15,000 - 20,000 ETB",
      deadline: "2024-02-10",
      description:
        "Join our customer service team to provide exceptional support to our valued customers. We're looking for friendly, professional individuals who are passionate about helping others.",
      requirements: [
        "High school diploma or equivalent",
        "Minimum 2 years customer service experience",
        "Excellent communication skills",
        "Fluency in Amharic and English",
        "Basic computer skills",
      ],
      responsibilities: [
        "Handle customer inquiries via phone, email, and in-person",
        "Process account opening and maintenance requests",
        "Resolve customer complaints and issues",
        "Maintain accurate customer records",
        "Cross-sell bank products and services",
      ],
      applications: 78,
      status: "active",
    },
    {
      id: 3,
      title: "IT Support Technician",
      department: "Information Technology",
      location: "Addis Ababa",
      type: "Full-time",
      experience: "3+ years",
      education: "Bachelor's degree in IT or Computer Science",
      salary: "25,000 - 30,000 ETB",
      deadline: "2024-02-20",
      description:
        "We need a skilled IT Support Technician to maintain our banking systems and provide technical support to our staff and customers.",
      requirements: [
        "Bachelor's degree in Information Technology or Computer Science",
        "Minimum 3 years IT support experience",
        "Knowledge of banking systems preferred",
        "Strong troubleshooting skills",
        "Relevant IT certifications preferred",
      ],
      responsibilities: [
        "Maintain and troubleshoot IT infrastructure",
        "Provide technical support to staff and customers",
        "Ensure system security and data protection",
        "Install and configure software and hardware",
        "Document technical procedures and solutions",
      ],
      applications: 23,
      status: "active",
    },
    {
      id: 4,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Addis Ababa",
      type: "Full-time",
      experience: "3+ years",
      education: "Bachelor's degree in Marketing or related field",
      salary: "20,000 - 25,000 ETB",
      deadline: "2024-02-25",
      description:
        "We're looking for a creative Marketing Coordinator to help promote our Islamic banking services and build brand awareness in the Ethiopian market.",
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "Minimum 3 years marketing experience",
        "Experience with digital marketing and social media",
        "Strong creative and analytical skills",
        "Knowledge of Islamic banking principles preferred",
      ],
      responsibilities: [
        "Develop and execute marketing campaigns",
        "Manage social media accounts and content",
        "Coordinate promotional events and activities",
        "Analyze marketing performance and ROI",
        "Collaborate with design team on marketing materials",
      ],
      applications: 34,
      status: "active",
    },
    {
      id: 5,
      title: "Branch Manager",
      department: "Branch Operations",
      location: "Bahir Dar",
      type: "Full-time",
      experience: "7+ years",
      education: "Bachelor's degree in Business Administration",
      salary: "Competitive",
      deadline: "2024-03-01",
      description:
        "We are seeking an experienced Branch Manager to lead our new branch in Bahir Dar. The ideal candidate will have strong leadership skills and banking experience.",
      requirements: [
        "Bachelor's degree in Business Administration or related field",
        "Minimum 7 years banking experience with 3+ years in management",
        "Strong leadership and team management skills",
        "Knowledge of Islamic banking principles",
        "Excellent communication and interpersonal skills",
      ],
      responsibilities: [
        "Manage all branch operations and staff",
        "Ensure compliance with banking regulations",
        "Drive business growth and customer acquisition",
        "Maintain high standards of customer service",
        "Prepare and present branch performance reports",
      ],
      applications: 12,
      status: "active",
    },
  ]

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2">Career Opportunities</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 text-balance">Join Our Growing Team</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Build your career with Ethiopia's leading Islamic bank. We offer exciting opportunities for
                professionals who share our commitment to ethical banking and community service.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="Search job positions..." className="pl-10 h-12" />
                </div>
              </div>
              <Select defaultValue="all-departments">
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-departments">All Departments</SelectItem>
                  <SelectItem value="banking-operations">Banking Operations</SelectItem>
                  <SelectItem value="customer-service">Customer Service</SelectItem>
                  <SelectItem value="information-technology">Information Technology</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="branch-operations">Branch Operations</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-locations">
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                  <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
                  <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <CardTitle className="text-2xl text-gray-900">{job.title}</CardTitle>
                          <Badge className="bg-emerald-100 text-emerald-800">{job.status}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-1" />
                            {job.experience}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {job.applications} applications
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <CardDescription className="text-base leading-relaxed">{job.description}</CardDescription>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">Apply Now</Button>
                        <Button variant="outline">Save Job</Button>
                        <Button variant="ghost">Share</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer competitive benefits and a supportive work environment that helps you grow both personally and
                professionally.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    </div>
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-emerald-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to Start Your Career?</h2>
              <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                Don't see a position that matches your skills? Send us your resume and we'll keep you in mind for future
                opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Submit Resume
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent"
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
