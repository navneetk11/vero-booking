export default function StatusBadge({ type, value }) {
  const styles = {
    // urgency styles
    high:      { bg: '#FCEBEB', color: '#A32D2D', label: 'High urgency' },
    medium:    { bg: '#FAEEDA', color: '#854F0B', label: 'Moderate' },
    low:       { bg: '#EAF3DE', color: '#3B6D11', label: 'Routine' },
    // status styles
    pending:   { bg: '#FAEEDA', color: '#854F0B', label: 'Pending' },
    confirmed: { bg: '#EAF3DE', color: '#3B6D11', label: 'Confirmed' },
    cancelled: { bg: '#FCEBEB', color: '#A32D2D', label: 'Cancelled' },
  }

  const s = styles[value]
  if (!s) return null

  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 500,
      background: s.bg,
      color: s.color,
    }}>
      {s.label}
    </span>
  )
}