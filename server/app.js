import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { Server } from 'socket.io'
import { createServer } from 'node:http'

dotenv.config()

const port = process.env.PORT
const reactPort = process.env.REACT_PORT
const url = process.env.URL

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const app = express()
app.use(cors())

const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: url + reactPort,
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('Usuario desconectado', socket.id)
    })

    socket.on('join_room', (dataUser) => {
        socket.join(dataUser.room)
    })

    socket.on('send_message', (dataMessage) => {
        socket.to(dataMessage.room).emit('receive_message', dataMessage)
    })
})

server.listen(port, () => {
   console.log(`Server running`)
})