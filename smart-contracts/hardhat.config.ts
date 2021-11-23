import "@nomiclabs/hardhat-waffle";

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
      url: `https://eth-ropsten.alchemyapi.io/v2/${alchemyKey}`,
      saveDeployments: true,
      accounts: [privateKey],
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}
