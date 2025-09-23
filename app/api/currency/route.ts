import { NextResponse } from "next/server"

// Mock exchange rates - in production, this would fetch from a real API like exchangerate-api.com
const mockRates = {
  USD: { rate: 56.85, change: 0.45 },
  EUR: { rate: 61.23, change: -0.23 },
  GBP: { rate: 71.45, change: 0.78 },
}

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Add some random fluctuation to simulate real-time changes
    const rates = Object.entries(mockRates).reduce(
      (acc, [currency, data]) => {
        const fluctuation = (Math.random() - 0.5) * 0.2 // ±0.1 variation
        acc[currency] = {
          rate: Number((data.rate + fluctuation).toFixed(2)),
          change: Number(((Math.random() - 0.5) * 2).toFixed(2)), // Random change between -1 and 1
          lastUpdated: new Date().toISOString(),
        }
        return acc
      },
      {} as Record<string, any>,
    )

    return NextResponse.json({
      success: true,
      data: rates,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch exchange rates" }, { status: 500 })
  }
}
