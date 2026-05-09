import { useState, useEffect } from 'react'
import StatCard from '../components/StatCard'
import RecentActivity from '../components/RecentActivity'
import QuickStats from '../components/QuickStats'
import Spinner from '../components/Spinner'
import { fetchAllStudents } from '../api/studentApi'
import { fetchAllRooms } from '../api/roomApi'
import { fetchFeeSummary } from '../api/feeApi'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [rooms, setRooms] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    try {
      setLoading(true)

      // Fetch all data simultaneously
      const [studentsRes, roomsRes, feeRes] = await Promise.all([
        fetchAllStudents(),
        fetchAllRooms(),
        fetchFeeSummary(),
      ])

      const students = studentsRes.data
      const roomsData = roomsRes.data
      const feeSummary = feeRes.data

      // Calculate room stats
      const occupiedRooms = roomsData.filter((r) => r.student !== null).length
      const vacantRooms = roomsData.length - occupiedRooms

      setRooms(roomsData)
      setStudents(students)
      setStats({
        totalStudents: students.length,
        occupiedRooms,
        vacantRooms,
        feesCollected: feeSummary.collectedAmount,
        feesPending: feeSummary.pendingAmount,
        pendingCount: feeSummary.pendingCount,
      })
    } catch (err) {
      console.error('Dashboard load error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Spinner message="Loading dashboard..." />

  const statCards = [
    {
      id: 1,
      title: 'Total Students',
      value: stats?.totalStudents || 0,
      subtitle: 'Currently enrolled',
      bgColor: 'bg-white',
      textColor: 'text-blue-600',
      icon: '🎓',
    },
    {
      id: 2,
      title: 'Rooms Occupied',
      value: stats?.occupiedRooms || 0,
      subtitle: `${stats?.vacantRooms || 0} rooms vacant`,
      bgColor: 'bg-white',
      textColor: 'text-purple-600',
      icon: '🛏️',
    },
    {
      id: 3,
      title: 'Fees Collected',
      value: `₹${(stats?.feesCollected || 0).toLocaleString()}`,
      subtitle: 'Total received',
      bgColor: 'bg-white',
      textColor: 'text-green-600',
      icon: '✅',
    },
    {
      id: 4,
      title: 'Fees Pending',
      value: `₹${(stats?.feesPending || 0).toLocaleString()}`,
      subtitle: `${stats?.pendingCount || 0} students pending`,
      bgColor: 'bg-white',
      textColor: 'text-red-500',
      icon: '⏳',
    },
  ]

  return (
    <div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <RecentActivity students={students} />
        <QuickStats rooms={rooms} />
      </div>

    </div>
  )
}

export default Dashboard
