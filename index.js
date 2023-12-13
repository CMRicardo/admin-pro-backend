import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({ message: '👋 Hello world!' })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
