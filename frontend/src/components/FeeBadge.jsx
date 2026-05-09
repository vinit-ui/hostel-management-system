function FeeBadge({ status }) {
  const styles = {
    Paid: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
    Pending: 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20',
  }

  const dotColors = {
    Paid: 'bg-emerald-500',
    Pending: 'bg-rose-500',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm ${styles[status] || styles.Pending}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status] || dotColors.Pending}`}></span>
      {status}
    </span>
  )
}

export default FeeBadge
