import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import 'express-async-errors'
import morgan from 'morgan'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
// Routers Imports
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// Middleware Imports
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

const app = express()
dotenv.config()

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// Routes
// app.get('/', (req, res) => { res.send("HOLA") })

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

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