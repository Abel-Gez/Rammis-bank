import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Target, Lightbulb } from "lucide-react"

export default function CompanyProfilePage() {
  const pillars = [
    {
      icon: Shield,
      title: "Ethical & Sharia-Compliant",
      description:
        "Every product we offer is reviewed by our Sharia board to ensure complete alignment with Islamic banking principles.",
    },
    {
      icon: Users,
      title: "Community-Focused",
      description:
        "Our solutions are designed to serve individuals, SMEs, and communities with compassion and cultural understanding.",
    },
    {
      icon: Target,
      title: "Purpose Driven",
      description:
        "We measure success by the positive impact we create for our customers and the broader Ethiopian economy.",
    },
    {
      icon: Lightbulb,
      title: "Innovative Spirit",
      description:
        "Modern technology and timeless values come together in our digital platforms and service experiences.",
    },
  ]

  const milestones = [
    { year: "2022", title: "Rammis Bank Founded", description: "Established with a vision to lead Islamic banking in Ethiopia." },
    { year: "2023", title: "Nationwide Outreach", description: "Expanded branches and touchpoints to better serve communities." },
    { year: "2023", title: "Digital Channels", description: "Launched robust mobile and online banking services." },
    { year: "2024", title: "Growing Trust", description: "Welcomed thousands of customers embracing ethical finance." },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-gray-400 to-teal-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <Badge className="bg-rammisBlue px-4 py-2 text-white">Company Profile</Badge>
              <h1 className="text-balance text-4xl font-bold text-gray-900 lg:text-5xl">Rooted in Principles. Designed for People.</h1>
              <p className="mx-auto max-w-3xl text-pretty text-lg text-gray-600">
                Rammis Bank blends ethical Islamic finance with modern banking experiences, empowering customers to pursue
                prosperity with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-rammisBlue">Our Story</h2>
                <p className="text-lg leading-relaxed text-slate-600">
                Rammis Bank S.C., a fully-fledged interest-free bank in Ethiopia, was established on October 04, 2022, with a vision to become the hub of interest-free banking in East Africa. 
                </p>
                <p className="text-lg leading-relaxed text-slate-600">
                Rammis Bank S.C., named after the Rammis River in eastern Ethiopia, is well-positioned to drive sustainable economic growth in the country. 
                </p>
                <p className="text-lg leading-relaxed text-slate-600">
                The bank’s subscribed capital of Birr 2.4 billion and paid-up capital of Birr 747 million, funded by over 8,200 shareholders, provides a strong foundation for the bank to cater to the financial needs of marginalized segments of society who may have been excluded due to religious beliefs or other factors. 
                </p>
              </div>
              <div className="rounded-3xl border border-rammisBlue/10 bg-slate-50/80 p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-rammisBlue">What Sets Us Apart</h3>
                <ul className="mt-6 space-y-4 text-slate-600">
                  <li>
                    <span className="font-semibold text-rammisBlue">Holistic Relationship Banking:</span> Dedicated relationship managers who understand your values and
                    goals.
                  </li>
                  <li>
                    <span className="font-semibold text-rammisBlue">Inclusive Growth:</span> Tailored offerings for individuals, families, entrepreneurs, and institutions.
                  </li>
                  <li>
                    <span className="font-semibold text-rammisBlue">Transparent Practices:</span> Clear communication and ethical governance at every touchpoint.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  To provide innovative, ethical, and Sharia-compliant banking solutions that empower individuals and
                  businesses in Ethiopia to achieve their financial goals while contributing to the economic development
                  of our nation.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be the leading Islamic bank in Ethiopia, recognized for our commitment to Sharia principles,
                  exceptional customer service, and positive impact on society.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/flow-high.png"
                  alt="Our mission and vision"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Timeline */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From our founding to today, here are the key milestones in our growth story.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-rammisLightBlue"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <Card className="hover:shadow-lg bg-blue-50 transition-shadow">
                        <CardContent className="p-6">
                          <Badge className="bg-rammisLightBlue text-white mb-3">{milestone.year}</Badge>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-rammisLightBlue rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
