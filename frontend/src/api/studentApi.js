import api from './api'

// Get all students
export const fetchAllStudents = async () => {
  const response = await api.get('/students')
  return response.data
}

// Get single student
export const fetchStudentById = async (id) => {
  const response = await api.get(`/students/${id}`)
  return response.data
}

// Create new student
export const createStudent = async (studentData) => {
  const response = await api.post('/students', studentData)
  return response.data
}

// Update student
export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}`, studentData)
  return response.data
}

// Delete student
export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`)
  return response.data
}
