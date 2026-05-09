const mongoose = require('mongoose')

// Connect to MongoDB Atlas
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    // Exit process if database fails to connect
    process.exit(1)
  }
}

module.exports = connectDB
