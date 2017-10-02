/**
 * Created by lerayne on 03.10.2017.
 */

import {verifyJWToken} from '../modules/login'

export async function checkAuthPOST(req, res){
    try {
        console.log('checkAuthPOST', req.body)

        res.header('Access-Control-Allow-Origin', '*')

        const token = JSON.parse(req.body).token

        try {
            const decoded = await verifyJWToken(token)
            console.log('payload', decoded.payload)
            res.send(decoded.payload)

        } catch (err) {
            console.error('invalid token', err)
            res.status(401).send('invalid token: ' + JSON.stringify(err))
        }

    } catch (err) {
        console.error('ERROR in checkAuthPOST:', err)
        res.status(500).send('server error in checkAuthPOST')
    }
}