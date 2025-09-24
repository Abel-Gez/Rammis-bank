import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, CreditCard, Home, TrendingUp, Calculator, Banknote, ArrowRight, CheckCircle, Building2Icon } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: "wadia",
      icon: Building2Icon,
      title: "WADIA BANKING",
      description: "Comprehensive Islamic financing solutions for your business growth and expansion needs.",
      features: [
        "Murabaha Trade Financing",
        "Musharaka Partnership Financing",
        "Equipment Purchase Financing",
        "Working Capital Solutions",
        "Import/Export Financing",
        "Business Expansion Loans",
      ],
      benefits: [
        "Sharia-compliant financing structures",
        "Competitive profit rates",
        "Flexible repayment terms",
        "Quick approval process",
        "Dedicated relationship managers",
      ],
    },
    {
      id: "business",
      icon: Building2,
      title: "Business Financing",
      description: "Comprehensive Islamic financing solutions for your business growth and expansion needs.",
      features: [
        "Murabaha Trade Financing",
        "Musharaka Partnership Financing",
        "Equipment Purchase Financing",
        "Working Capital Solutions",
        "Import/Export Financing",
        "Business Expansion Loans",
      ],
      benefits: [
        "Sharia-compliant financing structures",
        "Competitive profit rates",
        "Flexible repayment terms",
        "Quick approval process",
        "Dedicated relationship managers",
      ],
    },
    {
      id: "home",
      icon: Home,
      title: "Home Financing",
      description: "Make your dream of homeownership a reality with our Sharia-compliant home financing solutions.",
      features: [
        "Diminishing Musharaka",
        "Home Purchase Financing",
        "Construction Financing",
        "Home Improvement Loans",
        "Land Purchase Financing",
        "Refinancing Options",
      ],
      benefits: [
        "Up to 90% financing",
        "Competitive profit rates",
        "Flexible tenure up to 25 years",
        "No hidden charges",
        "Free property valuation",
      ],
    },
    {
      id: "personal",
      icon: CreditCard,
      title: "Personal Banking",
      description: "Complete range of personal banking services designed to meet your everyday financial needs.",
      features: [
        "Current Accounts",
        "Savings Accounts",
        "Fixed Deposit Accounts",
        "Debit Cards",
        "Online Banking",
        "Mobile Banking",
      ],
      benefits: [
        "No minimum balance for current accounts",
        "Competitive profit rates on savings",
        "Free debit card",
        "24/7 online banking",
        "Mobile app with all features",
      ],
    },
    {
      id: "investment",
      icon: TrendingUp,
      title: "Investment Services",
      description: "Grow your wealth through Sharia-compliant investment opportunities and wealth management services.",
      features: [
        "Sukuk Bonds",
        "Equity Investment Funds",
        "Real Estate Investment",
        "Commodity Trading",
        "Wealth Management",
        "Portfolio Advisory",
      ],
      benefits: [
        "Diversified investment options",
        "Professional portfolio management",
        "Regular performance reports",
        "Risk-adjusted returns",
        "Sharia board oversight",
      ],
    },
    {
      id: "zakat",
      icon: Calculator,
      title: "Zakat Services",
      description: "Comprehensive Zakat calculation and distribution services to fulfill your religious obligations.",
      features: [
        "Zakat Calculator",
        "Zakat Collection",
        "Distribution Services",
        "Annual Zakat Reports",
        "Consultation Services",
        "Educational Resources",
      ],
      benefits: [
        "Accurate Zakat calculations",
        "Transparent distribution",
        "Verified beneficiaries",
        "Annual impact reports",
        "Expert guidance",
      ],
    },
    {
      id: "exchange",
      icon: Banknote,
      title: "Currency Exchange",
      description: "Competitive foreign exchange services with real-time rates for major international currencies.",
      features: [
        "USD Exchange",
        "EUR Exchange",
        "GBP Exchange",
        "Real-time Rates",
        "Online Calculator",
        "Branch Services",
      ],
      benefits: [
        "Competitive exchange rates",
        "Real-time rate updates",
        "Secure transactions",
        "Multiple branch locations",
        "Online rate checking",
      ],
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
              <Badge className="bg-rammisBlue text-white px-4 py-2">Our Services</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 text-balance">
                Comprehensive Banking Solutions
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Discover our full range of Sharia-compliant financial products and services designed to meet your
                personal and business needs while adhering to principles.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.id}
                    id={service.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                  >
                    <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-rammisLightBlue rounded-xl flex items-center justify-center">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                            <p className="text-gray-600 mt-2">{service.description}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Features</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-rammisLightBlue mr-3 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Benefits</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {service.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-rammisLightBlue mr-3 flex-shrink-0" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button className="bg-rammisLightBlue hover:bg-rammisBlue" asChild>
                            <Link href="/customer-registration" className="text-white">
                              Apply Now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href="/contact" className="border-border hover:bg-rammisBlue">Learn More</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                      <div className="relative">
                        <img
                          src={`/placeholder.png?height=400&width=600&text=${service.title.replace(" ", "+")}`}
                          alt={service.title}
                          className="rounded-2xl shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-400 to-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 ">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
                Join thousands of satisfied customers who trust Rammis Bank for their Islamic banking needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/customer-registration">
                    Open Account Today
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white hover:bg-rammisBlue hover:text-white bg-rammisLightBlue"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
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
