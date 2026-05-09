import api from './api'

// Login admin
export const loginAdmin = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

// Verify token is still valid
export const verifyToken = async () => {
  const response = await api.get('/auth/verify')
  return response.data
}
