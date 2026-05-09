function FeeSummary({ students }) {
  // Calculate fee totals from students array
  const totalStudents = students.length
  const paidCount = students.filter((s) => s.feeStatus === 'Paid').length
  const pendingCount = students.filter((s) => s.feeStatus === 'Pending').length
  const partialCount = students.filter((s) => s.feeStatus === 'Partial').length

  const totalAmount = students.reduce((sum, s) => sum + s.feeAmount, 0)
  const collectedAmount = students
    .filter((s) => s.feeStatus === 'Paid')
    .reduce((sum, s) => sum + s.feeAmount, 0)
  const pendingAmount = totalAmount - collectedAmount

  const collectionRate = Math.round((paidCount / totalStudents) * 100)

  const summaryCards = [
    {
      label: 'Total Students',
      value: totalStudents,
      sub: 'enrolled',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: '🎓',
    },
    {
      label: 'Fees Collected',
      value: `₹${collectedAmount.toLocaleString()}`,
      sub: `${paidCount} students paid`,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✅',
    },
    {
      label: 'Fees Pending',
      value: `₹${pendingAmount.toLocaleString()}`,
      sub: `${pendingCount + partialCount} students pending`,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '⏳',
    },
    {
      label: 'Collection Rate',
      value: `${collectionRate}%`,
      sub: 'of total fees',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: '📊',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards.map((card) => (
        <div
          key={card.label}
          className={`${card.bg} border ${card.border} rounded-xl p-4`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500 font-medium">{card.label}</p>
            <span className="text-xl">{card.icon}</span>
          </div>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  )
}

export default FeeSummary
