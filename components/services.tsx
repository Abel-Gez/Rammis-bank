import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, CreditCard, Home, TrendingUp, Calculator, Banknote, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Services() {
  const services = [
    {
      icon: Building2,
      title: "Business Financing",
      description: "Murabaha and Musharaka financing solutions for your business growth",
      features: ["Trade Financing", "Equipment Purchase", "Working Capital"],
    },
    {
      icon: Home,
      title: "Home Financing",
      description: "Sharia-compliant home financing through Diminishing Musharaka",
      features: ["Home Purchase", "Construction Finance", "Home Improvement"],
    },
    {
      icon: CreditCard,
      title: "Personal Banking",
      description: "Everyday banking services that align with Islamic principles",
      features: ["Current Account", "Savings Account", "Debit Cards"],
    },
    {
      icon: TrendingUp,
      title: "Investment Services",
      description: "Halal investment opportunities in ethical business ventures",
      features: ["Sukuk Bonds", "Equity Funds", "Real Estate Investment"],
    },
    {
      icon: Calculator,
      title: "Zakat Calculator",
      description: "Calculate your Zakat obligations with our compliant calculator",
      features: ["Gold & Silver", "Cash & Savings", "Business Assets"],
    },
    {
      icon: Banknote,
      title: "Currency Exchange",
      description: "Competitive rates for ETB, USD, EUR, and GBP exchanges",
      features: ["Live Rates", "Online Exchange", "Branch Services"],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-balance">
            Comprehensive Islamic Banking Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Discover our full range of Sharia-compliant financial products designed to meet your personal and business
            needs while adhering to Islamic principles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full group-hover:bg-emerald-50" asChild>
                    <Link href="/services">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
