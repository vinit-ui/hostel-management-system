function QuickStats({ rooms = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col h-full max-h-[400px]">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 shrink-0">Room Overview</h2>

      {rooms.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No rooms available.</p>
      ) : (
        <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
          {rooms.map((room) => (
            <div
              key={room._id}
              className={`rounded-lg p-3 text-center border-2 ${
                room.student
                  ? 'border-red-200 bg-red-50'
                  : 'border-green-200 bg-green-50'
              }`}
            >
              <p className="text-sm font-bold text-gray-700">Room {room.number}</p>
              <p className={`text-xs mt-1 truncate ${
                room.student ? 'text-red-500' : 'text-green-500'
              }`}>
                {room.student ? room.student.name : 'Vacant'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 mt-auto pt-4 border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <p className="text-xs text-gray-500">Occupied</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <p className="text-xs text-gray-500">Vacant</p>
        </div>
      </div>
    </div>
  )
}

export default QuickStats
