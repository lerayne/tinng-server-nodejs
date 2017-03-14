/**
 * Created by lerayne on 14.03.17
 * @flow
 */

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.port || 3001

app.get('/', (req, res) => {
    res.end('Hello app!')
})

app.get('/test1', (req, res) => {
    //res.end(__dirname)
    res.sendFile('/static/index.html', {root: __dirname})
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

server.listen(PORT.toString(), () => {
    console.log(`Server listening on ${PORT}`)
})

/*
class TestClass {

    var1 = 0

    constructor() {
        this.var1 = 1
    }

    static var2 = {
        var3: 3
    }

    method1(arg1: string, arg2?: bool) {
        return 4
    }

    method2() {
        this.method1('string', true)
    }
}

const num: string = 'hello!'

const test = new TestClass()
test.method1('string')*/