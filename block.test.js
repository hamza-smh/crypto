const Block = require('./block')

describe('Block', () => {
  const timestamp = 'ts-data'
  const hash = 'h-data'
  const lastHash = 'lh-date'
  const data = ['d-data2', 'd-data']
  const block = new Block({ timestamp, hash, lastHash, data })

  it('has a timestamp,a hash , a lastHash ,and a data property', () => {
    expect(block.timestamp).toEqual(timestamp)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.hash).toEqual(hash)
    expect(block.data).toEqual(data)
  })
})
