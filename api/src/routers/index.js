const express = require('express')
const { getFilesData, getFilesList } = require('../controllers')

const router = express.Router()

router.get('/files/list', getFilesList)
router.get('/files/data', getFilesData)

module.exports = router
