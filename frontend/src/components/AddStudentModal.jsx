import { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import Button from './Button'

// Initial empty form state
const emptyForm = {
  name: '',
  email: '',
  phone: '',
  feeStatus: 'Pending',
  course: '',
}

// Fee status options
const feeOptions = [
  { value: 'Paid', label: 'Paid' },
  { value: 'Pending', label: 'Pending' },
]

function AddStudentModal({ onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm)

  // Update form field when user types
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Submit the form
  function handleSubmit() {
    // Basic validation
    if (!form.name || !form.email) {
      alert('Please fill in Name and Email fields.')
      return
    }

    // Pass new student up to parent
    onAdd({ ...form, id: Date.now() })
    onClose()
  }

  return (
    // Background overlay
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 modal-backdrop p-4">

      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 modal-content border border-slate-100">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">Add New Student</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
          />
          <InputField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter email address"
            required
          />
          <InputField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          <InputField
            label="Course"
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="e.g. B.Tech, MBA"
          />

          <SelectField
            label="Fee Status"
            name="feeStatus"
            value={form.feeStatus}
            onChange={handleChange}
            options={feeOptions}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button label="Cancel" variant="secondary" onClick={onClose} />
          <Button label="Add Student" variant="primary" onClick={handleSubmit} />
        </div>

      </div>
    </div>
  )
}

export default AddStudentModal
