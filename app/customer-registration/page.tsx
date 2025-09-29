import { CustomerRegistrationForm } from "@/components/customer-registration/customer-registration-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Building2, Shield, Clock, CheckCircle } from "lucide-react"

export default function CustomerRegistrationPage() {
  const benefits = [
    {
      icon: Shield,
      title: "Sharia Compliant",
      description: "All our products follow Islamic banking principles",
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Account approval within 24-48 hours",
    },
    {
      icon: CheckCircle,
      title: "No Hidden Fees",
      description: "Transparent pricing with no surprise charges",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rammisLightBlue/30 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-rammisLightBlue rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-rammisBlue">Rammis Bank</span>
                <span className="text-xs text-rammisLightBlue">Customer Registration</span>
              </div>
            </Link>
            <Link href="/" className="text-rammisLightBlue hover:text-rammisBlue font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Open Your Banking Account</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join thousands of customers who trust Rammis Bank for their Sharia-compliant banking needs.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-rammisLightBlue rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Requirements */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-black font-bold">Required Documents</CardTitle>
                <CardDescription className="text-gray-800 text-pretty">
                  Please have these documents ready for upload:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-black">
                  <li>• Valid Ethiopian ID or Passport</li>
                  <li>• Proof of Address (Utility Bill)</li>
                  <li>• Recent Passport Photo</li>
                  <li>• Employment Letter (if applicable)</li>
                  <li>• Business License (for business accounts)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Account Registration Form</CardTitle>
                <CardDescription>
                  Fill out the form below to start your banking journey with us.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerRegistrationForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
