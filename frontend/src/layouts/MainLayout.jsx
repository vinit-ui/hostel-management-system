import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar — fixed on left */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Navbar — fixed on top */}
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />

      {/* Main Content Area */}
      <main className="lg:ml-64 pt-20 sm:pt-24 px-4 sm:px-8 pb-8">
        <Outlet />
      </main>

    </div>
  )
}

export default MainLayout
