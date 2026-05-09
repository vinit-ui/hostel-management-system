import { useState, useEffect } from 'react'
import RoomCard from '../components/RoomCard'
import RoomStats from '../components/RoomStats'
import AssignRoomModal from '../components/AssignRoomModal'
import ConfirmModal from '../components/ConfirmModal'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import {
  fetchAllRooms,
  assignStudentToRoom,
  unassignStudentFromRoom,
} from '../api/roomApi'
import { fetchAllStudents } from '../api/studentApi'

function Rooms() {
  const [rooms, setRooms] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [assigningRoom, setAssigningRoom] = useState(null)
  const [unassignRoom, setUnassignRoom] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      setError(null)

      // Fetch rooms and students at the same time
      const [roomsRes, studentsRes] = await Promise.all([
        fetchAllRooms(),
        fetchAllStudents(),
      ])

      setRooms(roomsRes.data)
      setAllStudents(studentsRes.data)
    } catch (err) {
      setError('Failed to load room data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Students who don't have a room assigned
  const unassignedStudents = allStudents.filter(
    (s) => !s.room || s.room === null || s.room === ''
  )

  // Assign student to room
  async function handleAssign(roomId, student) {
    try {
      await assignStudentToRoom(roomId, student._id)
      await loadData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to assign student.')
    }
  }

  // Execute Unassign
  async function executeUnassign() {
    if (!unassignRoom) return
    try {
      await unassignStudentFromRoom(unassignRoom._id)
      await loadData()
      setUnassignRoom(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unassign student.')
    }
  }

  // Handle Unassign click
  function handleUnassignClick(roomId) {
    const room = rooms.find((r) => r._id === roomId)
    if (room && room.student) {
      setUnassignRoom(room)
    }
  }

  // Filter rooms
  const filteredRooms = rooms.filter((r) => {
    if (filter === 'occupied') return r.student !== null
    if (filter === 'vacant') return r.student === null
    return true
  })

  if (loading) return <Spinner message="Loading rooms..." />
  if (error) return <ErrorMessage message={error} onRetry={loadData} />

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Room Allocation</h1>
        <p className="text-gray-500 mt-1">Manage and allocate hostel rooms</p>
      </div>

      {/* Room Stats */}
      <RoomStats rooms={rooms} />

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'occupied', 'vacant'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === tab
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No rooms found for this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              onAssign={(room) => setAssigningRoom(room)}
              onUnassign={handleUnassignClick}
            />
          ))}
        </div>
      )}

      {/* Assign Modal */}
      {assigningRoom && (
        <AssignRoomModal
          room={assigningRoom}
          availableStudents={unassignedStudents}
          onClose={() => setAssigningRoom(null)}
          onAssign={handleAssign}
        />
      )}

      {/* Confirm Unassign Modal */}
      {unassignRoom && (
        <ConfirmModal
          title="Unassign Student"
          message={`Are you sure you want to remove ${unassignRoom.student.name} from Room ${unassignRoom.number}?`}
          confirmText="Remove"
          onConfirm={executeUnassign}
          onCancel={() => setUnassignRoom(null)}
        />
      )}

    </div>
  )
}

export default Rooms
