const Room = require('../models/Room')
const Student = require('../models/Student')

// ================================
// GET ALL ROOMS
// ================================
const getAllRooms = async (req, res) => {
  try {
    // populate('student') replaces student ID
    // with actual student data from Student collection
    const rooms = await Room.find()
      .populate('student', 'name email course')
      .sort({ number: 1 })

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    })
  } catch (error) {
    console.error('getAllRooms error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rooms',
    })
  }
}

// ================================
// GET SINGLE ROOM
// ================================
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('student', 'name email course')

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      })
    }

    res.status(200).json({
      success: true,
      data: room,
    })
  } catch (error) {
    console.error('getRoomById error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch room',
    })
  }
}

// ================================
// CREATE ROOM
// ================================
const createRoom = async (req, res) => {
  try {
    const { number, type, floor } = req.body

    if (!number || !floor) {
      return res.status(400).json({
        success: false,
        message: 'Room number and floor are required',
      })
    }

    // Check if room number already exists
    const existingRoom = await Room.findOne({ number })
    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: `Room ${number} already exists`,
      })
    }

    const room = await Room.create({ number, type, floor })

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: room,
    })
  } catch (error) {
    console.error('createRoom error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to create room',
    })
  }
}

// ================================
// ASSIGN STUDENT TO ROOM
// ================================
const assignStudent = async (req, res) => {
  try {
    const { studentId } = req.body
    const room = await Room.findById(req.params.id)

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      })
    }

    // Check if room is already occupied
    if (room.student) {
      return res.status(400).json({
        success: false,
        message: 'Room is already occupied',
      })
    }

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      })
    }

    // Assign student to room
    room.student = studentId
    await room.save()

    // Update student's room field
    student.room = room.number
    await student.save()

    // Return populated room
    const updatedRoom = await Room.findById(room._id)
      .populate('student', 'name email course')

    res.status(200).json({
      success: true,
      message: 'Student assigned to room successfully',
      data: updatedRoom,
    })
  } catch (error) {
    console.error('assignStudent error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to assign student',
    })
  }
}

// ================================
// UNASSIGN STUDENT FROM ROOM
// ================================
const unassignStudent = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      })
    }

    if (!room.student) {
      return res.status(400).json({
        success: false,
        message: 'Room is already vacant',
      })
    }

    // Clear student's room field
    await Student.findByIdAndUpdate(room.student, { room: '' })

    // Clear room's student field
    room.student = null
    await room.save()

    res.status(200).json({
      success: true,
      message: 'Student unassigned from room successfully',
      data: room,
    })
  } catch (error) {
    console.error('unassignStudent error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to unassign student',
    })
  }
}

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  assignStudent,
  unassignStudent,
}
