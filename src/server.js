/**
 * Created by lerayne on 14.03.17
 * @flow
 */

import 'babel-polyfill'
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.end('TINNG server working')
})

io.on('connection', socket => {
    console.log('a user connected:', socket.client.id)

    socket.on('chat-message', msg => {
        console.log('message:', msg)
        socket.emit('new-message', msg)
    })

    socket.on('disconnect', () => {
        console.log(`user ${socket.client.id} disconnected`)
    })
})

const PORT = process.env.PORT || 3001

server.listen(PORT.toString(), () => {
    console.log(`Server listening on ${PORT}`)
})