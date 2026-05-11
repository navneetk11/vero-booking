# 🩺 VeroBook — Patient Booking Flow

## 🌐 Live demo
> **Hosted URL:** https://vero-booking-iota.vercel.app

## 🚀 How to run locally

Clone the repo then run:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 🏗️ What I built

A patient-facing appointment booking flow and a physician admin dashboard built with Next.js and JavaScript.

Features:
- Step-by-step patient booking flow — choose physician, select time slot, fill in details
- AI symptom triage — analyzes symptoms and suggests urgency level instantly
- Physician admin dashboard — view all bookings, filter by status, confirm or cancel
- Booking statuses: pending, confirmed, cancelled
- Shared state across patient and admin views using React Context
- Pre-loaded mock data so the app never feels empty on first load
- Mobile responsive

## ⚙️ Key technical and product decisions

- Used Next.js App Router for file-based routing — patient and admin views are cleanly separated at the route level
- React Context in layout.js as the shared data layer — bookings made on the patient side appear instantly in the admin view without a database or API call
- Reusable components: DoctorCard, SlotPicker, StatusBadge — kept pages focused on logic, components focused on UI
- AI triage uses keyword matching instead of an external API — instant response, no latency, no cost, works offline, good enough for this scope
- Used Next.js Link instead of anchor tags for client-side navigation — preserves shared state across page transitions
- Mock data pre-loaded with realistic patients, doctors, and urgency levels so reviewers see a real product feel immediately
- No database by design — the brief said mock data was fine, and keeping state in memory keeps the setup lightweight and fast to run

## 🔮 What I would improve with more time

- Real database (Supabase or PostgreSQL) so bookings persist across sessions and page refreshes
- Authentication — patients log in, doctors see only their own bookings
- Calendar integration so time slots reflect actual physician availability
- Email or SMS confirmation when a booking is confirmed
- Replace keyword triage with a real LLM call for smarter, more nuanced symptom understanding
- Search, sort, and date filtering on the admin dashboard
- Unit tests for the booking flow and urgency logic