const { getFileList } = require('../services')
const asyncCaptor = require('../utils/asyncCaptor')
const formatFileOutput = require('../utils/formatFileOutput')

const getFilesList = async (req, res) => {
  const [error, data] = await asyncCaptor(getFileList())
  if (error || !data?.files) {
    return res.status(400).json({ error: 'Error fetching file list' })
  }

  if (!Array.isArray(data.files)) {
    return res.status(400).json({ error: 'Invalid response format from external API' })
  }

  res.json(data)
}

const getFilesData = async (req, res) => {
  const { fileName } = req.query
  const [error, data] = await asyncCaptor(getFileList())
  if (error || !data?.files) {
    return res.status(400).json({ error: 'Error fetching file list' })
  }

  if (!Array.isArray(data.files)) {
    return res.status(400).json({ error: 'Invalid response format from external API' })
  }

  const filterByName = (file) => {
    if (!fileName) return true
    return file.includes(fileName.toLowerCase())
  }

  const filePromises = data.files.filter(filterByName).map(formatFileOutput)

  // Wait for all file promises to resolve and filter out any null values
  const files = (await Promise.all(filePromises)).filter(Boolean).flat()

  res.json(files)
}

module.exports = {
  getFilesData,
  getFilesList
}
