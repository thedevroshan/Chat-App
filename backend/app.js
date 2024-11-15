import express from 'express'

// Config
import { configuration } from './config/config.js'

// DB
import { ConnectDB } from './db/connect.js'

// Routes
import authRoutes from './routes/authRoutes.js'

const app = express()

// Connecting to DB
ConnectDB()

// Middlewares
app.use(express.json())



// API Routes
app.use('/api/auth', authRoutes)

app.listen(configuration.PORT, ()=>{
    console.log(`Server is running at http://localhost:${configuration.PORT}`)
})