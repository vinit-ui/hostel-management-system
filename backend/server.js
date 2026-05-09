// Force Node.js to use public DNS to resolve MongoDB SRV records (fixes ECONNREFUSED)
require('node:dns').setServers(['8.8.8.8', '1.1.1.1'])

// Load environment variables first
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const { protect } = require('./middleware/authMiddleware')

const app = express()

connectDB()

// ================================
// MIDDLEWARE
// ================================
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://192.168.7.5:5173',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ================================
// PUBLIC ROUTES
// ================================

// Health check — no auth needed
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Hostel Management System API is running',
    version: '1.0.0',
  })
})

// Auth routes — no token needed
app.use('/api/auth', require('./routes/authRoutes'))

// ================================
// PROTECTED ROUTES
// ================================
// All routes below require a valid JWT token

app.use('/api/students', protect, require('./routes/studentRoutes'))
app.use('/api/rooms', protect, require('./routes/roomRoutes'))
app.use('/api/fees', protect, require('./routes/feeRoutes'))

// ================================
// 404 HANDLER
// ================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  })
})

// ================================
// ERROR HANDLER
// ================================
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  })
})

// ================================
// START SERVER
// ================================
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
