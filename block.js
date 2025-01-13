class Block {
   constructor ({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp
     this.lastHash = lastHash
     this.hash = hash
     this.data = data
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