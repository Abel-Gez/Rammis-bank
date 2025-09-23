import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Download, CreditCard, Calculator, Building2, Phone } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      icon: Send,
      title: "Transfer Money",
      description: "Send money to other accounts",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Download,
      title: "Download Statement",
      description: "Get your account statement",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: CreditCard,
      title: "Apply for Card",
      description: "Request a new debit card",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Calculator,
      title: "Zakat Calculator",
      description: "Calculate your Zakat",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Building2,
      title: "Loan Application",
      description: "Apply for financing",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Phone,
      title: "Contact Support",
      description: "Get help from our team",
      color: "bg-red-100 text-red-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gray-50"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
