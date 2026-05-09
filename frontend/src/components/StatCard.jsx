function StatCard({ title, value, subtitle, textColor, icon }) {
  return (
    <div className={`rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 bg-white border border-slate-100 flex items-center justify-between group cursor-default relative overflow-hidden`}>
      
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Left — Text info */}
      <div className="relative z-10">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <p className={`text-3xl font-bold mt-1 ${textColor || 'text-slate-800'}`}>{value}</p>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-2 font-medium">{subtitle}</p>
        )}
      </div>

      {/* Right — Icon */}
      <div className={`text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10`}>
        {icon}
      </div>

    </div>
  )
}

export default StatCard
