'use client'

import { Clock, Coffee, Mail, MapPin, Menu, Phone, QrCode } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#D1E9F6]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#F6EACB] via-[#EECAD5] to-[#F1D3CE]">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/80">
              <Coffee className="w-7 h-7 sm:w-8 sm:h-8 text-[#D1E9F6]" />
            </div>
          </div>
          <h1 className="text-center font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-3 sm:mb-4">
            The Grand Plate
          </h1>
          <p className="text-center font-inter text-[#2C3E50]/90 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-8">
            Your cozy corner for delicious food and great coffee
          </p>
          <div className="flex justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center px-6 py-3 bg-[#F6EACB] text-[#2C3E50] rounded-lg hover:bg-[#F1D3CE] transition-colors duration-300 font-inter shadow-sm hover:shadow-md"
            >
              <Menu className="w-5 h-5 mr-2" />
              View Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Digital Menu */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-[#EECAD5] hover:shadow-[#EECAD5]/50 transition-all duration-300">
            <div className="p-2 sm:p-3 rounded-lg bg-[#F6EACB] w-fit mb-3 sm:mb-4">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C3E50]" />
            </div>
            <h3 className="text-lg sm:text-xl font-playfair font-semibold text-[#2C3E50] mb-2">
              Digital Menu
            </h3>
            <p className="text-sm sm:text-base text-[#2C3E50]/80 font-inter">
              Browse our menu digitally with our QR code system. No more paper menus!
            </p>
          </div>

          {/* Easy Ordering */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-[#EECAD5] hover:shadow-[#EECAD5]/50 transition-all duration-300">
            <div className="p-2 sm:p-3 rounded-lg bg-[#F6EACB] w-fit mb-3 sm:mb-4">
              <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C3E50]" />
            </div>
            <h3 className="text-lg sm:text-xl font-playfair font-semibold text-[#2C3E50] mb-2">
              Easy Ordering
            </h3>
            <p className="text-sm sm:text-base text-[#2C3E50]/80 font-inter">
              Scan QR codes at your table to view our menu and place orders instantly.
            </p>
          </div>

          {/* Fresh & Local */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-[#EECAD5] hover:shadow-[#EECAD5]/50 transition-all duration-300">
            <div className="p-2 sm:p-3 rounded-lg bg-[#F6EACB] w-fit mb-3 sm:mb-4">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C3E50]" />
            </div>
            <h3 className="text-lg sm:text-xl font-playfair font-semibold text-[#2C3E50] mb-2">
              Fresh & Local
            </h3>
            <p className="text-sm sm:text-base text-[#2C3E50]/80 font-inter">
              Daily fresh ingredients sourced from local suppliers for the best quality.
            </p>
          </div>
        </div>
      </div>

      {/* Location & Contact Section */}
      <div className="bg-white border-t border-[#EECAD5]">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-playfair font-bold text-[#2C3E50]">Visit Us</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#F1D3CE] mt-1 mr-3" />
                  <div>
                    <h3 className="font-inter font-semibold text-[#2C3E50]">Address</h3>
                    <p className="text-sm sm:text-base text-[#2C3E50]/80 font-inter">123 Cafe Street, Downtown Area<br />City, State 12345</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#F1D3CE] mt-1 mr-3" />
                  <div>
                    <h3 className="font-inter font-semibold text-[#2C3E50]">Phone</h3>
                    <p className="text-sm sm:text-base text-[#2C3E50]/80 font-inter">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#F1D3CE] mt-1 mr-3" />
                  <div>
                    <h3 className="font-inter font-semibold text-[#2C3E50]">Email</h3>
                    <p className="text-sm sm:text-base text-[#2C3E50]/80 font-inter">info@thegrandplate.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#F1D3CE] mt-1 mr-3" />
                  <div>
                    <h3 className="font-inter font-semibold text-[#2C3E50]">Working Hours</h3>
                    <div className="text-sm sm:text-base text-[#2C3E50]/80 font-inter space-y-1">
                      <p>Monday - Friday: 7:00 AM - 10:00 PM</p>
                      <p>Saturday: 8:00 AM - 11:00 PM</p>
                      <p>Sunday: 8:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="h-[300px] sm:h-[400px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986532942815!3d40.69714941978971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
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
      <footer className="bg-white text-[#2C3E50] border-t border-[#EECAD5]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-[#2C3E50]/80 font-inter">© {new Date().getFullYear()} The Grand Plate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


