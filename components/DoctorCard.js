 
export default function DoctorCard({ doctor, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(doctor)}
      style={{
        padding: '14px 16px',
        borderRadius: 12,
        marginBottom: 10,
        cursor: 'pointer',
        border: selected ? '2px solid #185FA5' : '1px solid #e0e0e0',
        background: selected ? '#E6F1FB' : 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: '#E6F1FB', color: '#185FA5',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600, fontSize: 14, flexShrink: 0,
      }}>
        {doctor.initials}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{doctor.name}</div>
        <div style={{ fontSize: 12, color: '#666' }}>{doctor.specialty}</div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{doctor.bio}</div>
      </div>
    </div>
  )
}