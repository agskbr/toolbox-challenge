const http = require('../utils/http')

/**
 * Get full list of files from the external API
 * @returns {Promise<{files:Array<string>}> | null>}
 */
const getFileList = async () => {
  const response = await http.get('/secret/files')
  if (response.status !== 200) return null
  return response.data
}

/**
 * Get file content from the external API
 * @param {string} fileName - File name to find
 * @returns {Promise<Array<{text: string, number: number, hex: string}> | null>}
 */
const getFile = async (fileName) => {
  const response = await http.get(`/secret/file/${fileName}`)
  if (response.status !== 200) return null
  return response.data
}

module.exports = { getFileList, getFile }
