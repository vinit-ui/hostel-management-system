require('node:dns').setServers(['8.8.8.8', '1.1.1.1'])
require('dotenv').config()
const mongoose = require('mongoose')
const Room = require('./models/Room')
const Student = require('./models/Student')
const connectDB = require('./config/db')

async function fixRooms() {
  try {
    await connectDB()
    console.log('Connected to DB for fixing...')

    const students = await Student.find()
    
    for (let student of students) {
      if (student.room && student.room.trim() !== '') {
        const roomNum = student.room.trim()
        const roomDoc = await Room.findOne({ number: roomNum })
        
        if (roomDoc) {
          roomDoc.student = student._id
          await roomDoc.save()
          console.log(`✅ Assigned ${student.name} to Room ${roomNum}`)
        }
      }
    }

    console.log('Fix complete!')
    process.exit(0)
  } catch (error) {
    console.error('Fix error:', error)
    process.exit(1)
  }
}

fixRooms()
