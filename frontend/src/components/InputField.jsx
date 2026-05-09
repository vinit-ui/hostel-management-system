function InputField({ label, name, value, onChange, type = 'text', placeholder = '', required = false }) {
  return (
    <div className="flex flex-col gap-1">

      {/* Label */}
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />

    </div>
  )
}

export default InputField
