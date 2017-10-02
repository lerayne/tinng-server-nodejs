/**
 * Created by lerayne on 23.03.17.
 */

import {query} from '../modules/db'

export default async function getUserAuth(loginEntry) {
    const SQLQuery = `
        SELECT 
            id,
            name, 
            email, 
            password_hash 
        FROM users 
        WHERE email = ? OR name = ?
    `

    const dbResp = await query(SQLQuery, [loginEntry, loginEntry])

    if (!dbResp[0]) {
        return false
    } else {
        return dbResp[0]
    }
}