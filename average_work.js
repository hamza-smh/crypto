const Blockchain = require('./blockchain');

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'initial' });
console.log('First Block',blockchain.chain[blockchain.chain.length-1])

let prvsTimestamp, nxtTimestamp, nextBlock,timeDiff, average;

const times=[];

for(let i=0; i<10000; i++) {
    prvsTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    
    blockchain.addBlock({  data:`block No. ${i}`});

    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nxtTimestamp = nextBlock.timestamp;
    timeDiff = nxtTimestamp - prvsTimestamp;
    times.push(timeDiff);

    average = times.reduce((total, num) => (total + num)) / times.length;


    console.log(`
        Block No. ${i+1} 
        Time taken: ${timeDiff} ms, 
        Average Time: ${average} ms
        Difficulty ${nextBlock.difficulty}
    `);} 

