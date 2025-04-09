'use client'

import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import { ArrowRight, Clock, Mail, MapPin, Phone, Utensils } from 'lucide-react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [heroImages, setHeroImages] = useState<string[]>([])
  const [storyImages, setStoryImages] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const [heroPhotos, storyPhotos] = await Promise.all([
          getPhotosFromDirectory('hotel-photos'),
          getPhotosFromDirectory('story-photos')
        ])
        setHeroImages(heroPhotos)
        setStoryImages(storyPhotos)
      } catch (error) {
        console.error('Error fetching photos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  useEffect(() => {
    document.title = 'Verandah - Fine Dining Restaurant'
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A6B57]"></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Verandah - Fine Dining Restaurant</title>
        <meta name="description" content="Experience exquisite dining at Verandah - Where culinary excellence meets warm hospitality" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-[#F0E6D2] relative">
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10 pointer-events-none" />
            {/* Hero Section with Integrated Photos */}
        <div className="relative h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-3 md:px-8 lg:px-12">
            <div className="flex justify-center mb-3 md:mb-6 lg:mb-8">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 backdrop-blur-sm">
                <Utensils className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-[#4A6B57]" />
              </div>
            </div>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-3 md:mb-6 drop-shadow-lg">
              Verandah
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-white/90 max-w-xl md:max-w-2xl mb-4 md:mb-8 drop-shadow-md">
              Experience the perfect blend of traditional flavors and modern dining at Verandah
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg bg-[#4A6B57] text-white hover:bg-[#4A6B57]/90 transition-colors shadow-lg"
            >
              <span>View Menu</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </Link>
          </div>
        </div>

        {/* About Us Section */}
        <div className="relative py-8 md:py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F0E6D2] to-[#F5F5F5] opacity-50" />
          <div className="relative max-w-7xl mx-auto px-3 md:px-8 lg:px-12">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="font-playfair text-xl md:text-3xl lg:text-4xl font-bold text-[#4A6B57] mb-3">
                Our Story
              </h2>
              <div className="w-16 md:w-24 h-1 bg-[#4A6B57] mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-3 md:space-y-6">
                <p className="text-sm md:text-lg text-[#4A6B57]/90 font-inter leading-relaxed text-justify">
                  Welcome to Verandah, where culinary excellence meets warm hospitality. Our journey began with a simple vision: to create a dining experience that celebrates both tradition and innovation.
                </p>
                <p className="text-sm md:text-lg text-[#4A6B57]/90 font-inter leading-relaxed text-justify">
                  Nestled in the heart of the city, our restaurant offers a perfect blend of contemporary ambiance and timeless flavors. Our chefs craft each dish with passion, using the finest ingredients to create memorable dining experiences.
                </p>
                <p className="text-sm md:text-lg text-[#4A6B57]/90 font-inter leading-relaxed text-justify">
                  At Verandah, we believe in creating moments that linger in your memory long after your visit. Whether it's a casual lunch, a romantic dinner, or a special celebration, we're here to make every occasion extraordinary.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {storyImages.map((image, index) => (
                  <div key={index} className="relative h-40 md:h-48 lg:h-64 rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src={image}
                      alt={`Verandah Story ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="relative py-16 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F0E6D2] to-[#F5F5F5] opacity-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-playfair text-2xl sm:text-3xl font-bold text-[#4A6B57] mb-6 sm:mb-8">
              Guest Reviews
            </h2>
            <div className="max-w-3xl mx-auto">
              <TestimonialsCarousel />
            </div>
          </div>
        </div>

        {/* Location & Contact Section */}
        <div className="relative bg-white border-t border-[#E8D5B5]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F0E6D2] to-[#F5F5F5] opacity-50" />
          <div className="relative max-w-7xl mx-auto px-3 py-8 sm:py-20 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-playfair font-bold text-[#4A6B57]">Visit Us</h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-xl text-[#4A6B57]/70 max-w-2xl mx-auto">
                Experience the perfect blend of ambiance and culinary excellence
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
              {/* Contact Information */}
              <div className="space-y-8 sm:space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mb-4">
                  {/* Address Card */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-8 shadow-sm border border-[#E8D5B5]/50">
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <div className="bg-[#4A6B57]/10 p-2 sm:p-3 rounded-full">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A6B57]" />
                      </div>
                    </div>
                    <h3 className="font-inter font-semibold text-[#4A6B57] text-lg sm:text-xl text-center mb-2 sm:mb-3">Address</h3>
                    <p className="text-sm sm:text-base text-[#4A6B57]/80 font-inter leading-relaxed text-center">
                      Mehendale Garage Compound,<br />
                      31/1, Gulawani Maharaj Road,<br />
                      Pandurang Colony, Erandwane,<br />
                      Pune, Maharashtra 411004
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Contact Card */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-8 shadow-sm border border-[#E8D5B5]/50">
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <div className="bg-[#4A6B57]/10 p-2 sm:p-3 rounded-full">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A6B57]" />
                      </div>
                    </div>
                    <h3 className="font-inter font-semibold text-[#4A6B57] text-lg sm:text-xl text-center mb-2 sm:mb-3">Contact Us</h3>
                    <div className="flex flex-col items-center space-y-3">
                      <a 
                        href="https://wa.me/919607420066" 
                        className="flex items-center gap-2 text-base text-[#4A6B57]/80 font-inter hover:text-[#3A5A47] transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        +91 9607420066
                      </a>
                      <a 
                        href="mailto:info@verandahpune.com" 
                        className="flex items-center gap-2 text-base text-[#4A6B57]/80 font-inter hover:text-[#3A5A47] transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        info@verandahpune.com
                      </a>
                    </div>
                  </div>
                  
                  {/* Working Hours Card */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-8 shadow-sm border border-[#E8D5B5]/50">
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      <div className="bg-[#4A6B57]/10 p-2 sm:p-3 rounded-full">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A6B57]" />
                      </div>
                    </div>
                    <h3 className="font-inter font-semibold text-[#4A6B57] text-lg sm:text-xl text-center mb-2 sm:mb-3">Working Hours</h3>
                    <div className="text-sm sm:text-base text-[#4A6B57]/80 font-inter space-y-2 text-center">
                      <p>Monday - Friday: 7:00 AM - 10:00 PM</p>
                      <p>Saturday: 8:00 AM - 11:00 PM</p>
                      <p>Sunday: 8:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="h-[500px] sm:h-[600px] lg:h-full rounded-xl overflow-hidden shadow-xl border border-[#E8D5B5]/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.202201201201!2d73.8315313!3d18.5051357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfc952fa8e73:0x6b8677bf91ecbbc4!2sVerandah!5e0!3m2!1sen!2sin!4v1641234567890!5m2!1sen!2sin&center=18.5051357,73.8315313&zoom=17"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative bg-white text-[#4A6B57] border-t border-[#E8D5B5]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F0E6D2] to-[#F5F5F5] opacity-50" />
          <div className="relative max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-[#4A6B57]/80 font-inter">© {new Date().getFullYear()} Verandah. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Function to get all photos from a directory
const getPhotosFromDirectory = async (directory: string) => {
  try {
    const response = await fetch(`/api/photos?directory=${directory}`)
    if (!response.ok) throw new Error('Failed to fetch photos')
    const data = await response.json()
    return data.photos
  } catch (error) {
    console.error('Error fetching photos:', error)
    return []
  }
}


