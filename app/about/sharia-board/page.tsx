import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ShariaAdvisor = {
  name: string
  title: string
  image?: string
}

const shariaAdvisors: ShariaAdvisor[] = [
  {
    name: "Sheikh Amin Ibro",
    title: "Chairperson",
    image: "/sharia_board_images/chairPerson_Sheikh_Amin.png",
  },
]

export default function ShariaBoardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-gray-400 to-teal-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <Badge className="bg-rammisBlue px-4 py-2 text-white">Sharia Board</Badge>
              <h1 className="text-balance text-4xl font-bold text-gray-900 lg:text-5xl">Guardians of Ethical Finance</h1>
              <p className="mx-auto max-w-3xl text-pretty text-lg text-gray-600">
                Our Sharia Board is entrusted with safeguarding the Islamic identity of every banking service we deliver to
                customers and communities.
              </p>
            </div>
          </div>
        </section>


        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">Sharia Board Members</h2>
            </div>

            <div className="mt-12 grid gap-8">
              {shariaAdvisors.map((advisor) => (
                <Card
                  key={advisor.name}
                  className="border border-rammisBlue/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:flex md:items-center md:gap-10"
                >
                  <CardContent className="space-y-3 p-6 text-center md:flex md:flex-1 md:items-center md:space-y-0 md:space-x-8 md:text-left">
                    {advisor.image ? (
                      <Image
                        src={advisor.image}
                        alt={advisor.name}
                        width={192}
                        height={192}
                        className="mx-auto h-40 w-40 rounded-full border border-rammisBlue/15 object-cover shadow-md md:mx-0"
                      />
                    ) : (
                      <div className="mx-auto h-40 w-40 rounded-full border border-rammisBlue/10 bg-gradient-to-br from-rammisBlue/15 to-rammisLightBlue/20 shadow-md md:mx-0" />
                    )}
                    <div className="flex-1 space-y-2">
                      <h3 className="text-2xl font-semibold text-rammisBlue">{advisor.name}</h3>
                      <p className="text-sm uppercase tracking-[0.3em] text-rammisBlue/60">{advisor.title}</p>
                      <p className="text-base text-slate-600">
                        Providing Sharia leadership across all Rammis Bank products, services, and customer experiences.
                      </p>
                    </div>
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
