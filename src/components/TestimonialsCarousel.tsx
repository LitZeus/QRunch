'use client'

import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

const testimonials = [
  {
    name: "Rahul Sharma",
    rating: 5,
    review: "Amazing place with great ambiance and delicious food. The service was excellent and the staff was very attentive. Perfect for family gatherings and special occasions.",
    date: "2 weeks ago"
  },
  {
    name: "Priya Patel",
    rating: 5,
    review: "The best dining experience in Pune! The food was outstanding and the presentation was beautiful. The staff made us feel special throughout our visit.",
    date: "1 month ago"
  },
  {
    name: "Arjun Mehta",
    rating: 5,
    review: "Exceptional service and amazing food. The ambiance is perfect for a romantic dinner. The staff went above and beyond to make our anniversary special.",
    date: "3 weeks ago"
  },
  {
    name: "Neha Gupta",
    rating: 5,
    review: "The attention to detail in every dish is remarkable. The wine selection is excellent and the desserts are to die for. Will definitely come back again!",
    date: "2 months ago"
  },
  {
    name: "Suresh Kumar",
    rating: 5,
    review: "One of the best fine dining experiences in Pune. The food quality and presentation are top-notch. The staff is well-trained and very professional.",
    date: "1 week ago"
  }
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full flex-shrink-0 px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-[#2C3E50] mb-4 italic">&ldquo;{testimonial.review}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F1D3CE] mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-[#2C3E50]">{testimonial.name}</h4>
                    <p className="text-sm text-[#2C3E50]/70">Verified Guest</p>
                  </div>
                </div>
                <p className="text-sm text-[#2C3E50]/70">{testimonial.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-[#2C3E50]' : 'bg-[#2C3E50]/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}