import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

// config
import { configuration } from '../config/config.js'

const app = express()

const httpServer = http.createServer(app)
const socketIO = new Server(httpServer, {
    cors: {
        origin: `${configuration.FRONTEND}${configuration.FRONTEND_PORT}`,
		methods: ["GET", "POST"],
    }
})

const userSocketMap = {};

export const GetUserSocketId = (userMongoId) => {
	return userSocketMap[userMongoId]
}

socketIO.on("connection", (socket) => {

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	socketIO.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		delete userSocketMap[userId];
		socketIO.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});


export { socketIO, app, httpServer }