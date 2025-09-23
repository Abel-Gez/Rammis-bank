import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CurrencyExchangeCalculator } from "@/components/currency-exchange/currency-exchange-calculator"
import { LiveRatesDisplay } from "@/components/currency-exchange/live-rates-display"
import { ExchangeHistory } from "@/components/currency-exchange/exchange-history"
import { ExchangeInfo } from "@/components/currency-exchange/exchange-info"

export default function CurrencyExchangePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-balance">Currency Exchange Services</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Get competitive exchange rates for Ethiopian Birr (ETB) against major international currencies.
                Real-time rates updated every minute.
              </p>
            </div>
          </div>
        </section>

        {/* Live Rates */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LiveRatesDisplay />
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CurrencyExchangeCalculator />
          </div>
        </section>

        {/* Exchange Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ExchangeInfo />
          </div>
        </section>

        {/* Exchange History */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ExchangeHistory />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
