const express = require('express')
const router = express.Router()
const { login, verifyToken } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

// Public route — no token needed
router.post('/login', login)

// Protected route — token required
router.get('/verify', protect, verifyToken)

module.exports = router
