/**
 * Created by lerayne on 28.05.17.
 */

const config = require('./config')
const jwt = require('jsonwebtoken')

const user = {
    id: 1,
    role: 'admin',
    name: 'admin',
    displayName: 'Admin'
}

const token = jwt.sign(user, config.secretKey, {expiresIn:60*60})

console.log(token)