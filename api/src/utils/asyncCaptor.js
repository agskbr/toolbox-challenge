const onFulfilled = (result) => [null, result]
const onRejected = (error) => [error, null]

/**
 * Async catcher for promises
 * @param {Promise} promise - Promise to catch
 * @returns {Promise<[Error | null, any]>} - Promise that resolves to an array containing the error and result
 */
const asyncCatcher = async (promise) => {
  return Promise.resolve(promise)
    .then(onFulfilled, onRejected)
}

module.exports = asyncCatcher
