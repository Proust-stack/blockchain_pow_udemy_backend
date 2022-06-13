const Block = require("./block");
const cryptoHash = require('./crypto-hash');    

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for (let i = 1; i < chain.length; i++) {
            const {timestamp, lastHash, hash, data, nonce, difficulty} = chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const actualLastHash = chain[i-1].hash;
            if (lastHash !== actualLastHash) return false;
            if (Math.abs(lastDifficulty - difficulty) > 1) return false;
            const validateHash = cryptoHash(timestamp, lastHash, data,  nonce, difficulty);
            if (hash !== validateHash) return false;
        }
        return true
    }

    addBlock({data}) {
        const newBlock = Block.minedBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock);
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error('the incoming chain is shorter')
            return;
        }
        if (!Blockchain.isValidChain(chain)) {
            console.error('the incoming chain is not valid')
            return;
        }
        console.log('replacing chain with', chain)
        this.chain = chain;

    }
}

module.exports = Blockchain;