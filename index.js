const express = require('express')
const cors = require('cors')
const app = express()
require('./db').connect()
const errorHandler = require('./middleware/errorHandler')

const allowedOrigins = ['http://localhost:3000', process.env.PROD_FRONTEND_URL]
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Origin not allowed by CORS'))
    }
  }
}))
app.use(express.json())
app.use('/', require('./routes'))

app.use(errorHandler)

const DEFAULT_PORT = process.env.PORT || 8080
app.listen(DEFAULT_PORT, () => {
  console.log(`Server is running on http://localhost:${DEFAULT_PORT}`)
})