const Block = require('./block')
const cryptoHash = require('./crypto-hash')

class Blockchain{
    constructor(){
        this.chain=[Block.genesis()];
    }
    addBlock({data}){
        const newBlock =Block.mineBlock({
            lastBlock:this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock);
    }


    replaceChain(chain){
        if(chain.length <= this.chain.length){
            console.error('Incoming Chain must be longer.')
            return;
        }

        if(!Blockchain.isValidChain(chain)){
            console.error('The incoming chain is not valid.')
            return;
        }

        console.log('Replacing the current chain with the incoming ',chain)
        this.chain = chain
    }

    static isValidChain(chain){
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for (let i=1; i<chain.length; i++){
            const  {timestamp, hash, lastHash, data} = chain[i];
            const actualLastHash = chain[i-1].hash;

            if(lastHash !== actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data);

            if(hash !== validatedHash) return false;

        }
        return true;
    }
}
module.exports = Blockchain