import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
// Middleware Imports
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

const app = express()
dotenv.config()

// Routes
app.get('/', (req, res) => {
  res.send("HOLA")
})

// Custom Middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// Server and Database Config
const port = process.env.PORT || 5000
const start = async () => {
  try {
    // Database connection
    await connectDB(process.env.MONGO_URL)
    console.log('DB connected successfuly...')
    // Server Connection
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

// Start app
start()