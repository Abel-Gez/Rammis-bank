import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Newspaper, Briefcase, TrendingUp, Eye, Calendar, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

export function AdminOverview() {
  const stats = [
    {
      title: "Total Customers",
      value: "2,847",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Published News",
      value: "24",
      change: "+3",
      changeType: "positive" as const,
      icon: Newspaper,
    },
    {
      title: "Active Job Posts",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: Briefcase,
    },
    {
      title: "Monthly Growth",
      value: "18.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
  ]

  const recentNews = [
    {
      id: 1,
      title: "New Mobile Banking Features Released",
      status: "published",
      views: 1250,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Ramadan Community Program Announcement",
      status: "draft",
      views: 0,
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Home Financing Rate Updates",
      status: "published",
      views: 890,
      date: "2024-01-12",
    },
  ]

  const recentJobs = [
    {
      id: 1,
      title: "Senior Islamic Banking Specialist",
      applications: 45,
      status: "active",
      deadline: "2024-02-15",
    },
    {
      id: 2,
      title: "Customer Service Representative",
      applications: 78,
      status: "active",
      deadline: "2024-02-10",
    },
    {
      id: 3,
      title: "IT Support Technician",
      applications: 23,
      status: "closed",
      deadline: "2024-01-30",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your bank platform content and operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className="w-4 h-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-rammisLightBlue flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent News */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent News Posts</CardTitle>
              <CardDescription>Latest news articles and updates</CardDescription>
            </div>
            <Button size="sm" asChild>
              <Link href="/admin/news">
                <Plus className="w-4 h-4 mr-2" />
                Add News
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNews.map((news) => (
                <div key={news.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{news.title}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge variant={news.status === "published" ? "default" : "secondary"}>{news.status}</Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Eye className="w-3 h-3 mr-1" />
                        {news.views} views
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(news.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/admin/news">
                  View All News
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Job Vacancies</CardTitle>
              <CardDescription>Current job openings and applications</CardDescription>
            </div>
            <Button size="sm" asChild>
              <Link href="/admin/jobs">
                <Plus className="w-4 h-4 mr-2" />
                Add Job
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{job.title}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge variant={job.status === "active" ? "default" : "secondary"}>{job.status}</Badge>
                      <span className="text-xs text-gray-500">{job.applications} applications</span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/admin/jobs">
                  View All Jobs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
