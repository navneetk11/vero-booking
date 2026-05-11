'use client'
import Link from 'next/link'
import { useBookings } from '../../lib/BookingContext'
import { useState } from 'react'
import StatusBadge from '../../components/StatusBadge'

export default function AdminPage() {
  const [filter, setFilter] = useState('all')
  const { bookings, setBookings } = useBookings()

  function changeStatus(id, status) {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b))
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)
  const pending = bookings.filter(b => b.status === 'pending').length
  const confirmed = bookings.filter(b => b.status === 'confirmed').length

  return (
    <main style={{ maxWidth: 680, margin: '0 auto', padding: '20px 16px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#185FA5' }}>🩺 VeroBook — Admin</div>
        <Link href="/" style={{ fontSize: 13, color: '#185FA5', textDecoration: 'none' }}>← Patient view</Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'Total bookings', value: bookings.length },
          { label: 'Pending',        value: pending },
          { label: 'Confirmed',      value: confirmed },
        ].map(s => (
          <div key={s.label} style={{ background: '#f5f5f5', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#111' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '5px 14px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
              border: '1px solid #e0e0e0',
              background: filter === f ? '#185FA5' : 'white',
              color: filter === f ? 'white' : '#666',
              fontWeight: filter === f ? 500 : 400,
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#999', fontSize: 13 }}>
          No bookings found
        </div>
      ) : (
        filtered.map(b => (
          <div key={b.id} style={{
            background: 'white', border: '1px solid #e0e0e0', borderRadius: 12,
            padding: '14px 16px', marginBottom: 10,
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'space-between', gap: 12,
          }}>

            {/* Left - patient info */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{b.patient}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{b.doctor} · {b.time}, {b.date}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{b.reason}</div>
              <div style={{ marginTop: 6 }}>
                <StatusBadge type="urgency" value={b.urgency} />
              </div>
            </div>

            {/* Right - status + actions */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <StatusBadge type="status" value={b.status} />

              {b.status === 'pending' && (
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => changeStatus(b.id, 'confirmed')}
                    style={{
                      padding: '5px 10px', fontSize: 12, borderRadius: 8, cursor: 'pointer',
                      border: '1px solid #C0DD97', background: '#EAF3DE', color: '#3B6D11',
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => changeStatus(b.id, 'cancelled')}
                    style={{
                      padding: '5px 10px', fontSize: 12, borderRadius: 8, cursor: 'pointer',
                      border: '1px solid #F7C1C1', background: '#FCEBEB', color: '#A32D2D',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {b.status === 'confirmed' && (
                <button
                  onClick={() => changeStatus(b.id, 'cancelled')}
                  style={{
                    padding: '5px 10px', fontSize: 12, borderRadius: 8, cursor: 'pointer',
                    border: '1px solid #F7C1C1', background: '#FCEBEB', color: '#A32D2D',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </main>
  )
}