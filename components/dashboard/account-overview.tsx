"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"

export function AccountOverview() {
  const [showBalance, setShowBalance] = useState(true)

  const accounts = [
    {
      name: "Current Account",
      number: "****1234",
      balance: 45750.0,
      currency: "ETB",
      change: 2.5,
      type: "primary",
    },
    {
      name: "Savings Account",
      number: "****5678",
      balance: 125000.0,
      currency: "ETB",
      change: 5.2,
      type: "savings",
    },
    {
      name: "Investment Account",
      number: "****9012",
      balance: 85000.0,
      currency: "ETB",
      change: -1.2,
      type: "investment",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Account Overview</h1>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span className="text-sm">{showBalance ? "Hide" : "Show"} Balance</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{account.name}</CardTitle>
              <Badge variant={account.type === "primary" ? "default" : "secondary"}>{account.number}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {showBalance ? `${account.balance.toLocaleString()} ${account.currency}` : "••••••••"}
                </div>
                <div className="flex items-center space-x-2">
                  {account.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ${account.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {account.change >= 0 ? "+" : ""}
                    {account.change}% this month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
