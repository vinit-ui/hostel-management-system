const mongoose = require('mongoose')

const feeSchema = new mongoose.Schema(
  {
    // Links this fee record to a student
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Fee amount is required'],
      min: 0,
    },
    status: {
      type: String,
      enum: ['Paid', 'Pending', 'Partial'],
      default: 'Pending',
    },
    dueDate: {
      type: Date,
      required: true,
    },
    remarks: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const Fee = mongoose.model('Fee', feeSchema)

module.exports = Fee
