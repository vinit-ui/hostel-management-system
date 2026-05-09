import { NavLink } from 'react-router-dom'

// Navigation items — easy to add more later
const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Students', path: '/students' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Fees', path: '/fees' },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div className={`h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl text-white flex flex-col fixed left-0 top-0 z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 border-r border-slate-700/50`}>

        {/* Logo / App Name */}
        <div className="px-6 py-6 border-b border-slate-700/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide text-slate-100">HMS Portal</h1>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">Management</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white p-1 transition-colors">
            ✕
          </button>
        </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-300 border-l-4 border-indigo-500 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border-l-4 border-transparent hover:border-slate-600'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-900/50">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Admin Panel v1.0</p>
      </div>

      </div>
    </>
  )
}

export default Sidebar
