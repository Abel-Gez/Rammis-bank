import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export function NewsSection() {
  const news = [
    {
      id: 1,
      title: "Rammis Bank Launches New Mobile Banking App",
      excerpt:
        "Experience seamless banking services with our new mobile application featuring enhanced security and user-friendly interface.",
      date: "2024-01-15",
      category: "Technology",
      image: "/mobile-banking.jpg",
    },
    {
      id: 2,
      title: "RETAIL BANKING",
      excerpt:
        "Our Retail Banking provides Sharia-compliant, interest-free financial services designed to support your everyday needs.",
      date: "2024-01-10",
      category: "Products",
      image: "/retail-banking.png",
    },
    {
      id: 3,
      title: "WADIA BANKING",
      excerpt:
        "We provide secure financing, cash management, and tailored services to help your company grow while staying true to Islamic principles.",
      date: "2024-01-10",
      category: "Products",
      image: "/corporate-banking.png",
    },
    {
      id: 4,
      title: "Expansion of Home Financing Products",
      excerpt:
        "We are pleased to announce expanded Diminishing Musharaka home financing options with competitive rates.",
      date: "2024-01-10",
      category: "Products",
      image: "/ethiopian-family-in-front-of-new-home-islamic-fina.jpg",
    },
    {
      id: 5,
      title: "Community Iftar Program 2024",
      excerpt:
        "Join us for our annual community Iftar program supporting local families during the holy month of Ramadan.",
      date: "2024-01-05",
      category: "Community",
      image: "/placeholder-3ijcl.png",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-balance">Latest News & Updates</h2>
            <p className="text-lg text-gray-600 text-pretty">
              Stay informed about our latest products, services, and community initiatives
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
            <Link href="/news">
              View All News
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
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
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-rammisLightBlue transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-gray-600">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-rammisLightBlue" asChild>
                  <Link href={`/news/${article.id}`}>
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/news">
              View All News
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
