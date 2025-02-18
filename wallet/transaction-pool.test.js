const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction Pool', () => {
    let transactionPool, transaction, senderWallet;

    beforeEach(()=>{
        transactionPool = new TransactionPool();
        senderWallet= new Wallet(),
        transaction = new Transaction({
            senderWallet,
            recipient: 'fake-recipient', 
            amount: 50
        });
    })
    

    describe('setTransaction()', () => {
        it('adds a transaction to the pool', () => {
            transactionPool.setTransaction(transaction);
            
            expect(transactionPool.transactionMap[transaction.id])
                .toBe(transaction);
        })
    })


    describe('existingTransaction()',()=>{
        it('returns an existing transaction given an input address',()=>{
            transactionPool.setTransaction(transaction);

            expect(transactionPool.existingTransaction({inputAddress:senderWallet.publicKey}))
                .toBe(transaction);
        })
    })
});
