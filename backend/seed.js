require('node:dns').setServers(['8.8.8.8', '1.1.1.1'])
require('dotenv').config()
const mongoose = require('mongoose')
const Room = require('./models/Room')
const Student = require('./models/Student')
const Fee = require('./models/Fee')
const connectDB = require('./config/db')

async function seedDatabase() {
  try {
    // Connect to DB
    await connectDB()
    console.log('Connected to DB for seeding...')

    // 1. Seed Rooms if empty
    const roomCount = await Room.countDocuments()
    if (roomCount === 0) {
      console.log('No rooms found. Creating 9 rooms...')
      const roomsToCreate = [
        { number: '101', type: 'Single', floor: '1st' },
        { number: '102', type: 'Single', floor: '1st' },
        { number: '103', type: 'Double', floor: '1st' },
        { number: '104', type: 'Double', floor: '1st' },
        { number: '105', type: 'Triple', floor: '1st' },
        { number: '106', type: 'Triple', floor: '1st' },
        { number: '201', type: 'Single', floor: '2nd' },
        { number: '202', type: 'Double', floor: '2nd' },
        { number: '203', type: 'Triple', floor: '2nd' },
      ]
      
      await Room.insertMany(roomsToCreate)
      console.log('✅ Rooms seeded successfully.')
    } else {
      console.log('Rooms already exist. Skipping room seed.')
    }

    // 2. Sync Student Rooms
    // If a student has room 'Room 102' but the Room document doesn't have the student ID, link them!
    const students = await Student.find()
    console.log(`Found ${students.length} students.`)

    for (let student of students) {
      // Create a fee record if they don't have one
      const existingFee = await Fee.findOne({ student: student._id })
      if (!existingFee) {
        // Randomly set Paid or Pending based on existing text or randomly
        const amount = 50000
        const status = student.feeStatus || 'Pending'
        
        await Fee.create({
          student: student._id,
          amount: amount,
          status: status,
          dueDate: new Date('2026-12-31'),
          remarks: 'Auto-generated fee record'
        })
        console.log(`✅ Created fee record for ${student.name}`)
      }

      // Link room if needed
      if (student.room && student.room.includes('Room')) {
        const roomNum = student.room.replace('Room ', '').trim()
        const roomDoc = await Room.findOne({ number: roomNum })
        
        if (roomDoc && !roomDoc.student) {
          roomDoc.student = student._id
          await roomDoc.save()
          console.log(`✅ Assigned ${student.name} to Room ${roomNum}`)
        }
      }
    }

    console.log('Seeding complete! You can safely delete this file.')
    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seedDatabase()
