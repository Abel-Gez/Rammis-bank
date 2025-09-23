"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Calendar, BarChart3 } from "lucide-react"

export function ExchangeHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  // Mock historical data
  const historicalData = {
    USD: [
      { date: "2024-01-15", rate: 56.85, change: 0.45 },
      { date: "2024-01-14", rate: 56.4, change: -0.23 },
      { date: "2024-01-13", rate: 56.63, change: 0.78 },
      { date: "2024-01-12", rate: 55.85, change: -0.12 },
      { date: "2024-01-11", rate: 55.97, change: 0.34 },
      { date: "2024-01-10", rate: 55.63, change: 0.56 },
      { date: "2024-01-09", rate: 55.07, change: -0.89 },
    ],
    EUR: [
      { date: "2024-01-15", rate: 61.23, change: -0.23 },
      { date: "2024-01-14", rate: 61.46, change: 0.45 },
      { date: "2024-01-13", rate: 61.01, change: -0.34 },
      { date: "2024-01-12", rate: 61.35, change: 0.67 },
      { date: "2024-01-11", rate: 60.68, change: -0.45 },
      { date: "2024-01-10", rate: 61.13, change: 0.23 },
      { date: "2024-01-09", rate: 60.9, change: 0.12 },
    ],
    GBP: [
      { date: "2024-01-15", rate: 71.45, change: 0.78 },
      { date: "2024-01-14", rate: 70.67, change: -0.56 },
      { date: "2024-01-13", rate: 71.23, change: 0.34 },
      { date: "2024-01-12", rate: 70.89, change: 0.23 },
      { date: "2024-01-11", rate: 70.66, change: -0.78 },
      { date: "2024-01-10", rate: 71.44, change: 0.45 },
      { date: "2024-01-09", rate: 70.99, change: -0.23 },
    ],
  }

  const currencies = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  ]

  const periods = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" },
  ]

  const currentData = historicalData[selectedCurrency as keyof typeof historicalData] || []
  const currentRate = currentData[0]?.rate || 0
  const previousRate = currentData[1]?.rate || 0
  const overallChange = currentRate - previousRate
  const overallChangePercent = previousRate ? (overallChange / previousRate) * 100 : 0

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Exchange Rate History</h2>
          <p className="text-gray-600 mt-2">Track historical exchange rate trends</p>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center space-x-2">
                    <span>{currency.flag}</span>
                    <span>{currency.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Rate Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BarChart3 className="w-5 h-5 mr-2" />
              Current Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">{currentRate.toFixed(2)} ETB</div>
                <div className="text-sm text-gray-600">1 {selectedCurrency}</div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant={overallChange >= 0 ? "default" : "destructive"}
                  className={overallChange >= 0 ? "bg-green-100 text-green-800" : ""}
                >
                  {overallChange >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {overallChange >= 0 ? "+" : ""}
                  {overallChangePercent.toFixed(2)}%
                </Badge>
                <span className="text-sm text-gray-500">vs yesterday</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rate History Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2" />
              Rate History - {selectedCurrency}/ETB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {currentData.map((entry, index) => (
                <div key={entry.date} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{entry.rate.toFixed(2)} ETB</div>
                    </div>

                    <Badge
                      variant={entry.change >= 0 ? "default" : "destructive"}
                      className={`w-20 justify-center ${entry.change >= 0 ? "bg-green-100 text-green-800" : ""}`}
                    >
                      {entry.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {entry.change >= 0 ? "+" : ""}
                      {entry.change.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <h3 className="font-semibold text-emerald-900 mb-2">Rate Analysis</h3>
        <p className="text-emerald-800 text-sm">
          The {selectedCurrency}/ETB exchange rate has shown {overallChange >= 0 ? "positive" : "negative"} movement
          over the selected period. Historical data shows typical daily fluctuations between 0.1% to 1.5%. For the most
          accurate rates for your transaction, please contact our branches directly.
        </p>
      </div>
    </div>
  )
}
