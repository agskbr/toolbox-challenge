const express = require('express')
const router = require('./src/routers')
const cors = require('cors')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

app.listen(8000, () => {
  console.log('Server running on port 8000')
})
