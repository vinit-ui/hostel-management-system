const Student = require('../models/Student')
const Fee = require('../models/Fee')
const Room = require('../models/Room')

// ================================
// GET ALL STUDENTS
// ================================
const getAllStudents = async (req, res) => {
  try {
    // Fetch all students from MongoDB
    // Sort by newest first
    const students = await Student.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    })
  } catch (error) {
    console.error('getAllStudents error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
    })
  }
}

// ================================
// GET SINGLE STUDENT
// ================================
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      })
    }

    res.status(200).json({
      success: true,
      data: student,
    })
  } catch (error) {
    console.error('getStudentById error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student',
    })
  }
}

// ================================
// CREATE STUDENT
// ================================
const createStudent = async (req, res) => {
  try {
    const { name, email, phone, course, room, feeStatus } = req.body

    // Check required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      })
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ email })
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists',
      })
    }

    // Create new student in MongoDB
    const student = await Student.create({
      name,
      email,
      phone,
      course,
      room,
      feeStatus,
    })

    // Auto-generate fee record
    await Fee.create({
      student: student._id,
      amount: 50000,
      status: feeStatus || 'Pending',
      dueDate: new Date('2026-12-31'),
      remarks: 'Auto-generated fee record',
    })

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student,
    })
  } catch (error) {
    console.error('createStudent error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
    })
  }
}

// ================================
// UPDATE STUDENT
// ================================
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      })
    }

    // Update student with new data
    // { new: true } returns updated document
    // { runValidators: true } runs schema validation
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    // Sync fee record if feeStatus was updated from the Students page
    if (req.body.feeStatus) {
      await Fee.findOneAndUpdate(
        { student: req.params.id },
        { status: req.body.feeStatus }
      )
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    })
  } catch (error) {
    console.error('updateStudent error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to update student',
    })
  }
}

// ================================
// DELETE STUDENT
// ================================
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      })
    }

    // CASCADE 1: Free up the room
    await Room.findOneAndUpdate({ student: student._id }, { student: null })

    // CASCADE 2: Delete fee record
    await Fee.findOneAndDelete({ student: student._id })

    // CASCADE 3: Delete student
    await Student.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    })
  } catch (error) {
    console.error('deleteStudent error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
    })
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
}
