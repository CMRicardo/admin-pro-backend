import express from 'express'
import { dbConnection } from './database/config.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
dbConnection()

app.get('/', (req, res) => {
  res.json({ message: '👋 Hello world!' })
})

// ricardocorrales84
// 893B6PfUPbYwkney
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
