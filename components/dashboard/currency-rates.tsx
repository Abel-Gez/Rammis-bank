import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

export function CurrencyRates() {
  const rates = [
    { currency: "USD", rate: 56.85, change: 0.45, flag: "🇺🇸" },
    { currency: "EUR", rate: 61.23, change: -0.23, flag: "🇪🇺" },
    { currency: "GBP", rate: 71.45, change: 0.78, flag: "🇬🇧" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchange Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rates.map((rate, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{rate.flag}</span>
                <div>
                  <div className="font-medium">1 {rate.currency}</div>
                  <div className="text-sm text-gray-500">{rate.rate.toFixed(2)} ETB</div>
                </div>
              </div>
              <Badge
                variant={rate.change >= 0 ? "default" : "destructive"}
                className={rate.change >= 0 ? "bg-green-100 text-green-800" : ""}
              >
                {rate.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {rate.change >= 0 ? "+" : ""}
                {rate.change.toFixed(2)}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
