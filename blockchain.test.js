const cryptoHash = require('./crypto-hash')
const Blockchain = require('./blockchain')
const Block = require('./block')

describe('Blockchain', () => {
  let blockchain, newChain, orignalChain

  beforeEach(() => {
    blockchain = new Blockchain()
    newChain = new Blockchain()

    orignalChain = blockchain.chain
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


      describe('and the chain contains a block with jumped difficulty',()=>{
        it('returns false',()=>{
          const lastBlock = blockchain.chain[blockchain.chain.length-1];
          const lastHash  = lastBlock.hash;
          const timestamp = Date.now();
          const nonce = 0;
          const data=[];
          const difficulty = lastBlock.difficulty-3;

          const hash = cryptoHash(timestamp,lastHash,difficulty, nonce, data)

          const badBlock = new Block({timestamp,lastHash,hash,nonce,data,difficulty})

          blockchain.chain.push(badBlock)
          
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)


        })
      })

      describe('and the chain does not contain any invalid blocks', () => {
        it('returns true', () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
        })
      })
    })
  })

  describe('replaceChain()', () => {
    
    let errorMock,logMock;

    beforeEach(() => {
      errorMock = jest.fn();
      logMock = jest.fn();

      global.console.error = errorMock;
      global.console.log = logMock;
    });


    describe('when the new chain is not longer', () => {
        beforeEach(()=>{
            newChain.chain[0] = { new: 'fooChain' }

            blockchain.replaceChain(newChain.chain)
        })
      it('and does not replace the chain', () => {

        expect(blockchain.chain).toEqual(orignalChain)
      });

      it('logs an error',() => {
        expect(errorMock).toHaveBeenCalled();
      });
    })

    describe('when the new chain is longer', () => {
      beforeEach(() => {
        newChain.addBlock({ data: 'Horse' })
        newChain.addBlock({ data: 'Apple' })
        newChain.addBlock({ data: 'Goku' })
      })

      describe('and the chain is invalid', () => {
        beforeEach(()=>{
            newChain.chain[2].hash = 'fake-hash'
            blockchain.replaceChain(newChain.chain)
        })
        it('does not replace the chain', () => {
          expect(blockchain.chain).toEqual(orignalChain)
        })

        it('logs an error',() => {
            expect(errorMock).toHaveBeenCalled();
        });
      })

      describe('and the chain is valid', () => {
        beforeEach(()=>{
            blockchain.replaceChain(newChain.chain)
        })
        it('replaces the chain', () => {
          expect(blockchain.chain).toEqual(newChain.chain)
        })
        
        it('logs about the chain replacement',() => {
            expect(logMock).toHaveBeenCalled();
        });

      })
    })
  })
})
