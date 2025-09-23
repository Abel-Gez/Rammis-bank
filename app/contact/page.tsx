import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MessageSquare, HeadphonesIcon } from "lucide-react"

export default function ContactPage() {
  const branches = [
    {
      name: "Bole Branch (Head Office)",
      address: "Bole Road, Near Bole Airport, Addis Ababa",
      phone: "+251 11 123 4567",
      email: "bole@rammisbank.com",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 8:00 AM - 1:00 PM",
      services: ["All Banking Services", "Currency Exchange", "Business Banking", "Customer Registration"],
    },
    {
      name: "Piazza Branch",
      address: "Piazza, Churchill Avenue, Addis Ababa",
      phone: "+251 11 123 4568",
      email: "piazza@rammisbank.com",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 8:00 AM - 1:00 PM",
      services: ["Personal Banking", "Currency Exchange", "ATM Services", "Customer Support"],
    },
    {
      name: "Merkato Branch",
      address: "Merkato, Main Market Area, Addis Ababa",
      phone: "+251 11 123 4569",
      email: "merkato@rammisbank.com",
      hours: "Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 8:00 AM - 2:00 PM",
      services: ["Business Banking", "Trade Financing", "Currency Exchange", "Merchant Services"],
    },
    {
      name: "Kazanchis Branch",
      address: "Kazanchis, Business District, Addis Ababa",
      phone: "+251 11 123 4570",
      email: "kazanchis@rammisbank.com",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 8:00 AM - 1:00 PM",
      services: ["Corporate Banking", "Investment Services", "Wealth Management", "Business Loans"],
    },
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our customer service team",
      contact: "+251 11 123 4567",
      hours: "24/7 Available",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions and concerns",
      contact: "support@rammisbank.com",
      hours: "Response within 24 hours",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support agents online",
      contact: "Available on website",
      hours: "8:00 AM - 8:00 PM",
    },
    {
      icon: HeadphonesIcon,
      title: "WhatsApp Support",
      description: "Message us on WhatsApp",
      contact: "+251 9XX XXX XXX",
      hours: "8:00 AM - 6:00 PM",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 text-balance">Get in Touch</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                We're here to help you with all your Islamic banking needs. Contact us through any of the convenient
                methods below or visit one of our branch locations.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help You?</h2>
              <p className="text-lg text-gray-600">Choose the most convenient way to reach us</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-emerald-600" />
                      </div>
                      <CardTitle className="text-xl">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="font-semibold text-emerald-600">{method.contact}</p>
                        <p className="text-sm text-gray-500">{method.hours}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible. For urgent matters, please call
                  our customer service line.
                </p>

                <Card>
                  <CardContent className="pt-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" placeholder="Enter your first name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" placeholder="Enter your last name" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+251 9XX XXX XXX" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="account-inquiry">Account Inquiry</SelectItem>
                            <SelectItem value="loan-application">Loan Application</SelectItem>
                            <SelectItem value="technical-support">Technical Support</SelectItem>
                            <SelectItem value="complaint">Complaint</SelectItem>
                            <SelectItem value="suggestion">Suggestion</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Please describe your inquiry or concern in detail..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Branches</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Find the nearest Rammis Bank branch to you. All our branches offer comprehensive Islamic banking
                  services with experienced staff ready to assist you.
                </p>

                <div className="space-y-6">
                  {branches.map((branch, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl text-emerald-600">{branch.name}</CardTitle>
                        <CardDescription>{branch.address}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-emerald-600" />
                            <span>{branch.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-emerald-600" />
                            <span>{branch.email}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-gray-700 mb-2">Operating Hours:</p>
                            <p className="text-sm text-gray-600">{branch.hours}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-gray-700 mb-2">Services Available:</p>
                            <div className="flex flex-wrap gap-2">
                              {branch.services.map((service, serviceIndex) => (
                                <span
                                  key={serviceIndex}
                                  className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Emergency Banking Support</h2>
            <p className="text-xl mb-6">
              For urgent banking matters outside business hours, our emergency hotline is available 24/7
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency Line: +251 11 911 BANK
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp Support
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
