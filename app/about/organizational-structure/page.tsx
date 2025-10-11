import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Workflow, Cpu, UsersRound, ShieldCheck, Gauge } from "lucide-react"

export default function OrganizationalStructurePage() {
  const coreUnits = [
    {
      icon: Building2,
      title: "Corporate Leadership",
      description:
        "Steers strategic direction, oversees governance, and ensures every decision aligns with our mission and values.",
    },
    {
      icon: UsersRound,
      title: "Retail & SME Banking",
      description:
        "Delivers accessible products for individuals and entrepreneurs through our growing branch network.",
    },
    {
      icon: Workflow,
      title: "Corporate Banking",
      description:
        "Partners with large organizations to provide structured financing, treasury solutions, and advisory services.",
    },
    {
      icon: Cpu,
      title: "Digital Banking & Innovation",
      description:
        "Designs omnichannel experiences by integrating emerging technologies with Sharia-compliant products.",
    },
  ]

  const supportUnits = [
    {
      icon: ShieldCheck,
      title: "Risk & Compliance",
      description:
        "Safeguards the bank through vigilant risk management, regulatory compliance, and Sharia oversight.",
    },
    {
      icon: UsersRound,
      title: "Human Capital",
      description:
        "Builds high-performing teams with continuous learning, talent development, and values-based culture programs.",
    },
    {
      icon: Gauge,
      title: "Support Services",
      description:
        "Keeps daily operations running smoothly through finance, procurement, facility, and administrative excellence.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-gray-400 to-teal-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <Badge className="bg-rammisBlue px-4 py-2 text-white">Organizational Structure</Badge>
              <h1 className="text-balance text-4xl font-bold text-gray-900 lg:text-5xl">Aligned Teams. Unified Purpose.</h1>
              <p className="mx-auto max-w-3xl text-pretty text-lg text-gray-600">
                Our structure empowers rapid decision-making, collaborative delivery, and uncompromising Sharia compliance across
                every department.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-rammisBlue">Governance in Motion</h2>
                <p className="text-lg leading-relaxed text-slate-600">
                  At Rammis Bank, leadership, boards, and operating teams collaborate closely to uphold ethical banking. The structure
                  integrates Sharia advisory with modern governance to ensure every product and process reflects our core values.
                </p>
                <p className="text-lg leading-relaxed text-slate-600">
                  Cross-functional squads connect strategy to service delivery, enabling us to respond quickly to community needs while
                  maintaining rigorous oversight.
                </p>
              </div>
              <div className="rounded-3xl border border-rammisBlue/10 bg-slate-50/80 p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-rammisBlue">Structure Highlights</h3>
                <ul className="mt-6 space-y-4 text-slate-600">
                  <li>
                    <span className="font-semibold text-rammisBlue">Board Alignment:</span> Board of Directors and Sharia Board work in tandem on strategy and compliance.
                  </li>
                  <li>
                    <span className="font-semibold text-rammisBlue">Empowered Regions:</span> Regional leadership adapts services to local communities while following central policies.
                  </li>
                  <li>
                    <span className="font-semibold text-rammisBlue">Integrated Operations:</span> Shared services connect risk, finance, technology, and human capital teams.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

         {/* Organizational Structure */}
         <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Organizational Structure</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our organizational structure ensures efficient decision-making and clear responsibilities across all departments.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-[1054px]">
                <img
                  src="/org_structure.png" // replace with your actual image path
                  alt="Organizational Structure"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">Core Business Units</h2>
              <p className="mt-4 text-lg text-gray-600">Specialized teams delivering Sharia-compliant products to every customer segment.</p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {coreUnits.map((unit) => {
                const Icon = unit.icon
                return (
                  <Card key={unit.title} className="border border-rammisBlue/10 bg-white shadow-sm">
                    <CardContent className="space-y-4 p-6">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rammisLightBlue/15 text-rammisBlue">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="text-lg font-semibold text-rammisBlue">{unit.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{unit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
