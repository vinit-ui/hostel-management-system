function Button({ label, onClick, type = 'button', variant = 'primary', disabled = false }) {
  // Different styles for different button types
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 border border-transparent active:scale-95',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/30 border border-transparent active:scale-95',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:scale-95',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 border border-transparent active:scale-95',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
    >
      {label}
    </button>
  )
}

export default Button
