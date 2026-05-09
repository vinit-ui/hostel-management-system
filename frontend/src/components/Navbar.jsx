import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from './ConfirmModal'

function Navbar({ onMenuClick }) {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  function handleLogout() {
    setShowLogoutConfirm(true)
  }

  function executeLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="h-16 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-4 sm:px-6 fixed top-0 right-0 left-0 lg:left-64 z-20 transition-all duration-300 shadow-sm">

      {/* Left — Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <p className="text-sm text-gray-500 hidden sm:block">Admin Panel</p>
      </div>

      {/* Right — Admin info + Logout */}
      <div className="flex items-center gap-5">
        
        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              {admin?.name || 'Admin'}
            </p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{admin?.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md border-2 border-white flex items-center justify-center text-white font-bold text-sm transform transition-transform hover:scale-105 cursor-default select-none">
            {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
          title="Logout"
        >
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <ConfirmModal
          title="Sign Out"
          message="Are you sure you want to log out of the admin panel?"
          confirmText="Logout"
          onConfirm={executeLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}

    </div>
  )
}

export default Navbar
