"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Calculator } from "lucide-react"

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

export function CurrencyExchangeCalculator() {
  const [rates, setRates] = useState<RatesData | null>(null)
  const [fromCurrency, setFromCurrency] = useState("ETB")
  const [toCurrency, setToCurrency] = useState("USD")
  const [fromAmount, setFromAmount] = useState("1000")
  const [toAmount, setToAmount] = useState("0")

  const currencies = [
    { code: "ETB", name: "Ethiopian Birr", flag: "🇪🇹" },
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  ]

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/currency")
        const result = await response.json()
        if (result.success) {
          setRates(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch rates:", error)
      }
    }

    fetchRates()
  }, [])

  useEffect(() => {
    if (rates && fromAmount) {
      calculateExchange()
    }
  }, [rates, fromCurrency, toCurrency, fromAmount])

  const calculateExchange = () => {
    if (!rates || !fromAmount) return

    const amount = Number.parseFloat(fromAmount) || 0
    let result = 0

    if (fromCurrency === "ETB" && toCurrency !== "ETB") {
      // ETB to foreign currency
      const rate = rates[toCurrency as keyof RatesData]?.rate || 1
      result = amount / rate
    } else if (fromCurrency !== "ETB" && toCurrency === "ETB") {
      // Foreign currency to ETB
      const rate = rates[fromCurrency as keyof RatesData]?.rate || 1
      result = amount * rate
    } else if (fromCurrency !== "ETB" && toCurrency !== "ETB") {
      // Foreign currency to foreign currency (via ETB)
      const fromRate = rates[fromCurrency as keyof RatesData]?.rate || 1
      const toRate = rates[toCurrency as keyof RatesData]?.rate || 1
      const etbAmount = amount * fromRate
      result = etbAmount / toRate
    } else {
      // ETB to ETB
      result = amount
    }

    setToAmount(result.toFixed(2))
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Currency Calculator</h2>
        <p className="text-gray-600">Calculate exchange amounts with live rates</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Exchange Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* From Currency */}
          <div className="space-y-2">
            <Label htmlFor="fromAmount">From</Label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  id="fromAmount"
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="text-lg"
                />
              </div>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
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
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={swapCurrencies}
              className="rounded-full w-10 h-10 p-0 bg-transparent"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          {/* To Currency */}
          <div className="space-y-2">
            <Label htmlFor="toAmount">To</Label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input id="toAmount" type="number" value={toAmount} readOnly className="text-lg bg-gray-50" />
              </div>
              <Select value={toCurrency} onValueChange={setToCurrency}>
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
            </div>
          </div>

          {/* Exchange Rate Info */}
          {rates && fromCurrency !== toCurrency && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="text-sm text-emerald-800">
                <strong>Exchange Rate:</strong> 1 {fromCurrency} ={" "}
                {fromCurrency === "ETB" && toCurrency !== "ETB"
                  ? (1 / (rates[toCurrency as keyof RatesData]?.rate || 1)).toFixed(4)
                  : fromCurrency !== "ETB" && toCurrency === "ETB"
                    ? (rates[fromCurrency as keyof RatesData]?.rate || 1).toFixed(2)
                    : fromCurrency !== "ETB" && toCurrency !== "ETB"
                      ? (
                          (rates[fromCurrency as keyof RatesData]?.rate || 1) /
                          (rates[toCurrency as keyof RatesData]?.rate || 1)
                        ).toFixed(4)
                      : "1.00"}{" "}
                {toCurrency}
              </div>
            </div>
          )}

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Visit Branch to Exchange</Button>
        </CardContent>
      </Card>
    </div>
  )
}
