'use client'
import Link from 'next/link'
import { useBookings } from '../lib/BookingContext'
import { useState } from 'react'
import { doctors, timeSlots } from '../lib/data'
import DoctorCard from '../components/DoctorCard'
import SlotPicker from '../components/SlotPicker'
import StatusBadge from '../components/StatusBadge'

const urgencyKeywords = {
  high: ['chest pain', 'chest pressure', 'heart', 'shortness of breath', 'difficulty breathing', 'severe', 'unconscious', 'stroke', 'vomiting blood', 'collapsed', 'fainting'],
  medium: ['fever', 'dizzy', 'dizziness', 'persistent', 'infection', 'swelling', 'fatigue', 'moderate', 'headache', 'nausea'],
}

function getUrgency(text) {
  const t = text.toLowerCase()
  for (const k of urgencyKeywords.high) if (t.includes(k)) return 'high'
  for (const k of urgencyKeywords.medium) if (t.includes(k)) return 'medium'
  return 'low'
}

function getUrgencyMessage(urgency) {
  if (urgency === 'high') return { bg: '#FCEBEB', color: '#A32D2D', msg: 'High urgency — book earliest slot or visit urgent care' }
  if (urgency === 'medium') return { bg: '#FAEEDA', color: '#854F0B', msg: 'Moderate — book within the next few days' }
  return { bg: '#EAF3DE', color: '#3B6D11', msg: 'Routine — any available slot works' }
}

