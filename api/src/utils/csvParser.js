/**
 * Parse CSV stringified value
 * @param {string} input - CSV input string
 * @returns {Array<Object>} - Array of objects representing the CSV data
 */
function parseCsv (input) {
  // Normalize escaped newlines (like "\n") to real newlines
  const normalized = input.replace(/\\n/g, '\n').trim()

  const lines = normalized.split('\n')
  if (lines.length < 2) return []

  // Extract and trim headers
  const headers = lines[0].split(',').map(header => header.trim())

  // Map each data line to an object
  const records = lines.slice(1).map(line => {
    const cols = line.split(',')
    const obj = {}
    headers.forEach((h, i) => {
      const value = cols[i] === '' || cols[i] === undefined ? null : cols[i].trim()
      obj[h] = value
    })
    return obj
  })

  return records
}

module.exports = parseCsv
