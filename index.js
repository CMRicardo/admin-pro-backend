import path from 'node:path'
import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import { dbConnection } from './database/config.js'

import { usersRouter } from './routes/users.route.js'
import { authRouter } from './routes/auth.route.js'
import { hospitalsRouter } from './routes/hospitals.route.js'
import { doctorsRouter } from './routes/doctors.route.js'
import { searchRouter } from './routes/search.route.js'
import { uploadsRouter } from './routes/uploads.route.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(cors())
// Public directory
app.use(express.static('public'))

app.use(express.json())
dbConnection()

app.use('/api/all', searchRouter)
app.use('/api/auth', authRouter)
app.use('/api/doctors', doctorsRouter)
app.use('/api/hospitals', hospitalsRouter)
app.use('/api/uploads', uploadsRouter)
app.use('/api/users', usersRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
