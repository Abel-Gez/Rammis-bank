import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Award, Globe, Heart, Target } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Sharia Compliance",
      description: "All our products and services strictly adhere to Islamic banking principles and Sharia law.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "We prioritize the financial well-being and growth of our local Ethiopian community.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our banking services and customer experience.",
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "We embrace modern technology while maintaining our commitment to Islamic principles.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We conduct all business with honesty, transparency, and ethical practices.",
    },
    {
      icon: Target,
      title: "Customer Success",
      description: "Your financial success is our primary goal and measure of our achievement.",
    },
  ]

  const milestones = [
    {
      year: "2022",
      title: "Bank Establishment",
      description: "Rammis Bank was founded with a vision to provide ethical banking services.",
    },
    { year: "2023", title: "First Branch Opening", description: "Opened our flagship branch in Bole, Addis Ababa." },
    {
      year: "2023",
      title: "Digital Banking Launch",
      description: "Launched our mobile banking app and online services.",
    },
    { year: "2023", title: "Branch Expansion", description: "Expanded to 5 branches across Addis Ababa." },
    {
      year: "2024",
      title: "300,000+ Customers",
      description: "Reached milestone of serving over 10,000 satisfied customers.",
    },
  ]

  const leadership = [
    {
      name: "Ali Ahmed",
      position: "Chief Executive Officer",
      experience: "15+ years in Banking",
      image: "/CEO.png",
    },
    {
      name: "Fatima Al-Zahra",
      position: "Chief Corporate Service Officer",
      experience: "12+ years in Financial Management",
      image: "/chief-corporate-service-officer.png",
    },
    {
      name: "Dr. Ibrahim Yusuf",
      position: "Chief Banking Operation Officer",
      experience: "20+ years in Islamic Jurisprudence",
      image: "/banking-operation-officer.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-400 to-teal-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <Badge className="bg-rammisBlue font-bold text-pretty text-white px-4 py-2">About Rammis Bank</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 text-balance">
                Banking with Purpose and Principles
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Founded on the principles of Islamic banking, Rammis Bank is committed to providing ethical,
                transparent, and Sharia-compliant financial services to the Ethiopian community.
              </p>
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

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These fundamental values guide every decision we make and every service we provide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg bg-blue-100 transition-shadow">
                    <CardContent className="pt-8">
                      <div className="w-16 h-16 bg-rammisLightBlue rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
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

        {/* Leadership */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the experienced professionals leading Rammis Bank towards a brighter future.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <Card key={index} className="bg-gray-300 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                      <img
                        src={leader.image || "/placeholder.svg"}
                        alt={leader.name}
                        className="w-full h-full "
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h3>
                    <p className="text-gray-900 font-medium mb-2">{leader.position}</p>
                    <p className="text-gray-600 text-sm">{leader.experience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Organizational Structure */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Organizational Structure</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our organizational structure ensures efficient decision-making and clear responsibilities across all departments.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-[1054px]">
                <img
                  src="/org_structure.png" // replace with your actual image path
                  alt="Organizational Structure"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
