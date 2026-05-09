const jwt = require('jsonwebtoken')

function protect(req, res, next) {
  let token

  // Check if token exists in Authorization header
  // Token format: "Bearer eyJhbGci..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  // No token found
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please log in.',
    })
  }

  try {
    // Verify token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach admin info to request object
    req.admin = decoded

    // Continue to next middleware or route handler
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    })
  }
}

module.exports = { protect }
