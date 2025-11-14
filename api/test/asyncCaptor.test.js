const { expect } = require('chai')
const asyncCaptor = require('../src/utils/asyncCaptor')

describe('asyncCaptor', () => {
  it('should resolve with [null, result] when promise resolves', async () => {
    const promise = Promise.resolve('success')
    const [error, result] = await asyncCaptor(promise)

    expect(error).to.be.null
    expect(result).to.equal('success')
  })

  it('should resolve with [error, null] when promise rejects', async () => {
    const error = new Error('Something went wrong')
    const promise = Promise.reject(error)
    const [capturedError, result] = await asyncCaptor(promise)

    expect(capturedError).to.equal(error)
    expect(result).to.be.null
  })

  it('should handle non-promise values', async () => {
    const [error, result] = await asyncCaptor('immediate value')

    expect(error).to.be.null
    expect(result).to.equal('immediate value')
  })

  it('should handle async functions', async () => {
    const asyncFn = async () => 'async result'
    const [error, result] = await asyncCaptor(asyncFn())

    expect(error).to.be.null
    expect(result).to.equal('async result')
  })

  it('should handle sync errors in async functions', async () => {
    const error = new Error('Sync error')
    const asyncFn = async () => { throw error }
    const [capturedError, result] = await asyncCaptor(asyncFn())

    expect(capturedError).to.equal(error)
    expect(result).to.be.null
  })
})
