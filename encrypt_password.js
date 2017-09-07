/**
 * Created by lerayne on 22.06.17.
 */

const bcrypt = require('bcryptjs')
const promisify = require('es6-promisify')

const begin = new Date()

const password = 'globus84'

const passwordSecurityPower = 14

const hash = promisify(bcrypt.hash)

async function hashAndLog(){
    try {
        const passwordhash = await hash(password, passwordSecurityPower)

        const end = new Date()

        const msSpent = parseInt(end.valueOf()) - parseInt(begin.valueOf())

        console.log(passwordhash)
        console.log(msSpent + 'ms')
        console.log('now:', end.valueOf())
    } catch (err) {
        console.error(err)
    }
}

hashAndLog()


