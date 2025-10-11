"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, RefreshCw, Clock } from "lucide-react"

interface ExchangeRate {
  rate: number
  change: number
  lastUpdated: string
}

interface RatesData {
  USD: ExchangeRate
  EUR: ExchangeRate
  GBP: ExchangeRate
}

export function LiveRatesDisplay() {
  const [rates, setRates] = useState<RatesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)

  const fetchRates = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/currency")
      const result = await response.json()

      if (result.success) {
        setRates(result.data)
        setLastUpdated(new Date(result.timestamp))
      }
    } catch (error) {
      console.error("Failed to fetch rates:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setIsClient(true)
    fetchRates()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchRates, 30000)
    return () => clearInterval(interval)
  }, [])

  const currencies = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Live Exchange Rates</h2>
          <p className="text-gray-600 mt-2">Real-time rates for Ethiopian Birr (ETB)</p>
        </div>
        <div className="flex items-center space-x-4">
          {isClient && lastUpdated ? (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          ) : null}
          <Button variant="outline" size="sm" onClick={fetchRates} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {currencies.map((currency) => {
          const rateData = rates?.[currency.code as keyof RatesData]

          return (
            <Card key={currency.code} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-2">{currency.flag}</div>
                <CardTitle className="text-2xl">1 {currency.code}</CardTitle>
                <p className="text-sm text-gray-600">{currency.name}</p>
              </CardHeader>
              <CardContent className="text-center">
                {loading && !rateData ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                  </div>
                ) : rateData ? (
                  <>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{rateData.rate.toFixed(2)} ETB</div>
                    <Badge
                      variant={rateData.change >= 0 ? "default" : "destructive"}
                      className={rateData.change >= 0 ? "bg-green-100 text-green-800" : ""}
                    >
                      {rateData.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {rateData.change >= 0 ? "+" : ""}
                      {rateData.change.toFixed(2)}%
                    </Badge>
                  </>
                ) : (
                  <div className="text-red-500">Failed to load</div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Important Notice</h4>
            <p className="text-sm text-blue-800">
              These rates are indicative and for reference only. Actual transaction rates may vary. Please visit our
              branches or contact us for current transaction rates and to complete your exchange.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
