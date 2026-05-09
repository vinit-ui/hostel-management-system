function RecentActivity({ students = [] }) {
  // Get 5 most recent students
  const recentStudents = students.slice(0, 5)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full flex flex-col max-h-[400px]">

      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4 shrink-0">Recently Admitted</h2>

      {recentStudents.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No recent admissions.</p>
      ) : (
        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
          {recentStudents.map((student) => (
            <div key={student._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">

              {/* Left */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  student
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{student.name}</p>
                  <p className="text-xs text-gray-400">{student.course || 'N/A'}</p>
                </div>
              </div>

              {/* Right */}
              <p className="text-xs font-medium text-gray-500 whitespace-nowrap">
                {student.room ? `Room ${student.room}` : 'Unassigned'}
              </p>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default RecentActivity
