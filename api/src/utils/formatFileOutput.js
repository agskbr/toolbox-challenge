const { getFile } = require('../services')
const asyncCaptor = require('../utils/asyncCaptor')
const parseCsv = require('../utils/csvParser')

/**
 * Formats the file output
 * @param {string} file - The file to format
 * @returns {Promise<Array>} - The formatted array with objects containing file name and lines
 */
const formatFileOutput = async (file) => {
  const [error, fileData] = await asyncCaptor(getFile(file))
  if (error) return null
  const csv = parseCsv(fileData)
  const result = csv.reduce((acc, file) => {
    if (!acc[file.file]) {
      acc[file.file] = [{ text: file.text, number: file.number, hex: file.hex }]
    } else {
      acc[file.file].push({ text: file.text, number: file.number, hex: file.hex })
    }

    return acc
  }, {})

  const output = Object.entries(result).map(([file, lines]) => ({
    file,
    lines
  }))

  return output
}

module.exports = formatFileOutput
