import pool from './db.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const runMigrations = async () => {
    try {
        const migrationPath = path.join(__dirname, 'migrations', '001_create_users_table.sql')
        const sql = fs.readFileSync(migrationPath, 'utf8')
        await pool.query(sql)
        console.log('Migrations ran successfully!')
        process.exit(0)
    } catch (err) {
        console.error('Migration failed:', err)
        process.exit(1)
    }
}

runMigrations()