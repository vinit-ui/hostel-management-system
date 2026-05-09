import { useState } from 'react'
import Button from './Button'
import SelectField from './SelectField'
import InputField from './InputField'

const statusOptions = [
  { value: 'Paid', label: '✅ Paid' },
  { value: 'Pending', label: '⏳ Pending' },
]

function FeeUpdateModal({ student, onClose, onUpdate }) {
  const [form, setForm] = useState({
    feeStatus: student.feeStatus,
    feeAmount: student.feeAmount,
    dueDate: student.dueDate,
    remarks: student.remarks || '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    onUpdate({ ...student, ...form, feeAmount: Number(form.feeAmount) })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 modal-backdrop p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 modal-content border border-slate-100">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Update Fee</h2>
            <p className="text-sm text-gray-500 mt-1">{student.name} · Room {student.room}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <SelectField
            label="Fee Status"
            name="feeStatus"
            value={form.feeStatus}
            onChange={handleChange}
            options={statusOptions}
            required
          />
          <InputField
            label="Fee Amount (₹)"
            name="feeAmount"
            value={form.feeAmount}
            onChange={handleChange}
            type="number"
            placeholder="Enter fee amount"
            required
          />
          <InputField
            label="Due Date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            type="date"
            required
          />
          <InputField
            label="Remarks (optional)"
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            placeholder="e.g. Paid via UPI, Partial payment made"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button label="Cancel" variant="secondary" onClick={onClose} />
          <Button label="Update Fee" variant="primary" onClick={handleSubmit} />
        </div>

      </div>
    </div>
  )
}

export default FeeUpdateModal
