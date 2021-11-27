import '@nomiclabs/hardhat-waffle'

const fs = require('fs')
const privateKey = fs.readFileSync('privateKey.secret').toString().trim()
const alchemyKey = fs.readFileSync('alchemyKey.secret').toString().trim()

module.exports = {
  solidity: '0.8.10',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: [privateKey],
      chainId: 1337,
      saveDeployments: true,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/1fa4dd79b55243c3b6b9d40d8ef52ae2`,
      saveDeployments: true,
      accounts: [privateKey],
      gasPrice: 8000000000,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}
