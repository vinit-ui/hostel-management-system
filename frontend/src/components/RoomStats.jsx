function RoomStats({ rooms }) {
  // Calculate stats from rooms array
  const total = rooms.length
  const occupied = rooms.filter((r) => r.student !== null).length
  const vacant = total - occupied
  const occupancyRate = Math.round((occupied / total) * 100)

  const stats = [
    { label: 'Total Rooms', value: total, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Occupied', value: occupied, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Vacant', value: vacant, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Occupancy Rate', value: `${occupancyRate}%`, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className={`${stat.bg} rounded-xl p-4 text-center`}>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default RoomStats
