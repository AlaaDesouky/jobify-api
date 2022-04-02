import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
// Routers Imports
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// Middleware Imports
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

const app = express()
dotenv.config()

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => { res.send("HOLA") })

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

// Custom Middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// Server and Database Config
const port = process.env.PORT || 5000
const start = async () => {
  try {
    // Database connection
    await connectDB(process.env.MONGO_URL)
    console.log('DB connected successfully...')
    // Server Connection
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

// Start app
start()