import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from './Spinner'

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()

  // Still checking token validity
  if (loading) {
    return <Spinner message="Checking authentication..." />
  }

  // Not logged in — redirect to login page
  if (!admin) {
    return <Navigate to="/login" replace />
  }

  // Logged in — show the page
  return children
}

export default ProtectedRoute
