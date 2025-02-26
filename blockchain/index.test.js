const { cryptoHash } = require('../util')
const Blockchain = require('.')
const Block = require('./block')
const Wallet = require('../wallet')
const Transaction = require('../wallet/transaction')

describe('Blockchain', () => {
  let blockchain, newChain, orignalChain, errorMock

  beforeEach(() => {
    blockchain = new Blockchain()
    newChain = new Blockchain()
    errorMock = jest.fn()


    orignalChain = blockchain.chain
    global.console.error = errorMock

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

      describe('and the chain contains a block with jumped difficulty', () => {
        it('returns false', () => {
          const lastBlock = blockchain.chain[blockchain.chain.length - 1]
          const lastHash = lastBlock.hash
          const timestamp = Date.now()
          const nonce = 0
          const data = []
          const difficulty = lastBlock.difficulty - 3

          const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data)

          const badBlock = new Block({
            timestamp,
            lastHash,
            hash,
            nonce,
            data,
            difficulty
          })

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
    let logMock

    beforeEach(() => {
      logMock = jest.fn()

      global.console.log = logMock
    })

    describe('when the new chain is not longer', () => {
      beforeEach(() => {
        newChain.chain[0] = { new: 'fooChain' }

        blockchain.replaceChain(newChain.chain)
      })
      it('and does not replace the chain', () => {
        expect(blockchain.chain).toEqual(orignalChain)
      })

      it('logs an error', () => {
        expect(errorMock).toHaveBeenCalled()
      })
    })

    describe('when the new chain is longer', () => {
      beforeEach(() => {
        newChain.addBlock({ data: 'Horse' })
        newChain.addBlock({ data: 'Apple' })
        newChain.addBlock({ data: 'Goku' })
      })

      describe('and the chain is invalid', () => {
        beforeEach(() => {
          newChain.chain[2].hash = 'fake-hash'
          blockchain.replaceChain(newChain.chain)
        })
        it('does not replace the chain', () => {
          expect(blockchain.chain).toEqual(orignalChain)
        })

        it('logs an error', () => {
          expect(errorMock).toHaveBeenCalled()
        })
      })

      describe('and the chain is valid', () => {
        beforeEach(() => {
          blockchain.replaceChain(newChain.chain)
        })
        it('replaces the chain', () => {
          expect(blockchain.chain).toEqual(newChain.chain)
        })

        it('logs about the chain replacement', () => {
          expect(logMock).toHaveBeenCalled()
        })
      })
    })
  })

  describe('validTransactionData()', () => {
    let transaction, rewardTransaction, wallet
    beforeEach(() => {
      wallet = new Wallet()
      transaction = wallet.createTransaction({
        recipient: 'foo-address',
        amount: 65
      })
      rewardTransaction = Transaction.rewardTransaction({ minerWallet: wallet })
    })

    describe('and the transaction is valid', () => {
      it('returns true', () => {
        newChain.addBlock({ data: [transaction, rewardTransaction] })

        expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(true)
        expect(errorMock).not.toHaveBeenCalled()

      })
    })

    describe('and the transaction data has multiple rewards', () => {
      it('returns false and logs error', () => {
        newChain.addBlock({ data: [transaction, rewardTransaction, rewardTransaction] })
        
        expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(false)
        expect(errorMock).toHaveBeenCalled()
      })
    })

    describe('and the transaction data has atleast one malformed outputMap', () => {
      describe('and the transaction is not a reward transaction', () => {
        it('returns false and logs error', () => {
          transaction.outputMap[wallet.publicKey] = 9999999
          newChain.addBlock({ data: [transaction, rewardTransaction] }) //transaction is malformed here

          expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(false)          
          expect(errorMock).toHaveBeenCalled()

        })
      })
      describe('and the transaction is a reward transaction', () => {
        it('returns false and logs error', () => {
          rewardTransaction.outputMap[wallet.publicKey] = 999999;
          newChain.addBlock({ data: [transaction, rewardTransaction] }) //rewardTransaction is bad here

          expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(false)
          expect(errorMock).toHaveBeenCalled()
        })
      })
    })

    describe('and the transaction data has atleast one malformed input', () => {
      it('returns false and logs error', () => {
        wallet.balance = 9000;
        const evilOutputMap = {
          [wallet.publicKey]:8900,
          fooRecipient:100
        }
        const evilTransaction = {
          input:{
            timestamp:Date.now(),
            amount:wallet.balance,
            address: wallet.publicKey,
            signature: wallet.sign(evilOutputMap)
          },
          outputMap:evilOutputMap
        }

        newChain.addBlock({ data: [evilTransaction, rewardTransaction] })

        expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(false)

      })
    })

    describe('and a block contains multiple identical transactions',()=>{
      it('returns false and logs error', () => {})
    })
  })
})
