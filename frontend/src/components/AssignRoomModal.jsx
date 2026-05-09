import { useState } from 'react'
import Button from './Button'

function AssignRoomModal({ room, availableStudents, onClose, onAssign }) {
  const [selectedStudentId, setSelectedStudentId] = useState('')

  function handleAssign() {
    // Validation — must select a student
    if (!selectedStudentId) {
      alert('Please select a student to assign.')
      return
    }

    // Find the selected student object
    const student = availableStudents.find(
      (s) => s._id === selectedStudentId
    )

    onAssign(room._id, student)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 modal-backdrop p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 modal-content border border-slate-100">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Assign Student
            </h2>
            <p className="text-sm text-gray-500 mt-1">Room {room.number} · {room.type}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Student Dropdown */}
        <div className="flex flex-col gap-1 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Select Student <span className="text-red-500">*</span>
          </label>

          {availableStudents.length === 0 ? (
            <p className="text-sm text-gray-400 italic py-2">
              No unassigned students available.
            </p>
          ) : (
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Select a student --</option>
              {availableStudents.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} · {student.course}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button label="Cancel" variant="secondary" onClick={onClose} />
          <Button
            label="Assign Room"
            variant="primary"
            onClick={handleAssign}
            disabled={availableStudents.length === 0}
          />
        </div>

      </div>
    </div>
  )
}

export default AssignRoomModal
