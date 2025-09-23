import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AccountOverview } from "@/components/dashboard/account-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { CurrencyRates } from "@/components/dashboard/currency-rates"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <AccountOverview />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <QuickActions />
              <RecentTransactions />
            </div>
            <div>
              <CurrencyRates />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
