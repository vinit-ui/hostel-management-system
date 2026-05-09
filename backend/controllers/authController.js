const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Generate JWT Token
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  })
}

// ================================
// ADMIN LOGIN
// ================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    // Check against admin credentials in .env
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    // Check email
    if (email !== adminEmail) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Check password
    if (password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Generate token
    const token = generateToken({
      email: adminEmail,
      role: 'admin',
    })

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        email: adminEmail,
        role: 'admin',
        name: 'Admin',
      },
    })
  } catch (error) {
    console.error('Login error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
    })
  }
}

// ================================
// VERIFY TOKEN
// ================================
const verifyToken = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid',
    admin: req.admin,
  })
}

module.exports = { login, verifyToken }
