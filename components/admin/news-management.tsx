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
import { Plus, Edit, Trash2, Eye, Calendar, Search, Filter, Newspaper } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NewsPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  status: "published" | "draft" | "archived"
  author: string
  publishDate: string
  views: number
  image?: string
}

export function NewsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null)
  const { toast } = useToast()

  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft" as const,
    image: "" as string | undefined,
  })

  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([
    {
      id: 1,
      title: "Rammis Bank Launches New Mobile Banking App",
      excerpt:
        "Experience seamless Islamic banking with our new mobile application featuring enhanced security and user-friendly interface.",
      content: "Full content here...",
      category: "Technology",
      status: "published",
      author: "Admin User",
      publishDate: "2024-01-15",
      views: 1250,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Expansion of Home Financing Products",
      excerpt:
        "We are pleased to announce expanded Diminishing Musharaka home financing options with competitive rates.",
      content: "Full content here...",
      category: "Products",
      status: "published",
      author: "Admin User",
      publishDate: "2024-01-10",
      views: 890,
    },
    {
      id: 3,
      title: "Community Iftar Program 2024",
      excerpt:
        "Join us for our annual community Iftar program supporting local families during the holy month of Ramadan.",
      content: "Full content here...",
      category: "Community",
      status: "draft",
      author: "Admin User",
      publishDate: "2024-01-05",
      views: 0,
    },
  ])

  const filteredPosts = newsPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddPost = () => {
    const post: NewsPost = {
      id: Date.now(),
      ...newPost,
      author: "Admin User",
      publishDate: new Date().toISOString().split("T")[0],
      views: 0,
      image: newPost.image,
    }

    setNewsPosts([post, ...newsPosts])
    setNewPost({ title: "", excerpt: "", content: "", category: "", status: "draft", image: "" })
    setIsAddDialogOpen(false)

    toast({
      title: "News Post Created",
      description: "Your news post has been created successfully.",
    })
  }

  const handleDeletePost = (id: number) => {
    setNewsPosts(newsPosts.filter((post) => post.id !== id))
    toast({
      title: "News Post Deleted",
      description: "The news post has been deleted successfully.",
    })
  }

  const handleStatusChange = (id: number, status: NewsPost["status"]) => {
    setNewsPosts(newsPosts.map((post) => (post.id === id ? { ...post, status } : post)))
    toast({
      title: "Status Updated",
      description: `News post status changed to ${status}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 mt-2">Create and manage news posts and announcements</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rammisLightBlue hover:bg-rammisBlue/90">
              <Plus className="w-4 h-4 mr-2" />
              Add News Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>Create New News Post</DialogTitle>
              <DialogDescription>Add a new news post or announcement for your website.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter news title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  placeholder="Brief description of the news"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Full news content"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setNewPost((prev) => ({
                          ...prev,
                          image: reader.result as string,
                        }))
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
                {newPost.image && (
                  <img
                    src={newPost.image}
                    alt="Preview"
                    className="mt-2 max-h-40 rounded border"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newPost.category}
                    onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Products">Products</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Announcements">Announcements</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newPost.status}
                    onValueChange={(value: any) => setNewPost({ ...newPost, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPost} className="bg-emerald-600 hover:bg-emerald-700">
                  Create Post
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
                  placeholder="Search news posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 ">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>

                  <p className="text-gray-600 mb-3">{post.excerpt}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views} views
                    </div>
                    <span>By {post.author}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Select value={post.status} onValueChange={(value: any) => handleStatusChange(post.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
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

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No news posts found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first news post."}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button onClick={() => setIsAddDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add News Post
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
