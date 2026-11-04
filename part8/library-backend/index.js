require('dotenv').config()

const mongoose = require('mongoose')
const startServer = require('./server')

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 4000

console.log('connecting to', MONGODB_URI)

const main = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('error connecting to MongoDB:', error.message)
    process.exit(1)
  }

  startServer(PORT)
}

main()
