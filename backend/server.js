import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import siteRoutes from './routes/site.routes.js'
import appointmentRoutes from './routes/appointment.routes.js'
import blogRoutes from './routes/blog.routes.js'
import mediaRoutes from './routes/media.routes.js'
import pageRoutes from './routes/page.routes.js'
import { errorHandler } from './middleware/error.middleware.js'
import { apiLimiter } from './middleware/rateLimit.middleware.js'

dotenv.config()

const app = express()

// Connect Database
connectDB()

// Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use('/api/', apiLimiter)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/site', siteRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/pages', pageRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
