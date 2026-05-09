import { useState, useEffect } from 'react'
import Button from '../components/Button'
import AddStudentModal from '../components/AddStudentModal'
import EditStudentModal from '../components/EditStudentModal'
import ConfirmModal from '../components/ConfirmModal'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import {
  fetchAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../api/studentApi'

function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [deleteStudentId, setDeleteStudentId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch students from backend on page load
  useEffect(() => {
    loadStudents()
  }, [])

  async function loadStudents() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchAllStudents()
      setStudents(response.data)
    } catch (err) {
      setError('Failed to load students. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Add new student
  async function handleAdd(formData) {
    try {
      const response = await createStudent(formData)
      setStudents([response.data, ...students])
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add student.')
    }
  }

  // Save edited student
  async function handleSave(formData) {
    try {
      const response = await updateStudent(formData._id, formData)
      setStudents(students.map((s) =>
        s._id === formData._id ? response.data : s
      ))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update student.')
    }
  }

  // Delete student
  async function executeDelete() {
    if (!deleteStudentId) return
    try {
      await deleteStudent(deleteStudentId)
      setStudents(students.filter((s) => s._id !== deleteStudentId))
      setDeleteStudentId(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete student.')
    }
  }

  // Filter students by search query
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.room && s.room.includes(searchQuery))
  )

  // Show spinner while loading
  if (loading) return <Spinner message="Loading students..." />

  // Show error if fetch failed
  if (error) return <ErrorMessage message={error} onRetry={loadStudents} />

  return (
    <div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Students</h1>
          <p className="text-gray-500 mt-1">Manage all hostel students</p>
        </div>
        <Button
          label="+ Add Student"
          variant="primary"
          onClick={() => setShowAddModal(true)}
        />
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email or room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">#</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Email</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Course</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Room</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Fee Status</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-slate-400">
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <tr key={student._id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{student.name}</td>
                  <td className="px-6 py-4 text-gray-500">{student.email}</td>
                  <td className="px-6 py-4 text-gray-500">{student.course}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {student.room ? `Room ${student.room}` : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.feeStatus === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : student.feeStatus === 'Partial'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        label="Edit"
                        variant="secondary"
                        onClick={() => setEditingStudent(student)}
                      />
                      <Button
                        label="Delete"
                        variant="danger"
                        onClick={() => setDeleteStudentId(student._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Table Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={handleSave}
        />
      )}

      {/* Confirm Delete Modal */}
      {deleteStudentId && (
        <ConfirmModal
          title="Delete Student"
          message="Are you sure you want to delete this student? This action cannot be undone."
          confirmText="Delete"
          onConfirm={executeDelete}
          onCancel={() => setDeleteStudentId(null)}
        />
      )}

    </div>
  )
}

export default Students
