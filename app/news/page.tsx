import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Eye, Search, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

export default function NewsPage() {
  const featuredNews = {
    id: 1,
    title: "Rammis Bank Launches Revolutionary Mobile Banking App",
    excerpt:
      "Experience the future of Islamic banking with our new mobile application featuring enhanced security, real-time transactions, and user-friendly interface designed specifically for Ethiopian customers.",
    content: "Full article content...",
    category: "Technology",
    author: "Rammis Bank Communications",
    publishDate: "2024-01-15",
    views: 2450,
    image: "/placeholder.svg?height=400&width=800&text=Mobile+Banking+App",
    featured: true,
  }

  const newsArticles = [
    {
      id: 2,
      title: "New Home Financing Products with Competitive Rates",
      excerpt:
        "We are pleased to announce expanded Diminishing Musharaka home financing options with the most competitive rates in the Ethiopian Islamic banking sector.",
      category: "Products",
      author: "Product Team",
      publishDate: "2024-01-12",
      views: 1890,
      image: "/placeholder.svg?height=300&width=400&text=Home+Financing",
    },
    {
      id: 3,
      title: "Community Iftar Program Supports 500 Families",
      excerpt:
        "Our annual community Iftar program successfully provided meals and support to over 500 families during the holy month of Ramadan.",
      category: "Community",
      author: "Community Relations",
      publishDate: "2024-01-10",
      views: 1234,
      image: "/placeholder.svg?height=300&width=400&text=Community+Program",
    },
    {
      id: 4,
      title: "Rammis Bank Wins 'Best Islamic Bank' Award",
      excerpt:
        "We are honored to receive the 'Best Islamic Bank in Ethiopia' award from the Ethiopian Banking Association for our commitment to Sharia-compliant services.",
      category: "Awards",
      author: "Corporate Communications",
      publishDate: "2024-01-08",
      views: 3456,
      image: "/placeholder.svg?height=300&width=400&text=Award+Ceremony",
    },
    {
      id: 5,
      title: "Digital Banking Security Enhancements",
      excerpt:
        "Learn about our latest security measures and best practices to keep your online banking experience safe and secure.",
      category: "Security",
      author: "IT Security Team",
      publishDate: "2024-01-05",
      views: 987,
      image: "/placeholder.svg?height=300&width=400&text=Digital+Security",
    },
    {
      id: 6,
      title: "Zakat Distribution Report 2023",
      excerpt:
        "Our annual Zakat distribution report shows how your contributions have made a positive impact on thousands of beneficiaries across Ethiopia.",
      category: "Reports",
      author: "Zakat Committee",
      publishDate: "2024-01-03",
      views: 1567,
      image: "/placeholder.svg?height=300&width=400&text=Zakat+Report",
    },
    {
      id: 7,
      title: "Business Financing Success Stories",
      excerpt:
        "Read inspiring stories of Ethiopian entrepreneurs who have grown their businesses with our Sharia-compliant financing solutions.",
      category: "Success Stories",
      author: "Business Banking Team",
      publishDate: "2024-01-01",
      views: 2100,
      image: "/placeholder.svg?height=300&width=400&text=Business+Success",
    },
  ]

  const categories = ["All", "Technology", "Products", "Community", "Awards", "Security", "Reports", "Success Stories"]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2">Media & News</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 text-balance">Latest News & Updates</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Stay informed about our latest products, services, community initiatives, and industry insights from
                Rammis Bank.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Story</h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto">
                    <img
                      src={featuredNews.image || "/placeholder.svg"}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className="bg-emerald-100 text-emerald-800">{featuredNews.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredNews.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {featuredNews.views.toLocaleString()} views
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredNews.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{featuredNews.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {featuredNews.author}</span>
                      <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                        <Link href={`/news/${featuredNews.id}`}>
                          Read Full Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="Search news articles..." className="pl-10 h-12" />
                </div>
              </div>
              <Select defaultValue="All">
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views.toLocaleString()} views
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:bg-emerald-50" asChild>
                        <Link href={`/news/${article.id}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">By {article.author}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-emerald-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
              <p className="text-xl text-emerald-100">
                Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="bg-white border-white" />
                <Button variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
                  Subscribe
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
