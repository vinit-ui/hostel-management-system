const express = require('express')
const router = express.Router()

const {
  getAllFees,
  getFeeByStudent,
  createFee,
  updateFee,
  getFeeSummary,
} = require('../controllers/feeController')

// /api/fees
router.get('/', getAllFees)
router.post('/', createFee)

// /api/fees/summary
router.get('/summary', getFeeSummary)

// /api/fees/:id
router.put('/:id', updateFee)

// /api/fees/student/:studentId
router.get('/student/:studentId', getFeeByStudent)

module.exports = router
