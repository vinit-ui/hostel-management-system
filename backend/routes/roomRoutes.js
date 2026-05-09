const express = require('express')
const router = express.Router()

const {
  getAllRooms,
  getRoomById,
  createRoom,
  assignStudent,
  unassignStudent,
} = require('../controllers/roomController')

// /api/rooms
router.get('/', getAllRooms)
router.post('/', createRoom)

// /api/rooms/:id
router.get('/:id', getRoomById)

// /api/rooms/:id/assign
router.put('/:id/assign', assignStudent)

// /api/rooms/:id/unassign
router.put('/:id/unassign', unassignStudent)

module.exports = router
