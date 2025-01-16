const Blockchain = require('./blockchain')
const Block = require('./block')

describe('Blockchain', () => {
  let blockchain

  beforeEach(() => {
    blockchain = new Blockchain()
  })

  it('contains a chain array', () => {
    expect(blockchain.chain instanceof Array).toBe(true)
  })

  it('starts with a Genesis Block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis())
  })

  it('adds a new block to the chain', () => {
    const newData = 'New Transaction Data'
    blockchain.addBlock({ data: newData })
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
  })

  describe('isValidChain', () => {
    describe('when chain doesnot start with Genesis Block', () => {
      it('returns false', () => {
        blockchain.chain[0] = { data: 'fake-genesis' }

        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
      })
    })

    describe('when chain does start with Genesis Block and multiple Blocks', () => {
      beforeEach(() => {
        blockchain.addBlock({ data: 'Horse' })
        blockchain.addBlock({ data: 'Apple' })
        blockchain.addBlock({ data: 'Goku' })
      })

      describe('and a lastHash ref has changed ', () => {
        it('returns false', () => {
          blockchain.chain[2].lastHash = 'broken chain Last Hash'

          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
        })
      })
    

    describe('and chain contains a block with invalid field', () => {
      it('returns false', () => {
        blockchain.chain[2].data = 'Invalid Data Here'

        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
      })
    })

    describe('and the chain does not contain any invalid fields', () => {
      it('returns true', () => {
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
      })
    })
    })
  })
})
