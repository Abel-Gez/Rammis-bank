"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import Link from "next/link"

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

export function CurrencyExchange() {
  const [rates, setRates] = useState<RatesData | null>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [loading, setLoading] = useState(false)

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
      // Fallback to mock data if API fails
      setRates({
        USD: { rate: 56.85, change: 0.45, lastUpdated: new Date().toISOString() },
        EUR: { rate: 61.23, change: -0.23, lastUpdated: new Date().toISOString() },
        GBP: { rate: 71.45, change: 0.78, lastUpdated: new Date().toISOString() },
      })
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchRates, 30000)
    return () => clearInterval(interval)
  }, [])

  const currencies = [
    { code: "USD", flag: "🇺🇸" },
    { code: "EUR", flag: "🇪🇺" },
    { code: "GBP", flag: "🇬🇧" },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-balance">Live Currency Exchange Rates</h2>
          <p className="text-lg text-gray-600 text-pretty">
            Get real-time exchange rates for Ethiopian Birr (ETB) against major currencies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {currencies.map((currency, index) => {
            const rateData = rates?.[currency.code as keyof RatesData]

            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="text-4xl mb-2">{currency.flag}</div>
                  <CardTitle className="text-2xl">1 {currency.code}</CardTitle>
                  <CardDescription>Ethiopian Birr</CardDescription>
                </CardHeader>
                <CardContent>
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

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>

          <div className="space-y-2">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/currency-exchange">View Full Exchange Service</Link>
            </Button>
            <p className="text-sm text-gray-600">
              Rates are indicative and subject to change. Visit our branches for actual transaction rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
