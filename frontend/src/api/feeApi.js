import api from './api'

// Get all fees
export const fetchAllFees = async () => {
  const response = await api.get('/fees')
  return response.data
}

// Get fee summary stats
export const fetchFeeSummary = async () => {
  const response = await api.get('/fees/summary')
  return response.data
}

// Create fee record
export const createFee = async (feeData) => {
  const response = await api.post('/fees', feeData)
  return response.data
}

// Update fee record
export const updateFee = async (id, feeData) => {
  const response = await api.put(`/fees/${id}`, feeData)
  return response.data
}

// Get fee by student ID
export const fetchFeeByStudent = async (studentId) => {
  const response = await api.get(`/fees/student/${studentId}`)
  return response.data
}
