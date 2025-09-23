"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Star, Users } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const slides = [
  {
    id: 1,
    image: "/rammis-homepage.png",
    // image: "/modern-islamic-banking-office-with-ethiopian-profe.jpg",
    headline: "Banking with Integrity",
    subheadline: "Secure, interest-free financial services that align with your Islamic values",
    ctaPrimary: { text: "Open Account Today", href: "/customer-registration" },
    ctaSecondary: { text: "Learn More", href: "/about" },
  },
  {
    id: 2,
    image: "/ethiopian-family-planning-finances-with-islamic-ba.jpg",
    headline: "Your Financial Partner",
    subheadline: "Comprehensive Sharia-compliant solutions for families and businesses",
    ctaPrimary: { text: "Explore Services", href: "/services" },
    ctaSecondary: { text: "Contact Us", href: "/contact" },
  },
  {
    id: 3,
    image: "/modern-ethiopian-business-owner-using-islamic-bank.jpg",
    headline: "Grow Your Business",
    subheadline: "Ethical financing solutions to help your business reach new heights",
    ctaPrimary: { text: "Business Banking", href: "/services" },
    ctaSecondary: { text: "Calculate Rates", href: "/currency-exchange" },
  },
  {
    id: 4,
    image: "/ethiopian-couple-buying-home-with-islamic-mortgage.jpg",
    headline: "Dream Home Financing",
    subheadline: "Interest-free home financing that makes homeownership accessible",
    ctaPrimary: { text: "Home Financing", href: "/services" },
    ctaSecondary: { text: "Apply Now", href: "/customer-registration" },
  },
  {
    id: 5,
    image: "/ethiopian-community-members-using-digital-islamic-.jpg",
    headline: "Digital Banking Excellence",
    subheadline: "Modern technology meets traditional Islamic banking principles",
    ctaPrimary: { text: "Digital Services", href: "/login" },
    ctaSecondary: { text: "Mobile App", href: "/services" },
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="relative h-[600px] lg:h-[700px]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center h-full py-20">
                {/* Content */}
                <div className="space-y-8 z-10">
                  <div
                    className={`space-y-4 transition-all duration-1000 delay-300 ${
                      index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
                      {slide.headline.split(" ").map((word, i) => (
                        <span key={i} className={i === slide.headline.split(" ").length - 1 ? "text-blue-900" : ""}>
                          {word}{" "}
                        </span>
                      ))}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed text-pretty">{slide.subheadline}</p>
                  </div>

                  {/* Trust Indicators */}
                  <div
                    className={`flex items-center space-x-8 transition-all duration-1000 delay-500 ${
                      index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-blue-900" />
                      <span className="text-sm font-medium text-gray-700">Sharia Compliant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-blue-900" />
                      <span className="text-sm font-medium text-gray-700">Interest-Free</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-900" />
                      <span className="text-sm font-medium text-gray-700">Community Focused</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div
                    className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${
                      index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    <Button
                      size="lg"
                      className="bg-blue-900 text-white hover:bg-rammisLightBlue transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      asChild
                    >
                      <Link href={slide.ctaPrimary.href}>
                        {slide.ctaPrimary.text}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-rammisBlue text-rammisBlue hover:bg-rammisBlue hover:text-white bg-transparent transform hover:scale-105 transition-all duration-300"
                      asChild
                    >
                      <Link href={slide.ctaSecondary.href}>{slide.ctaSecondary.text}</Link>
                    </Button>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="relative">
                  <div
                    className={`aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-slate-100 shadow-2xl transition-all duration-1000 ${
                      index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  >
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={`${slide.headline} - Professional Islamic banking services`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating Stats */}
                  <div
                    className={`absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 border border-border transition-all duration-1000 delay-800 ${
                      index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="text-2xl font-bold text-rammisBlue">300K+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div
                    className={`absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-6 border border-border transition-all duration-1000 delay-900 ${
                      index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="text-2xl font-bold text-rammisBlue">100%</div>
                    <div className="text-sm text-gray-600">Sharia Compliant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-blue-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-blue-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-blue-900 scale-125" : "bg-blue-200 hover:bg-blue-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
