import express from 'express'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import './db/db.js'
const app = express()

// middleware
app.use(cors())
// After FE deployment TO-DO
// app.use(cors({
//     origin: process.env.CLIENT_URL
// }))
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
