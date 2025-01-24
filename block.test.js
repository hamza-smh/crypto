const hexToBinary = require('hex-to-binary');
const Block = require('./block')
const cryptoHash = require('./crypto-hash')
const { GENESIS_DATA, MINE_RATE } = require('./config')

describe('Block', () => {
  const timestamp = 2000
  const hash = 'h-data'
  const lastHash = 'lh-date'
  const data = ['d-data2', 'd-data']
  const nonce = 1
  const difficulty = 1
  const block = new Block({
  timestamp,
  hash,
  lastHash,
  data,
  nonce,
  difficulty
})


  it('has a timestamp,a hash , a lastHash ,and a data property', () => {
    expect(block.timestamp).toEqual(timestamp)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.hash).toEqual(hash)
    expect(block.data).toEqual(data)
    expect(block.nonce).toEqual(nonce)
    expect(block.difficulty).toEqual(difficulty)
  })

  describe('genesis()', () => {
    const genesisBlock = Block.genesis()

    //  console.log("genesis", genesisBlock);

    it('returns a valid block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true)
    })

    it('returns genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA)
    })
  })

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis()
    const data = 'Mined Data'
    const minedBlock = Block.mineBlock({ lastBlock, data })

    it('returns a Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true)
    })

    it('sets the `lastHash` to the `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash)
    })

    it('set the data', () => {
      expect(minedBlock.data).toEqual(data)
    })

    it('sets the timestamp', () => {
      //expect(typeof minedBlock.timestamp).toBe('string')
      expect(minedBlock.timestamp).not.toEqual(undefined)
    })

    it('creates a SHA-256 `hash` based on proper inputs', () => {
      expect(minedBlock.hash)
        .toEqual(
            cryptoHash(
              minedBlock.timestamp,
              minedBlock.nonce,
              minedBlock.difficulty,
              lastBlock.hash,
              data
            )
        )
    })

    it('sets a `hash` that matches the difficulty',()=>{
        expect(hexToBinary(minedBlock.hash).substring(0,minedBlock.difficulty))        
            .toEqual('0'.repeat(minedBlock.difficulty))
    })

    it('adjusts the difficulty',()=>{
        const possibleResults=[lastBlock.difficulty+1, lastBlock.difficulty-1];
        expect(possibleResults.includes(minedBlock.difficulty)).toBe(true)
    })
  })

  describe('adjustDifficulty()', () => {
    it('raises difficulty for quickly mined block', () => {
      expect(Block.adjustDifficulty({
        originalBlock : block,
        timestamp : block.timestamp + MINE_RATE -100
    })).toEqual(block.difficulty + 1 )
    })
    it('lowers difficulty for a slow mined block',()=>{
        expect(Block.adjustDifficulty({
        originalBlock : block,
        timestamp : block.timestamp + MINE_RATE +100
    })).toEqual(block.difficulty - 1 )
    })
    it('has a lower limit of 1',()=>{
        block.difficulty = -1;
        expect(Block.adjustDifficulty({originalBlock:block})).toEqual(1)
    })
  })
})
