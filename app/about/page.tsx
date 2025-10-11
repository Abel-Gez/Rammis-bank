import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AboutPage() {
  const overviewLinks = [
    { title: "Company Profile", description: "Learn about our history, mission, and values.", href: "/about/company-profile" },
    {
      title: "Organizational Structure",
      description: "See how our teams collaborate to deliver innovative services.",
      href: "/about/organizational-structure",
    },
    {
      title: "Board of Directors",
      description: "Meet the board members guiding our strategic direction.",
      href: "/about/board-directors",
    },
    { title: "Sharia Board", description: "Understand how we maintain Sharia compliance.", href: "/about/sharia-board" },
    {
      title: "Executive Management",
      description: "Discover the leaders driving our day-to-day operations.",
      href: "/about/executive-management",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-gray-400 to-teal-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <Badge className="bg-rammisBlue px-4 py-2 text-white">About Rammis Bank</Badge>
              <h1 className="text-balance text-4xl font-bold text-gray-900 lg:text-6xl">Banking with Purpose and Principles</h1>
              <p className="mx-auto max-w-3xl text-pretty text-xl text-gray-600">
                Founded on the principles of Islamic banking, Rammis Bank is committed to providing ethical, transparent,
                and Sharia-compliant financial services to the Ethiopian community.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                  <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                    To provide innovative, ethical, and Sharia-compliant banking solutions that empower individuals and
                    businesses in Ethiopia to achieve their financial goals while contributing to the economic development
                    of our nation.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                  <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                    To be the leading Islamic bank in Ethiopia, recognized for our commitment to Sharia principles,
                    exceptional customer service, and positive impact on society.
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl bg-white/60 p-1 shadow-lg backdrop-blur">
                <img src="/flow-high.png" alt="Our mission and vision" className="h-full w-full rounded-[18px] object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">Explore More About Us</h2>
              <p className="mt-4 text-lg text-gray-600">
                Dive deeper into each area to understand how Rammis Bank serves communities with purpose and integrity.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {overviewLinks.map((item) => (
                <Card key={item.title} className="h-full border border-rammisBlue/10 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col space-y-4 p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-rammisBlue">{item.title}</h3>
                      <p className="mt-3 text-gray-600">{item.description}</p>
                    </div>
                    <div className="mt-auto pt-2">
                      <Link
                        href={item.href}
                        className="inline-flex items-center text-sm font-semibold text-rammisBlue hover:text-rammisLightBlue"
                      >
                        Learn more
                        <span aria-hidden className="ml-1 text-lg">→</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
