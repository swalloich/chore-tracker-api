const express = require('express')
const app = express()
require('./db').connect()

app.use(express.json())
app.use('/', require('./routes'))

const DEFAULT_PORT = process.env.PORT || 8080
app.listen(DEFAULT_PORT, () => {
  console.log(`Server is running on http://localhost:${DEFAULT_PORT}`)
})