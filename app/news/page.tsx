"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Eye, Search, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

interface Post {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishDate: string
  views: number
  image?: string
  featured: boolean
}

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("newest")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/posts/")
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        console.error("Failed to fetch posts:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const featuredPost = posts.find((p) => p.featured)
  let filtered = posts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  )

  if (sort === "popular") filtered = [...filtered].sort((a, b) => b.views - a.views)
  if (sort === "oldest") filtered = [...filtered].sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime())

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-400 to-teal-50 py-20 text-center">
          <Badge className="bg-rammisBlue text-white px-4 py-2">Media & News</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-rammisBlue mt-4">Latest News & Updates</h1>
          <p className="text-xl text-rammisBlue/80 mt-4 max-w-3xl mx-auto">
            Stay informed about our latest products, services, and community initiatives.
          </p>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Featured Story</h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid lg:grid-cols-2">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge>{featuredPost.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredPost.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {featuredPost.views} views
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {featuredPost.author}</span>
                      <Button className="bg-rammisBlue hover:bg-rammisBlue/90 text-white" asChild>
                        <Link href={`/news/${featuredPost.id}`}>
                          Read Full Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Search & Filters */}
        <section className="py-8 bg-rammisBlue/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 border-rammisBlue/20"
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-48 h-12 border-rammisBlue/20">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full md:w-48 h-12 border-rammisBlue/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-20 bg-rammisBlue/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all group">
                <div className="aspect-video">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views} views
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/news/${post.id}`}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">By {post.author}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
