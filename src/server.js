/**
 * Created by lerayne on 14.03.17
 */

import 'babel-polyfill'
const app = require('express')()
const server = require('http').createServer(app)
const socketIo = require('socket.io')(server)
//import socketioJwt from 'socketio-jwt'
import jwt from 'jsonwebtoken'
import {secretKey} from 'config'

app.get('/', (req, res) => {
    res.end('TINNG server working')
})

// socketIo.set('authorization', socketioJwt.authorize({
//     secret: secretKey,
//     handshake: true
// }))

function setListeners(connection, user){

}

let user = {
    id: -1,
    name:'anonymous',
    displayName: 'Anonymous',
    role: 'anonymous'
}

socketIo.on('connection', connection => {

    console.log(`new user ${connection.client.id} connected`)

    connection.on('authenticate', msg => {

        jwt.verify(msg.token, secretKey, (err, decodedUser) => {

            if (err) {
                connection.emit('unauthorized', err)
            } else {
                console.log(`user recognized as ${decodedUser.displayName}`)
                connection.emit('authorized', decodedUser)
                user = decodedUser
            }
        })
    })

    connection.on('chat-message', msg => {
        console.log('message:', msg)

        if (user.role != undefined && user.role !== 'anonumous') {
            console.log('user can post messages')
            connection.emit('new-message', {
                payload: msg.payload
            })
        }
    })

    connection.on('disconnect', () => {
        console.log(`user ${connection.client.id} disconnected`)
    })
})

/*socketIo.on('connection', socketioJwt.authorize({
    secret: secretKey,
    timeout: 3000,
})).on('authenticated', connection => {
    console.log('a user connected:', connection.client.id, connection.decoded_token)





}).on('unauthorized', a => {
    console.log('unauthorized', a)
})*/

/*socketIo.on('connection', connection => {
    console.log('a user connected:', connection.client.id, connection.client.conn.request.decoded_token)

    connection.on('chat-message', msg => {
        console.log('message:', msg)
        socket.emit('new-message', {
            payload: msg.payload
        })
    })

    connection.on('disconnect', () => {
        console.log(`user ${connection.client.id} disconnected`)
    })
})*/

const PORT = process.env.PORT || 3001

server.listen(PORT.toString(), () => {
    console.log(`Server listening on ${PORT}`)
})