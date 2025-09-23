import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { CurrencyExchange } from "@/components/currency-exchange"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <CurrencyExchange />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}
