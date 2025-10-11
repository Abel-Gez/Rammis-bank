import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Executive = {
  name: string
  title: string
  focus: string
}

const executives: Executive[] = [
  {
    name: "Ali Ahmed",
    title: "Chief Executive Officer",
    focus: "Guides corporate vision, strategic partnerships, and sustainable growth for the bank.",
  },
  {
    name: "Fatima Al-Zahra",
    title: "Chief Corporate Service Officer",
    focus: "Leads shared services, procurement, and facilities to empower frontline teams.",
  },
  {
    name: "Dr. Ibrahim Yusuf",
    title: "Chief Banking Operations Officer",
    focus: "Drives operational excellence, service delivery, and Sharia-aligned process optimization.",
  },
  {
    name: "Hassan Abdella",
    title: "Chief Risk & Compliance Officer",
    focus: "Oversees enterprise risk, regulatory compliance, and Sharia governance frameworks.",
  },
  {
    name: "Maryam Bekele",
    title: "Chief Strategy & Innovation Officer",
    focus: "Champions digital initiatives and customer-centric product development.",
  },
  {
    name: "Yusuf Mohammed",
    title: "Chief Corporate Affairs Officer",
    focus: "Cultivates stakeholder relations and leads corporate communications and CSR programs.",
  },
]

export default function ExecutiveManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-gray-400 to-teal-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <Badge className="bg-rammisBlue px-4 py-2 text-white">Executive Management</Badge>
              <h1 className="text-balance text-4xl font-bold text-gray-900 lg:text-5xl">Leadership Driven by Purpose</h1>
              <p className="mx-auto max-w-3xl text-pretty text-lg text-gray-600">
                From strategy to service delivery, our executives champion ethical banking and operational excellence across
                every channel.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-rammisBlue">Empowering Teams & Communities</h2>
                <p className="text-lg leading-relaxed text-slate-600">
                  Our executive team brings together decades of expertise in banking, governance, and technology. They ensure
                  that strategic goals translate into tangible benefits for customers and communities while upholding Sharia
                  values.
                </p>
                <p className="text-lg leading-relaxed text-slate-600">
                  Guided by collaborative leadership, they nurture a culture of innovation, accountability, and service
                  excellence that powers every branch, digital channel, and partnership at Rammis Bank.
                </p>
              </div>
              <div className="rounded-3xl border border-rammisBlue/10 bg-slate-50/80 p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-rammisBlue">Leadership Principles</h3>
                <ul className="mt-6 space-y-4 text-slate-600">
                  <li>
                    <span className="font-semibold text-rammisBlue">Integrity & Accountability:</span> Decisions grounded in transparency and responsible stewardship.
                  </li>
                  <li>
                    <span className="font-semibold text-rammisBlue">Customer Centricity:</span> Designing services that reflect the diverse aspirations of our communities.
                  </li>
                  <li>
                    <span className="font-semibold text-rammisBlue">Innovation & Agility:</span> Embracing change to deliver modern, Sharia-compliant financial solutions.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">Executive Team</h2>
              <p className="mt-4 text-lg text-gray-600">Experienced leaders delivering strategy, service, and Sharia compliance.</p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {executives.map((executive) => (
                <Card key={executive.name} className="border border-rammisBlue/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="space-y-4 p-6 text-center">
                    <div className="mx-auto h-20 w-20 rounded-full border border-rammisBlue/10 bg-gradient-to-br from-rammisBlue/15 to-rammisLightBlue/20" />
                    <div>
                      <h3 className="text-xl font-semibold text-rammisBlue">{executive.name}</h3>
                      <p className="text-sm uppercase tracking-wide text-rammisBlue/60">{executive.title}</p>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{executive.focus}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
