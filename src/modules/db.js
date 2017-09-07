/**
 * Created by lerayne on 09.01.17.
 */

import mysql from 'mysql'
import {dbConfig} from 'config'

const db = mysql.createConnection(dbConfig)

db.connect(err => {
    if (err) {
        console.error('Database connection error')
        return null
    }

    console.log('Database connected as', db.threadId)
})

export default db

export function query(query, data=false) {
    return new Promise((resolve, reject) => {

        query = mysql.format(query, data)

        const params = [query]

        params.push((err, rows) => {
            if (err) reject(err)
            if (rows) resolve(rows)
        })

        db.query(...params)
    })
}