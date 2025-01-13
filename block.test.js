const Block = require('./block')
const { GENESIS_DATA } = require('./config')

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
  });



  describe('genesis()',()=>{
    const genesisBlock = Block.genesis();
    it('returns a valid block instance',()=>{
        expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns genesis data',()=>{
        expect(genesisBlock).toEqual(GENESIS_DATA)
    })

  
})
})
