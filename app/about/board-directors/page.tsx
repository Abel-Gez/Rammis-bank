import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Director = {
  name: string
  title: string
  image?: string
}

const directors: Director[] = [
  {
    name: "Rabi SheikHussein Yusuf",
    title: "Chairperson",
    image: "/board_images/chairPerson.png",
  },
  {
    name: "Muluka Mohammed Hussen",
    title: "Deputy chairperson",
    image: "/board_images/Deputy_chairPerson.png",
  },
  {
    name: "Dr. Fuad Usmael Ysuf",
    title: "Board Member",
    image: "/board_images/board_Memb_Dr.Fuad.png",
  },
  {
    name: "Adugna Ahmed Usso",
    title: "Board Member",
    image: "/board_images/board_Memb_Adugna.png",
  },
  {
    name: "Juneydi Ousman Issa",
    title: "Board Member",
    image: "/board_images/board_Memb_Juneydi.png ",
  },
]

export default function BoardDirectorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-gray-400 to-teal-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <Badge className="bg-rammisBlue px-4 py-2 text-white">Board of Directors</Badge>
              <h1 className="text-balance text-4xl font-bold text-gray-900 lg:text-5xl">Visionary Governance in Action</h1>
              <p className="mx-auto max-w-3xl text-pretty text-lg text-gray-600">
                Our Board brings together seasoned executives and respected scholars dedicated to steering Rammis Bank with
                integrity, accountability, and business wisdom.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">Board Members</h2>
              <p className="mt-4 text-lg text-gray-600">A collective of leaders committed to principled growth.</p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {directors.map((director) => (
                <Card key={director.name} className="border border-rammisBlue/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="space-y-4 p-6 text-center">
                    {director.image ? (
                      <Image
                        src={director.image}
                        alt={director.name}
                        width={128}
                        height={128}
                        className="mx-auto h-32 w-32 rounded-full border border-rammisBlue/15 object-cover shadow-md"
                      />
                    ) : (
                      <div className="mx-auto h-32 w-32 rounded-full border border-rammisBlue/10 bg-gradient-to-br from-rammisBlue/15 to-rammisLightBlue/20 shadow-md" />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-rammisBlue">{director.name}</h3>
                      <p className="text-sm uppercase tracking-wide text-rammisBlue/60">{director.title}</p>
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
