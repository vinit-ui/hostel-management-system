const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: [true, 'Room number is required'],
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Single', 'Double', 'Triple'],
      default: 'Single',
    },
    floor: {
      type: String,
      required: true,
    },
    // Stores reference to Student document
    // null means room is vacant
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
