const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
    const foo = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('foo')).toEqual(foo);
    });
    it('produces the same hash with the same arguments in any order', () => {
        expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('one', 'three', 'two'));
    });


})