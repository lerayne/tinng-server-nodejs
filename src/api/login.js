/**
 * Created by lerayne on 02.10.2017.
 */

import bcrypt from 'bcryptjs'
//local
import getUserAuth from '../db/getUserAuth'
import {createUserToken} from '../modules/login'

/**
 * creates new token from login and password
 *
 * @param req
 * @param res
 */
export async function loginPOST(req, res) {
    try {
        // todo: defence against brute force password guess

        res.header('Access-Control-Allow-Origin', '*')

        const bodyJson = JSON.parse(req.body)

        // this user object is insecure, because it contains password hash! do not pass it
        // to functions that require secure user!
        const insecureUser = await getUserAuth(bodyJson.login)

        if (!insecureUser) {
            res.status(401).send('Login or password not correct')
        } else {
            const passwordCorrect = await bcrypt.compare(bodyJson.password, insecureUser.password_hash)

            if (!passwordCorrect) {
                res.status(401).send('Login or password not correct')
            } else {
                const token = await createUserToken(insecureUser)
                res.send(token)
            }
        }
    } catch (err) {
        console.error('loginPOST error:', err)
        res.status(500).send('getLoginToken error')
    }
}