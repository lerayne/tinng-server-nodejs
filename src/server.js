/**
 * Created by lerayne on 14.03.17
 */

import 'babel-polyfill'
const app = require('express')()
const server = require('http').createServer(app)
const socketIo = require('socket.io')(server)
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
//import cookieParser from 'cookie-parser'
/*import socketioJwt from 'socketio-jwt'*/

//local modules
import {query} from './modules/db'

import {loginPOST} from './api/login'
import {checkAuthPOST} from './api/checkAuth'

//config
import {secretKey} from 'config'

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended:false}))

// post login
app.post('/login', loginPOST)
app.post('/checkAuth', checkAuthPOST)

// Direct http access response
app.get('/', (req, res) => {
    res.end('TINNG server is working')
})

// default user (stays this way if not logged in)
let user = {
    id: -1,
    name:'anonymous',
    displayName: 'Anonymous',
    role: 'anonymous'
}

// main socket routine
socketIo.on('connection', connection => {

    /**
     * TESTING SOCKET.IO
     */

    console.log(`new user ${connection.client.id} connected`)

    /**
     * Custom 'authenticate' request
     */
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

        if (user.role !== undefined && user.role !== 'anonumous') {
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

const PORT = process.env.PORT || 3001

server.listen(PORT.toString(), () => {
    console.log(`Server listening on ${PORT}`)
})