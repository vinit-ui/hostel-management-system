import { createContext, useContext, useState, useEffect } from 'react'
import { loginAdmin, verifyToken } from '../api/authApi'

// Create the context
const AuthContext = createContext(null)

// Provider component — wraps the whole app
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if already logged in when app loads
  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return
    }

    try {
      // Verify token is still valid with backend
      await verifyToken()
      const savedAdmin = JSON.parse(localStorage.getItem('admin'))
      setAdmin(savedAdmin)
    } catch (error) {
      // Token invalid — clear storage
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
    } finally {
      setLoading(false)
    }
  }

  // Login function
  async function login(email, password) {
    const response = await loginAdmin(email, password)

    // Save token and admin info to localStorage
    localStorage.setItem('token', response.token)
    localStorage.setItem('admin', JSON.stringify(response.admin))

    setAdmin(response.admin)
    return response
  }

  // Logout function
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth anywhere
export function useAuth() {
  return useContext(AuthContext)
}
