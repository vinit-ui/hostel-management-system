import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Raw SVG components for a premium look without extra dependencies
const Icons = {
  Mail: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Lock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  CheckCircle: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Shield: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Activity: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Building: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  Users: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(e) {
    if (e) e.preventDefault()
    
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)
      setError('')
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans selection:bg-indigo-500/30">
      
      {/* ============================================================== */}
      {/* LEFT PANEL (BRANDING & OPERATIONAL INFO) - Hidden on Mobile    */}
      {/* ============================================================== */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 overflow-hidden bg-slate-900 text-white">
        
        {/* Background Image with Navy/Indigo Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950/90 via-indigo-950/80 to-slate-900/90"></div>
        
        {/* Subtle radial light effect */}
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>

        {/* TOP BRANDING */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/10">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">HMS Portal</h1>
            <p className="text-[10px] uppercase tracking-widest text-indigo-200 font-semibold mt-0.5">Smart Administration</p>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="relative z-10 max-w-xl my-auto">
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
            Manage Hostel Operations With Complete Control
          </h2>
          <p className="text-lg text-indigo-100/80 leading-relaxed mb-10 font-light">
            Centralize student records, room allocation, occupancy monitoring, fee management, and administrative operations from a single secure platform.
          </p>

          {/* FEATURE GRID */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Student Registration', icon: <Icons.Users /> },
              { title: 'Real-time Room Allocation', icon: <Icons.Building /> },
              { title: 'Fee & Payment Tracking', icon: <Icons.CheckCircle /> },
              { title: 'Occupancy Monitoring', icon: <Icons.Activity /> },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors duration-300">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-slate-200">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="relative z-10 border-t border-white/10 pt-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white mb-1">Trusted by educational institutions.</p>
            <p className="text-xs text-indigo-200/60 flex items-center gap-1.5">
              <Icons.Shield className="w-3 h-3" />
              Protected with secure session authentication and encrypted data handling.
            </p>
          </div>
          <div className="flex gap-4">
             {/* Live Stats */}
             <div className="text-right">
                <p className="text-2xl font-bold text-white">1,200+</p>
                <p className="text-[10px] uppercase tracking-wider text-indigo-300">Students</p>
             </div>
             <div className="w-px h-10 bg-white/10"></div>
             <div className="text-right">
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-[10px] uppercase tracking-wider text-emerald-400">Occupancy</p>
             </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT PANEL (LOGIN FORM)                                       */}
      {/* ============================================================== */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-slate-50">
        
        {/* Soft background decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>

        {/* LOGIN CARD */}
        <div className="w-full max-w-md relative z-10">
          
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">HMS Portal</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Smart Administration</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
            
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Admin Access Panel</h2>
              <p className="text-sm text-slate-500 mt-2">Sign in to continue managing hostel operations.</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="mt-0.5">⚠️</span>
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Icons.Mail />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@hostel.com"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700 block">Password</label>
                  <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Icons.Lock />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 relative flex items-center justify-center py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

          </div>

          {/* Bottom Security Note */}
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-slate-500">
            <Icons.Shield className="w-4 h-4" />
            <p className="text-xs font-medium uppercase tracking-widest">Authorized Personnel Only</p>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            This platform is restricted to verified hostel administrators. <br className="hidden sm:block" />
            Contact <a href="#" className="text-indigo-500 hover:underline">support@hms-portal.edu</a> for access issues.
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login
