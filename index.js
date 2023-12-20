import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'

import { dbConnection } from './database/config.js'

import { usersRouter } from './routes/users.route.js'
import { authRouter } from './routes/auth.route.js'
import { hospitalsRouter } from './routes/hospitals.route.js'
import { doctorsRouter } from './routes/doctors.route.js'
import { searchRouter } from './routes/search.route.js'
import { uploadsRouter } from './routes/uploads.route.js'

const app = express()
app.use(cors())
app.use(express.json())
dbConnection()

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Hello world!'
  })
})

app.use('/api/all', searchRouter)
app.use('/api/auth', authRouter)
app.use('/api/doctors', doctorsRouter)
app.use('/api/hospitals', hospitalsRouter)
app.use('/api/uploads', uploadsRouter)
app.use('/api/users', usersRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
