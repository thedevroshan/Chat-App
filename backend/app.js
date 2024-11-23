import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Config
import { configuration } from './config/config.js'

// DB
import { ConnectDB } from './db/connect.js'

// Routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

// Connecting to DB
ConnectDB()

//Cors
app.use(cors({
    origin: `${configuration.FRONTEND}${configuration.FRONTEND_PORT}`,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.raw({type: '*/*', limit: '5MB'}))



// API Routes
app.use('/api/auth', authRoutes)

app.use('/api/user', userRoutes)

app.listen(configuration.PORT, ()=>{
    console.log(`Server is running at http://localhost:${configuration.PORT}`)
})