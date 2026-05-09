import { useState, useEffect } from 'react'
import FeeBadge from '../components/FeeBadge'
import FeeSummary from '../components/FeeSummary'
import FeeUpdateModal from '../components/FeeUpdateModal'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import { fetchAllFees, updateFee } from '../api/feeApi'

function Fees() {
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFee, setSelectedFee] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadFees()
  }, [])

  async function loadFees() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchAllFees()
      setFees(response.data)
    } catch (err) {
      setError('Failed to load fee records. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Update fee record
  async function handleUpdate(feeData) {
    try {
      const response = await updateFee(feeData._id, {
        status: feeData.feeStatus,
        amount: feeData.feeAmount,
        dueDate: feeData.dueDate,
        remarks: feeData.remarks,
      })
      setFees(fees.map((f) =>
        f._id === feeData._id ? response.data : f
      ))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update fee.')
    }
  }

  // Quick toggle Paid/Pending
  async function handleQuickToggle(fee) {
    const newStatus = fee.status === 'Paid' ? 'Pending' : 'Paid'
    try {
      const response = await updateFee(fee._id, { status: newStatus })
      setFees(fees.map((f) =>
        f._id === fee._id ? response.data : f
      ))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to toggle fee status.')
    }
  }

  // Build student-like objects from fees for FeeSummary
  const studentsFromFees = fees.map((f) => ({
    id: f._id,
    name: f.student?.name || '',
    feeStatus: f.status,
    feeAmount: f.amount,
  }))

  // Filter + search
  const filteredFees = fees.filter((f) => {
    const matchesFilter =
      filter === 'all' || f.status === filter

    const studentName = f.student?.name?.toLowerCase() || ''
    const studentEmail = f.student?.email?.toLowerCase() || ''
    const studentRoom = f.student?.room || ''

    const matchesSearch =
      studentName.includes(searchQuery.toLowerCase()) ||
      studentEmail.includes(searchQuery.toLowerCase()) ||
      studentRoom.includes(searchQuery)

    return matchesFilter && matchesSearch
  })

  if (loading) return <Spinner message="Loading fee records..." />
  if (error) return <ErrorMessage message={error} onRetry={loadFees} />

  return (
    <div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fee Status</h1>
        <p className="text-gray-500 mt-1">Track and manage student fee payments</p>
      </div>

      {/* Fee Summary */}
      <FeeSummary students={studentsFromFees} />

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {['all', 'Paid', 'Pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by name, email or room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">#</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Student</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Course</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Room</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Amount</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Due Date</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Remarks</th>
              <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredFees.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-12 text-slate-400">
                  No fee records found.
                </td>
              </tr>
            ) : (
              filteredFees.map((fee, index) => (
                <tr key={fee._id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{fee.student?.name}</p>
                    <p className="text-xs text-gray-400">{fee.student?.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{fee.student?.course}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {fee.student?.room ? `Room ${fee.student.room}` : '—'}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    ₹{fee.amount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(fee.dueDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <FeeBadge status={fee.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs max-w-xs truncate">
                    {fee.remarks || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleQuickToggle(fee)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          fee.status === 'Paid'
                            ? 'border-red-200 text-red-600 hover:bg-red-50'
                            : 'border-green-200 text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {fee.status === 'Paid' ? '↩ Unpaid' : '✓ Mark Paid'}
                      </button>
                      <Button
                        label="Update"
                        variant="secondary"
                        onClick={() => setSelectedFee(fee)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Table Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing {filteredFees.length} of {fees.length} records
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>✅ Paid: {fees.filter(f => f.status === 'Paid').length}</span>
            <span>⏳ Pending: {fees.filter(f => f.status === 'Pending').length}</span>
          </div>
        </div>
      </div>

      {/* Fee Update Modal */}
      {selectedFee && (
        <FeeUpdateModal
          student={{
            ...selectedFee.student,
            _id: selectedFee._id,
            feeStatus: selectedFee.status,
            feeAmount: selectedFee.amount,
            dueDate: selectedFee.dueDate
              ? new Date(selectedFee.dueDate).toISOString().split('T')[0]
              : '',
            remarks: selectedFee.remarks,
          }}
          onClose={() => setSelectedFee(null)}
          onUpdate={handleUpdate}
        />
      )}

    </div>
  )
}

export default Fees
