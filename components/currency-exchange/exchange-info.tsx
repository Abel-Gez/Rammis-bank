import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Shield, MapPin, Phone, CreditCard, FileText } from "lucide-react"

export function ExchangeInfo() {
  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description:
        "All exchanges are processed through secure, encrypted channels with full compliance to banking regulations.",
    },
    {
      icon: Clock,
      title: "Real-time Rates",
      description: "Our rates are updated every minute to ensure you get the most current market rates available.",
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Accept cash, bank transfers, and digital payments for your currency exchange needs.",
    },
    {
      icon: FileText,
      title: "Transparent Fees",
      description:
        "No hidden charges. All fees and commissions are clearly displayed before you complete your transaction.",
    },
  ]

  const branches = [
    {
      name: "Bole Branch",
      address: "Bole Road, Near Bole Airport",
      hours: "8:00 AM - 5:00 PM",
      phone: "+251 11 123 4567",
    },
    {
      name: "Piazza Branch",
      address: "Piazza, Churchill Avenue",
      hours: "8:00 AM - 5:00 PM",
      phone: "+251 11 123 4568",
    },
    {
      name: "Merkato Branch",
      address: "Merkato, Main Market Area",
      hours: "8:00 AM - 6:00 PM",
      phone: "+251 11 123 4569",
    },
  ]

  const requirements = [
    "Valid Ethiopian ID or Passport",
    "Proof of source of funds (for large amounts)",
    "Completed exchange form",
    "Minimum exchange amount: 100 ETB equivalent",
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Exchange Service?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience hassle-free currency exchange with competitive rates, secure transactions, and excellent customer
          service.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Branch Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Branch Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branches.map((branch, index) => (
                <div key={index} className="border-l-4 border-emerald-500 pl-4">
                  <h4 className="font-semibold text-gray-900">{branch.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{branch.address}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {branch.hours}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {branch.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Exchange Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                To complete your currency exchange, please ensure you have the following:
              </p>
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Badge variant="outline" className="mt-0.5 text-xs">
                    {index + 1}
                  </Badge>
                  <span className="text-sm text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h5 className="font-medium text-yellow-800 mb-2">Important Notes:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Exchanges above $1,000 USD equivalent require additional documentation</li>
                <li>• Rates are subject to change throughout the day</li>
                <li>• Large amount exchanges may require advance notice</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
