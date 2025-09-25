import Link from "next/link"
import Image from "next/image";
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Globe } from "lucide-react"

export function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Media & News", href: "/news" },
    { name: "Vacancy", href: "/vacancy" },
    { name: "Contact Us", href: "/contact" },
  ]

  const services = [
    { name: "Wadia Banking", href: "/services#wadia" },
    { name: "Business Financing", href: "/services#business" },
    { name: "Home Financing", href: "/services#home" },
    { name: "Personal Banking", href: "/services#personal" },
    { name: "Investment Services", href: "/services#investment" },
    { name: "Zakat Calculator", href: "/services#zakat" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ]

  return (
    <footer className="bg-rammisBlue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <div className="relative w-48 h-16 bg-white/10 backdrop-blur-sm  rounded-x1  flex items-center justify-center 
                                bg-gradient-to-r from-rammisBlue via-rammisLightBlue to-rammisLightBlue  /* nice deep-blue gradient */
                                shadow-lg shadow-black/50     /* deep light glow */
                                border border-gray-300/40      /* subtle outline */
                                hover:scale-105 hover:shadow-white/40  transition-all duration-300
                                outline-none 
                                ">
                <Image
                  src="/logo.png"      // or "/logo-white.png" for dark backgrounds
                  alt="Rammis Bank Logo"
                  width={192}
                  height={80}                 // important — image fills parent
                  priority             // optional — loads faster for header logos
                  className="object-contain drop-shadow-md"
                  sizes="192px"
                />
              </div>
            </Link>

            {/* <Link href="/" className="flex items-center space-x-2"> */}
            {/* <div className="w-10 h-10 bg-rammisBlue rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Rammis Bank</span>
                <span className="text-sm text-gray-300">Flow to the highest!</span>
              </div> */}
            {/* </Link> */}

            <p className="text-gray-300 text-sm leading-relaxed">
              Rammis Bank S.C a fully-fledged interest-free bank in Ethioia, was established on October 04, 2022, with a vision to become the hub of interest-free banking in East Africa.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-rammisLightBlue transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-rammisLightBlue transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-300 hover:text-rammisLightBlue transition-colors text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-100 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Bole Main Road, Flamingo Area, Rammis Tower</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-100 flex-shrink-0" />
                <span className="text-sm text-gray-300">011-562-1202</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-100 flex-shrink-0" />
                <span className="text-sm text-gray-300">info@rammisbank.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-100 flex-shrink-0" />
                <span className="text-sm text-gray-300 hover:underline">www.rammisbank.et</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-100 flex-shrink-0" />
                <span className="text-sm text-gray-300">Dial *678# for USSD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">© 2024 Rammis Bank. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-rammisLightBlue transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-rammisLightBlue transition-colors">
                Terms of Service
              </Link>
              <Link href="/compliance" className="hover:text-rammisLightBlue transition-colors">
                Sharia Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
