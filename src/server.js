/**
 * Created by lerayne on 14.03.17.
 */

import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import path from 'path'

const app = express()
const server = http.Server(app)
const io = socketIO(server)

const PORT = process.env.port || 3001

app.get('/', (req, res) => {
    res.end('Hello app!')
})

app.get('/test1', (req, res) => {
    //res.end(__dirname)
    res.sendFile('/index.html', {root: __dirname})
})

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})


class TestClass {
    constructor() {
        this.var1 = 1
    }

    static var2 = {
        var3: 3
    }

    method1(arg1: String, arg2: Boolean) {
        return 4
    }

    method2() {
        ::this.method1()
    }
}