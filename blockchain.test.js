const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain',()=>{
    const blockchain = new Blockchain();


    it('contains a chain array',()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    })

    it('starts with a Genesis Block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    })

    it('adds a new block to the chain',()=>{
        const newData = 'New Transaction Data';
        blockchain.addBlock({data:newData});
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    })
})