export default function Home() {
  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [symptoms, setSymptoms] = useState('')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', reason: '' })
  const [submitted, setSubmitted] = useState(false)
  const { bookings, setBookings } = useBookings()

  const urgency = symptoms.length > 5 ? getUrgency(symptoms) : null
  const urgencyMsg = urgency ? getUrgencyMessage(urgency) : null

  function handleBook() {
    const newBooking = {
      id: bookings.length + 1,
      patient: `${form.firstName} ${form.lastName}`.trim(),
      doctor: selectedDoctor.name,
      time: selectedSlot.time,
      date: 'May 12',
      reason: form.reason || 'General visit',
      status: 'pending',
      urgency: urgency || 'low',
    }
    setBookings([newBooking, ...bookings])
    setSubmitted(true)
  }

  function resetFlow() {
    setStep(1)
    setSelectedDoctor(null)
    setSelectedSlot(null)
    setSymptoms('')
    setForm({ firstName: '', lastName: '', email: '', phone: '', reason: '' })
    setSubmitted(false)
  }

  return (
    <main style={{ maxWidth: 500, margin: '0 auto', padding: '20px 16px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#185FA5' }}>🩺 VeroBook</div>
        <Link href="/admin" style={{ fontSize: 13, color: '#185FA5', textDecoration: 'none' }}>Admin view →</Link>
      </div>

      {/* Step indicator */}
      {!submitted && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 500,
                background: step > s ? '#185FA5' : step === s ? '#E6F1FB' : '#f0f0f0',
                color: step > s ? 'white' : step === s ? '#185FA5' : '#999',
                border: step === s ? '2px solid #185FA5' : '2px solid transparent',
              }}>
                {step > s ? '✓' : s}
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: '#e0e0e0', margin: '0 6px' }} />}
            </div>
          ))}
        </div>
      )}

      {/* Step 1 - Choose Doctor */}
      {step === 1 && !submitted && (
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Choose a physician</div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Select the doctor you'd like to see</div>

          {doctors.map(doc => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              selected={selectedDoctor?.id === doc.id}
              onSelect={setSelectedDoctor}
            />
          ))}

          {/* AI Symptom Triage */}
          <div style={{ background: '#EEEDFE', border: '1px solid #AFA9EC', borderRadius: 12, padding: 14, marginTop: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#3C3489', marginBottom: 8 }}>✨ AI symptom triage</div>
            <textarea
              rows={2}
              placeholder="Describe your symptoms (e.g. chest pain, shortness of breath)..."
              value={symptoms}
              onChange={e => setSymptoms(e.target.value)}
              style={{
                width: '100%', padding: '8px 10px', borderRadius: 8,
                border: '1px solid #AFA9EC', fontSize: 13,
                resize: 'none', outline: 'none', fontFamily: 'inherit',
              }}
            />
            {urgencyMsg && (
              <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 8, background: urgencyMsg.bg, color: urgencyMsg.color, fontSize: 12 }}>
                {urgencyMsg.msg}
              </div>
            )}
          </div>

          <button
            onClick={() => selectedDoctor && setStep(2)}
            style={{
              width: '100%', padding: 12, borderRadius: 10, border: 'none',
              background: selectedDoctor ? '#185FA5' : '#ccc',
              color: 'white', fontSize: 14, fontWeight: 500,
              cursor: selectedDoctor ? 'pointer' : 'not-allowed',
            }}
          >
            Continue to time selection →
          </button>
        </div>
      )}

      {/* Step 2 - Pick Time */}
      {step === 2 && !submitted && (
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Select a time</div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Available slots for {selectedDoctor.name}</div>

          <SlotPicker
            slots={timeSlots}
            selected={selectedSlot}
            onSelect={setSelectedSlot}
          />

          <button
            onClick={() => selectedSlot && setStep(3)}
            style={{
              width: '100%', padding: 12, borderRadius: 10, border: 'none',
              background: selectedSlot ? '#185FA5' : '#ccc',
              color: 'white', fontSize: 14, fontWeight: 500,
              cursor: selectedSlot ? 'pointer' : 'not-allowed', marginBottom: 8,
            }}
          >
            Continue to your details →
          </button>
          <button onClick={() => setStep(1)} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #e0e0e0', background: 'white', fontSize: 13, cursor: 'pointer', color: '#666' }}>
            ← Back
          </button>
        </div>
      )}

      {/* Step 3 - Patient Form */}
      {step === 3 && !submitted && (
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Your details</div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Fill in your info to confirm the booking</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>First name</label>
              <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                placeholder="Jane" style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>Last name</label>
              <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                placeholder="Smith" style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, outline: 'none' }} />
            </div>
          </div>

          {[
            { label: 'Email', key: 'email', placeholder: 'jane@email.com' },
            { label: 'Phone', key: 'phone', placeholder: '+1 (416) 555-0000' },
            { label: 'Reason for visit', key: 'reason', placeholder: 'Brief description...' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>{f.label}</label>
              <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder} style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: 14, outline: 'none' }} />
            </div>
          ))}

          {/* Summary */}
          <div style={{ background: '#f5f5f5', borderRadius: 10, padding: '12px 14px', marginBottom: 14, fontSize: 13 }}>
            <div style={{ color: '#888', marginBottom: 4 }}>Booking summary</div>
            <div style={{ fontWeight: 600 }}>{selectedDoctor.name} · {selectedSlot.time} · May 12, 2026</div>
          </div>

          <button
            onClick={handleBook}
            style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: '#185FA5', color: 'white', fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 8 }}
          >
            Confirm booking
          </button>
          <button onClick={() => setStep(2)} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #e0e0e0', background: 'white', fontSize: 13, cursor: 'pointer', color: '#666' }}>
            ← Back
          </button>
        </div>
      )}

      {/* Success */}
      {submitted && (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: 'white', borderRadius: 16, border: '1px solid #e0e0e0' }}>
          <div style={{ width: 56, height: 56, background: '#EAF3DE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 26 }}>✓</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Booking requested!</div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>The clinic will confirm your appointment shortly.</div>
          <div style={{ background: '#f5f5f5', borderRadius: 10, padding: '10px 14px', fontSize: 13, marginBottom: 20 }}>
            {selectedDoctor.name} · {selectedSlot.time} · May 12, 2026
          </div>
          <button onClick={resetFlow} style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: '#185FA5', color: 'white', fontSize: 14, cursor: 'pointer' }}>
            Book another →
          </button>
        </div>
      )}
    </main>
  )
}