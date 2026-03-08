import dotenv from 'dotenv'
dotenv.config()

import pkg from 'pg'
const { Pool } = pkg

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}
const pool = new Pool(config)
pool.on('error',(err, client) => {
    console.error('Unexpected error on idle client', err)
})

pool.query('SELECT NOW()', (err, res) => {
    if(err){
        console.error('Error connecting to the database', err)
    } else {
        console.log('Database connection successful:', res.rows[0])
    }
})
export default pool