const express = require('express')
const router = express.Router()

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController')

// /api/students
router.get('/', getAllStudents)
router.post('/', createStudent)

// /api/students/:id
router.get('/:id', getStudentById)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

module.exports = router
