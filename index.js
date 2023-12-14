import express from 'express'
import cors from 'cors'
import { dbConnection } from './database/config.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
dbConnection()

app.get('/', (req, res) => {
  res.json({ message: '👋 Hello world!' })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
