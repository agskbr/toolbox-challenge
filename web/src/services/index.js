const API_BASE_URL = process.env.REACT_APP_API_URL || ''

/**
 * Fetches files from the API with optional file name
 * @param {string} fileName - The file name to filter files
 * @returns {Promise<Array>} - An array of files
 */
export const fetchFiles = async (fileName) => {
  try {
    const params = new URLSearchParams()
    if (fileName) params.set('fileName', fileName)

    const response = await fetch(`${API_BASE_URL}/files/data?${params.toString()}`)
    if (!response.ok) {
      throw new Error('There was an error getting the files')
    }
    return await response.json()
  } catch (error) {
    throw new Error('Something went wrong. Check your connection please')
  }
}
