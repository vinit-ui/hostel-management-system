import api from './api'

// Get all rooms
export const fetchAllRooms = async () => {
  const response = await api.get('/rooms')
  return response.data
}

// Create new room
export const createRoom = async (roomData) => {
  const response = await api.post('/rooms', roomData)
  return response.data
}

// Assign student to room
export const assignStudentToRoom = async (roomId, studentId) => {
  const response = await api.put(`/rooms/${roomId}/assign`, { studentId })
  return response.data
}

// Unassign student from room
export const unassignStudentFromRoom = async (roomId) => {
  const response = await api.put(`/rooms/${roomId}/unassign`)
  return response.data
}
