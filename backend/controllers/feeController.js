const Fee = require('../models/Fee')
const Student = require('../models/Student')

// ================================
// GET ALL FEES
// ================================
const getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate('student', 'name email course room')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: fees.length,
      data: fees,
    })
  } catch (error) {
    console.error('getAllFees error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fees',
    })
  }
}

// ================================
// GET FEE BY STUDENT ID
// ================================
const getFeeByStudent = async (req, res) => {
  try {
    const fee = await Fee.findOne({ student: req.params.studentId })
      .populate('student', 'name email course room')

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found for this student',
      })
    }

    res.status(200).json({
      success: true,
      data: fee,
    })
  } catch (error) {
    console.error('getFeeByStudent error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fee record',
    })
  }
}

// ================================
// CREATE FEE RECORD
// ================================
const createFee = async (req, res) => {
  try {
    const { studentId, amount, dueDate, status, remarks } = req.body

    if (!studentId || !amount || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Student ID, amount and due date are required',
      })
    }

    // Check student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      })
    }

    // Check if fee record already exists for this student
    const existingFee = await Fee.findOne({ student: studentId })
    if (existingFee) {
      return res.status(400).json({
        success: false,
        message: 'Fee record already exists for this student',
      })
    }

    const fee = await Fee.create({
      student: studentId,
      amount,
      dueDate,
      status: status || 'Pending',
      remarks: remarks || '',
    })

    // Update student fee status
    await Student.findByIdAndUpdate(studentId, {
      feeStatus: status || 'Pending',
    })

    const populatedFee = await Fee.findById(fee._id)
      .populate('student', 'name email course room')

    res.status(201).json({
      success: true,
      message: 'Fee record created successfully',
      data: populatedFee,
    })
  } catch (error) {
    console.error('createFee error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to create fee record',
    })
  }
}

// ================================
// UPDATE FEE
// ================================
const updateFee = async (req, res) => {
  try {
    const { status, amount, dueDate, remarks } = req.body

    const fee = await Fee.findById(req.params.id)
    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found',
      })
    }

    // Update fee record
    const updatedFee = await Fee.findByIdAndUpdate(
      req.params.id,
      { status, amount, dueDate, remarks },
      { new: true, runValidators: true }
    ).populate('student', 'name email course room')

    // Keep student feeStatus in sync
    if (status) {
      await Student.findByIdAndUpdate(fee.student, {
        feeStatus: status,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Fee updated successfully',
      data: updatedFee,
    })
  } catch (error) {
    console.error('updateFee error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to update fee',
    })
  }
}

// ================================
// GET FEE SUMMARY STATS
// ================================
const getFeeSummary = async (req, res) => {
  try {
    const fees = await Fee.find()

    const total = fees.reduce((sum, f) => sum + f.amount, 0)
    const collected = fees
      .filter((f) => f.status === 'Paid')
      .reduce((sum, f) => sum + f.amount, 0)
    const pending = fees
      .filter((f) => f.status === 'Pending')
      .reduce((sum, f) => sum + f.amount, 0)
    const partial = fees
      .filter((f) => f.status === 'Partial')
      .reduce((sum, f) => sum + f.amount, 0)

    res.status(200).json({
      success: true,
      data: {
        totalAmount: total,
        collectedAmount: collected,
        pendingAmount: pending,
        partialAmount: partial,
        paidCount: fees.filter((f) => f.status === 'Paid').length,
        pendingCount: fees.filter((f) => f.status === 'Pending').length,
        partialCount: fees.filter((f) => f.status === 'Partial').length,
      },
    })
  } catch (error) {
    console.error('getFeeSummary error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fee summary',
    })
  }
}

module.exports = {
  getAllFees,
  getFeeByStudent,
  createFee,
  updateFee,
  getFeeSummary,
}
