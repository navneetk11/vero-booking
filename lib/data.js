 
export const doctors = [
  {
    id: 1,
    name: 'Dr. Aisha Patel',
    specialty: 'Family Medicine',
    initials: 'AP',
    bio: '8 years experience in family and preventative care.',
  },
  {
    id: 2,
    name: 'Dr. James Chen',
    specialty: 'Internal Medicine',
    initials: 'JC',
    bio: 'Specialist in chronic illness and adult medicine.',
  },
  {
    id: 3,
    name: 'Dr. Sara Novak',
    specialty: 'Cardiology',
    initials: 'SN',
    bio: 'Focused on heart health, ECGs, and cardiovascular care.',
  },
]

export const timeSlots = [
  { id: 1, time: '9:00 AM',  available: true },
  { id: 2, time: '9:30 AM',  available: false },
  { id: 3, time: '10:00 AM', available: true },
  { id: 4, time: '10:30 AM', available: true },
  { id: 5, time: '11:00 AM', available: false },
  { id: 6, time: '11:30 AM', available: true },
  { id: 7, time: '1:00 PM',  available: true },
  { id: 8, time: '1:30 PM',  available: true },
  { id: 9, time: '2:00 PM',  available: false },
  { id: 10, time: '2:30 PM', available: true },
  { id: 11, time: '3:00 PM', available: true },
  { id: 12, time: '3:30 PM', available: false },
]

export const initialBookings = [
  {
    id: 1,
    patient: 'Marcus Reid',
    doctor: 'Dr. Aisha Patel',
    time: '9:00 AM',
    date: 'May 12',
    reason: 'Annual checkup',
    status: 'confirmed',
    urgency: 'low',
  },
  {
    id: 2,
    patient: 'Priya Sharma',
    doctor: 'Dr. Sara Novak',
    time: '10:00 AM',
    date: 'May 12',
    reason: 'Chest discomfort',
    status: 'pending',
    urgency: 'high',
  },
  {
    id: 3,
    patient: 'Tom Nguyen',
    doctor: 'Dr. James Chen',
    time: '1:00 PM',
    date: 'May 12',
    reason: 'Fatigue and dizziness',
    status: 'pending',
    urgency: 'medium',
  },
  {
    id: 4,
    patient: 'Elena Costa',
    doctor: 'Dr. Aisha Patel',
    time: '2:30 PM',
    date: 'May 12',
    reason: 'Follow-up visit',
    status: 'confirmed',
    urgency: 'low',
  },
]