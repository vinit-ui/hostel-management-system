import Button from './Button'

function RoomCard({ room, onAssign, onUnassign }) {
  const isOccupied = room.student !== null

  return (
    <div className={`rounded-2xl p-6 border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group bg-white ${
      isOccupied
        ? 'border-rose-200 hover:border-rose-300'
        : 'border-emerald-200 hover:border-emerald-300'
    }`}>
      
      {/* Decorative gradient blur */}
      <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
        isOccupied ? 'bg-rose-500' : 'bg-emerald-500'
      }`}></div>

      {/* Room Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Room {room.number}</h3>
          <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">{room.type} · Floor {room.floor}</p>
        </div>

        {/* Status Badge */}
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm border ${
          isOccupied
            ? 'bg-rose-50 text-rose-700 border-rose-100'
            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
        }`}>
          {isOccupied ? 'Occupied' : 'Vacant'}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 my-4 relative z-10"></div>

      {/* Student Info or Vacant Message */}
      {isOccupied ? (
        <div className="mb-6 relative z-10">
          <p className="text-sm font-bold text-slate-800">{room.student.name}</p>
          <div className="flex gap-2 mt-1.5">
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wide">
              {room.student.course}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 truncate">{room.student.email}</p>
        </div>
      ) : (
        <div className="mb-6 h-[88px] flex items-center justify-center relative z-10">
          <p className="text-sm text-slate-400 font-medium">Ready for allocation</p>
        </div>
      )}

      <div className="relative z-10 w-full">
        {isOccupied ? (
          <Button
            label="Unassign Student"
            variant="danger"
            onClick={() => onUnassign(room._id)}
            className="w-full"
          />
        ) : (
          <Button
            label="Assign Student"
            variant="success"
            onClick={() => onAssign(room)}
            className="w-full"
          />
        )}
      </div>

    </div>
  )
}

export default RoomCard
