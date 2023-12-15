import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'

import { dbConnection } from './database/config.js'

import { usersRouter } from './routes/users.route.js'
import { authRouter } from './routes/auth.route.js'

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

app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
