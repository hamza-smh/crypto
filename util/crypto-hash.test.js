const cryptoHash = require('./crypto-hash');

describe('cryptoHash()',()=>{

    it('generates a SHA-256 hashed output',()=>{
        expect(cryptoHash('My name is Hamza'))
            .toEqual('5eabc32663655c0ef64d43b5a4bb539d8a0cc8d50558308aa01df67fe235192e')
    });

    it('produces the same hash with same arguments in any order',()=>{
        expect(cryptoHash('One','Two','Three')).toEqual(cryptoHash('Three','One','Two'));
    })

    it('produces a unique hash when properties have changed on an input',()=>{
        const foo={};
        const originalHash = cryptoHash(foo);
        foo['a'] = 'a';

        expect(cryptoHash(foo)).not.toEqual(originalHash);
    })

})