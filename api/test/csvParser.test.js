const { expect } = require('chai')
const parseCsv = require('../src/utils/csvParser')

describe('parseCsv', () => {
  it('should parse a simple CSV string into an array of objects', () => {
    const csv = 'name,age,city\nJohn,30,New York\nJane,25,Los Angeles'
    const expected = [
      { name: 'John', age: '30', city: 'New York' },
      { name: 'Jane', age: '25', city: 'Los Angeles' }
    ]
    expect(parseCsv(csv)).to.deep.equal(expected)
  })

  it('should handle empty values by converting them to null', () => {
    const csv = 'name,age,city\nJohn,30,\n,25,Los Angeles'
    const expected = [
      { name: 'John', age: '30', city: null },
      { name: null, age: '25', city: 'Los Angeles' }
    ]
    expect(parseCsv(csv)).to.deep.equal(expected)
  })

  it('should handle newlines in the input', () => {
    const csv = 'name,description\nJohn,First line\nSecond line,Another field'
    const expected = [
      { name: 'John', description: 'First line' },
      { name: 'Second line', description: 'Another field' }
    ]
    expect(parseCsv(csv)).to.deep.equal(expected)
  })

  it('should return an empty array for empty input', () => {
    expect(parseCsv('')).to.deep.equal([])
  })

  it('should return an empty array for input with only whitespace', () => {
    expect(parseCsv('   \n  \n ')).to.deep.equal([])
  })

  it('should handle input with only headers', () => {
    const csv = 'name,age,city'
    expect(parseCsv(csv)).to.deep.equal([])
  })

  it('should trim whitespace from headers and values', () => {
    const csv = 'name, age , city  \n  John  , 30 , New York  '
    const expected = [
      { name: 'John', age: '30', city: 'New York' }
    ]
    expect(parseCsv(csv)).to.deep.equal(expected)
  })
})
