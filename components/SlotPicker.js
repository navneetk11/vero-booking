 
export default function SlotPicker({ slots, selected, onSelect }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 8,
      marginBottom: 20,
    }}>
      {slots.map(slot => (
        <div
          key={slot.id}
          onClick={() => slot.available && onSelect(slot)}
          style={{
            padding: '10px 4px',
            textAlign: 'center',
            borderRadius: 8,
            fontSize: 13,
            cursor: slot.available ? 'pointer' : 'not-allowed',
            border: selected?.id === slot.id ? '2px solid #185FA5' : '1px solid #e0e0e0',
            background: selected?.id === slot.id ? '#E6F1FB' : slot.available ? 'white' : '#f9f9f9',
            color: selected?.id === slot.id ? '#185FA5' : slot.available ? '#333' : '#ccc',
            textDecoration: slot.available ? 'none' : 'line-through',
            fontWeight: selected?.id === slot.id ? 600 : 400,
          }}
        >
          {slot.time}
        </div>
      ))}
    </div>
  )
}