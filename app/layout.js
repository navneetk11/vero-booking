'use client'

import { useState } from 'react'
import { initialBookings } from '../lib/data'
import { BookingContext } from '../lib/BookingContext'
import './globals.css'

export default function RootLayout({ children }) {
  const [bookings, setBookings] = useState(initialBookings)

  return (
    <BookingContext.Provider value={{ bookings, setBookings }}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </BookingContext.Provider>
  )
}