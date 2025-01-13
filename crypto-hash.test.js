const cryptoHash = require('./crypto-hash');

describe('cryptoHash()',()=>{

    it('generates a SHA-256 hashed output',()=>{
        expect(cryptoHash('My name is Hamza')
            .toEqual('168f60b7983dd2c75aa17ec7600b95d8c4fa540a4fc86785a657eb6d9aa8ea92'))
    });

    it('produces the same hash with same arguments in any order',()=>{
        expect(cryptoHash('One','Two','Three').toEqual(cryptoHash('three','One',"two")))
    })

})