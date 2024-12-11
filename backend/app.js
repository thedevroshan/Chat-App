import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import {app, httpServer} from './socket/socket.js'

// Config
import { configuration } from './config/config.js'

// DB
import { ConnectDB } from './db/connect.js'

// Routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import serverRoutes from './routes/serverRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import friendRequestRoutes from './routes/friendRequestRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

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

app.use('/api/server', serverRoutes)

app.use('/api/category', categoryRoutes)

app.use('/api/friendrequest', friendRequestRoutes)

app.use('/api/message', messageRoutes)

httpServer.listen(configuration.PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})