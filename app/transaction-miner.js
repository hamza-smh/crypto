class TransactionMiner{
    constructor({blockchain, transactionPool, wallet, pubsub}){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }
    mineTransaction(){
    //get transaction pool's valid transaction

    //generate miner's reward

    // add a block consisting of these transactions to blockchain

    //broadcast the updated blockchain

    //clear the pool
    };
}

module.exports= TransactionMiner;