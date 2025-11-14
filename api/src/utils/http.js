const axios = require('axios')
require('dotenv').config({ quiet: true })

const http = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_KEY}`
  }
})

module.exports = http
