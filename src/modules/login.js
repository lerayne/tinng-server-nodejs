/**
 * Created by lerayne on 24.06.17.
 */

import bcrypt from 'bcryptjs'
import url from 'url'
import jwt from 'jsonwebtoken'
import getUserAuth from '../api/getUserAuth'
import {keyExpiresIn, secretKey} from 'config'

export function getJWToken(payload, optionsOverride = {}){
    const options = {
        expiresIn: keyExpiresIn,
        ...optionsOverride
    }

    return new Promise((resolve, reject) => {
        jwt.sign({payload}, secretKey, options, function (err, token) {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

export function checkUserAuth(req){
    return new Promise((resolve, reject) => {

        if (!req.cookies.access_token) {
            resolve(false)
        } else {
            jwt.verify(req.cookies.access_token, secretKey, (err, decoded) => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(decoded)
                }
            })
        }
    })
}

/**
 *
 * @param req
 * @param res
 * @param insecureUser - insecure until password hash is not removed
 * @returns {Promise.<void>}
 */
export async function createAccessToken(insecureUser) {

    try {
        // removing password hash
        const {password_hash, ...rest} = insecureUser

        const user = {
            ...rest,
            ip: '0.0.0.0' // todo: current user IP should be there
        }

        // todo - get domain from env (doesnt work now on prod)
        // const host = req.get('host')
        // const hostname = host.split(':')[0]

        return await getJWToken(user)

    } catch (error) {
        console.error('grantAccess:', error)
        throw error
    }
}

export async function getLoginToken(req, res){
    try {

        res.header('Access-Control-Allow-Origin', '*')

        const bodyJson = JSON.parse(req.body)

        const user = await getUserAuth(bodyJson.login)

        if (!user) {
            res.status(401).send('Login or password not correct')
        } else {
            const passwordCorrect = await bcrypt.compare(bodyJson.password, user.password_hash)

            if (!passwordCorrect) {
                res.status(401).send('Login or password not correct')
            } else {
                const token = await createAccessToken(user)
                console.log('token', token)
                res.send(token)
            }
        }
    } catch (err) {
        res.status(500).send('getLoginToken error')
    }
}

/**
 * Legacy login func from expenses
 */
/*export default async function login(req, res) {

    const {payload: currentUser} = await checkUserAuth(req)

    if (currentUser) {
        // Already logged in: redirect back
        res.redirect(302, req.body.nextUrl || '/')
    } else {

        const user = await getUserAuth(req.body.email)

        if (!user) {
            // No such user
            redirectToFailure(req, res)
        } else {
            const passwordCorrect = await bcrypt.compare(req.body.password, user.password_hash)

            if (!passwordCorrect) {
                // Wrong password
                redirectToFailure(req, res)
            } else {
                // User is successfully authed!
                await grantAccess(req, res, user)
                res.redirect(302, req.body.nextUrl || '/')
            }
        }
    }
}*/
