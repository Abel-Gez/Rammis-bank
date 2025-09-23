import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Building2, ShoppingCart, Fuel, Coffee } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      type: "credit",
      description: "Salary Deposit",
      amount: 25000,
      date: "2024-01-15",
      icon: Building2,
      status: "completed",
    },
    {
      id: 2,
      type: "debit",
      description: "Grocery Shopping",
      amount: -1250,
      date: "2024-01-14",
      icon: ShoppingCart,
      status: "completed",
    },
    {
      id: 3,
      type: "debit",
      description: "Fuel Station",
      amount: -800,
      date: "2024-01-13",
      icon: Fuel,
      status: "completed",
    },
    {
      id: 4,
      type: "debit",
      description: "Coffee Shop",
      amount: -150,
      date: "2024-01-12",
      icon: Coffee,
      status: "pending",
    },
    {
      id: 5,
      type: "credit",
      description: "Investment Return",
      amount: 3500,
      date: "2024-01-11",
      icon: ArrowUpRight,
      status: "completed",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const Icon = transaction.icon
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{transaction.description}</div>
                    <div className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount.toLocaleString()} ETB
                  </div>
                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
