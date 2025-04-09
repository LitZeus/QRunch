'use client'

import { useEffect, useState } from 'react'

const images = [
  '/hotel-photos/hero-1.jpg',
  '/hotel-photos/hero-2.jpg',
  '/hotel-photos/hero-3.jpg',
  '/hotel-photos/hero-4.jpg'
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F6EACB]/90 via-[#EECAD5]/90 to-[#F1D3CE]/90 z-10" />
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
    </div>
  )
} 