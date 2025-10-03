"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Users, Calendar, Search, Filter, MapPin, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface JobPost {
  id: number
  title: string
  department: string
  location: string
  type: "full-time" | "part-time" | "contract"
  experience: string
  description: string
  requirements: string[]
  responsibilities: string[]
  salary: string
  deadline: string
  status: "active" | "closed" | "draft"
  applications: number
  postedDate: string
}

export function JobsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { toast } = useToast()

  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time" as const,
    experience: "",
    description: "",
    requirements: "",
    responsibilities: "",
    salary: "",
    deadline: "",
    status: "draft" as const,
  })

  const [jobPosts, setJobPosts] = useState<JobPost[]>([
    {
      id: 1,
      title: "Senior Islamic Banking Specialist",
      department: "Banking Operations",
      location: "Addis Ababa",
      type: "full-time",
      experience: "5+ years",
      description: "We are seeking an experienced Islamic Banking Specialist to join our team...",
      requirements: [
        "Bachelor's degree in Finance or related field",
        "5+ years Islamic banking experience",
        "Strong knowledge of Sharia principles",
      ],
      responsibilities: ["Develop Islamic banking products", "Ensure Sharia compliance", "Train junior staff"],
      salary: "Competitive",
      deadline: "2024-02-15",
      status: "active",
      applications: 45,
      postedDate: "2024-01-01",
    },
    {
      id: 2,
      title: "Customer Service Representative",
      department: "Customer Service",
      location: "Addis Ababa",
      type: "full-time",
      experience: "2+ years",
      description: "Join our customer service team to provide excellent support to our valued customers...",
      requirements: ["High school diploma", "2+ years customer service experience", "Excellent communication skills"],
      responsibilities: ["Handle customer inquiries", "Process account requests", "Maintain customer records"],
      salary: "15,000 - 20,000 ETB",
      deadline: "2024-02-10",
      status: "active",
      applications: 78,
      postedDate: "2024-01-05",
    },
    {
      id: 3,
      title: "IT Support Technician",
      department: "Information Technology",
      location: "Addis Ababa",
      type: "full-time",
      experience: "3+ years",
      description: "We need a skilled IT Support Technician to maintain our banking systems...",
      requirements: ["Bachelor's degree in IT", "3+ years IT support experience", "Banking system knowledge preferred"],
      responsibilities: ["Maintain IT infrastructure", "Provide technical support", "Ensure system security"],
      salary: "25,000 - 30,000 ETB",
      deadline: "2024-01-30",
      status: "closed",
      applications: 23,
      postedDate: "2023-12-15",
    },
  ])

  const filteredJobs = jobPosts.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddJob = () => {
    const job: JobPost = {
      id: Date.now(),
      ...newJob,
      requirements: newJob.requirements.split("\n").filter((r) => r.trim()),
      responsibilities: newJob.responsibilities.split("\n").filter((r) => r.trim()),
      applications: 0,
      postedDate: new Date().toISOString().split("T")[0],
    }

    setJobPosts([job, ...jobPosts])
    setNewJob({
      title: "",
      department: "",
      location: "",
      type: "full-time",
      experience: "",
      description: "",
      requirements: "",
      responsibilities: "",
      salary: "",
      deadline: "",
      status: "draft",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Job Post Created",
      description: "Your job posting has been created successfully.",
    })
  }

  const handleDeleteJob = (id: number) => {
    setJobPosts(jobPosts.filter((job) => job.id !== id))
    toast({
      title: "Job Post Deleted",
      description: "The job posting has been deleted successfully.",
    })
  }

  const handleStatusChange = (id: number, status: JobPost["status"]) => {
    setJobPosts(jobPosts.map((job) => (job.id === id ? { ...job, status } : job)))
    toast({
      title: "Status Updated",
      description: `Job posting status changed to ${status}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Vacancies</h1>
          <p className="text-gray-600 mt-2">Manage job postings and track applications</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rammisLightBlue hover:bg-rammisBlue/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Job Posting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>Add a new job vacancy to attract qualified candidates.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="e.g. Senior Banking Specialist"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={newJob.department}
                    onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                    placeholder="e.g. Banking Operations"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    placeholder="e.g. Addis Ababa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select value={newJob.type} onValueChange={(value: any) => setNewJob({ ...newJob, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Required</Label>
                  <Input
                    id="experience"
                    value={newJob.experience}
                    onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                    placeholder="e.g. 3+ years"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Detailed job description..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea
                  id="requirements"
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                  placeholder="Bachelor's degree in Finance&#10;5+ years experience&#10;Strong communication skills"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                <Textarea
                  id="responsibilities"
                  value={newJob.responsibilities}
                  onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value })}
                  placeholder="Manage client relationships&#10;Develop banking products&#10;Ensure compliance"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    placeholder="e.g. 25,000 - 35,000 ETB"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newJob.deadline}
                    onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newJob.status} onValueChange={(value: any) => setNewJob({ ...newJob, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddJob} className="bg-emerald-600 hover:bg-emerald-700">
                  Create Job Posting
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search job postings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Posts List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <Badge
                      variant={
                        job.status === "active" ? "default" : job.status === "closed" ? "destructive" : "secondary"
                      }
                    >
                      {job.status}
                    </Badge>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <span>{job.department}</span>
                    <span>{job.experience} experience</span>
                    <span>{job.salary}</span>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applications} applications
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Select value={job.status} onValueChange={(value: any) => handleStatusChange(job.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteJob(job.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first job posting."}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button onClick={() => setIsAddDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Job Posting
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
