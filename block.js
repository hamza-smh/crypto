const {GENESIS_DATA} = require('./config');
class Block {
   constructor ({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp
     this.lastHash = lastHash
     this.hash = hash
     this.data = data
   }
    static genesis() {
        return new this(GENESIS_DATA)
    }
    static mineBlock ({lastBlock, data}) {
        return new this({
            // timestamp: Date.now().toString(),
            // lastHash: lastBlock.hash,
            // hash: this.calculateHash(lastBlock.hash, data, Date.now().toString()),
            // data
            timestamp:Date.now(),
            lastHash:lastBlock.hash,
            data,
        })

    }
}
// const block1 = new Block({
//   timestamp: '12/1/2022',
//   lastHash: 'hamza',
//   hash: 'sm',
//   data: 'SMH'
// })
// console.log('block1', block1)




module.exports = Block;