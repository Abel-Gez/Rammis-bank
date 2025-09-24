import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Services() {
  const services = [
    {
      id: 1,
      title: "WADIA BANKING",
      description: "We provide secure financing, cash management, and tailored services to help your company grow while staying true to Islamic principles",
      image: "/Corporate-banking.png",
    },
    {
      id: 2,
      title: "MOBILE BANKING",
      description: "Experience seamless banking services with our new mobile application featuring enhanced security and user-friendly interface",
      image: "/mobile-banking.jpg",
    },
    {
      id: 3,
      title: "RETAIL BANKING",
      description: "Our Retail Banking provides Sharia-compliant, interest-free financial services designed to support your everyday needs",
      image: "/retail-banking.png",
    },
    {
      id: 1,
      title: "Business Financing",
      description: "Murabaha and Musharaka financing solutions for your business growth",
      image: "/business-financing.jpg",
    },
    {
      id: 5,
      title: "Personal Banking",
      description: "Everyday banking services that align with Islamic principles",
      image: "/personal-banking.jpg",
    },
    {
      id: 6,
      title: "Investment Services",
      description: "Halal investment opportunities in ethical business ventures",
      image: "/investment-services.jpg",
    },
    {
      id: 7,
      title: "Zakat Calculator",
      description: "Calculate your Zakat obligations with our compliant calculator",
      image: "/zakat-calculator.jpg",
    },
    {
      id: 8,
      title: "Currency Exchange",
      description: "Competitive rates for ETB, USD, EUR, and GBP exchanges",
      image: "/currency-exchange.jpg",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-balance">
            Comprehensive Banking Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Discover our full range of Sharia-compliant financial products designed to meet your personal and business
            needs while adhering to Islamic principles.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-rammisLightBlue transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-rammisLightBlue" asChild>
                  <Link href={`/services/${service.id}`}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-rammisLightBlue hover:bg-rammisBlue" asChild>
            <Link href="/services" className="text-white">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
