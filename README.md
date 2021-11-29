# Final project - Funding Campaigns Platform

## Deployed version url:

https://blockchain-developer-bootcamp-final-project-khaki.vercel.app/

## How to run this project locally:

### Prerequisites

- Node.js >= v14
- Hardhat & (ganache/hardhat)
- Alchemy or infura account
- Yarn
- `git checkout main`

### Contracts

- cd `smart-contracts` and run `yarn install`
- Run local testnet in port `8454` with an Ethereum client, e.g. Ganache using `ganache-cli` or `npx hardhat node`
- Compile smart contracts `npx hardhat compile`
- Test smart-contracts `npx hardhat test`
- Deploy to:
  - Ropston `npx hardhat run scripts/deploy.js --network ropsten`
  - Localhost `npx hardhat run scripts/deploy.js --network localhost`
- `development` network id is 1337, remember to change it in Metamask as well!
- You can check the smart contract deployed [documentation](https://blockchain-developer-bootcamp-final-project-khaki.vercel.app/docs/index.html#/)

### Frontend

- go to root directory
- Add deployed address and abi to `artifacts/`
- `yarn install`
- `yarn dev`
- Open `http://localhost:3000`

### How to deploy project to ropsten

- Go to `cd smart-contracts`
- Create two files `touch alchemyKey.secret privateKey.secret`
- Ropston `npx hardhat run scripts/deploy.js --network ropsten`
- Make sure to have some [faucet](https://faucet.ropsten.be/)

## Screencast link

I recommend you watch it on 2x (Ropsten transactions are slow)
https://youtu.be/536MRde37V4

## Public Ethereum wallet for certification:

`0x17156c0cf9701b09114CB3619D9f3fD937caA3A8`

## Project description

A funding platform for campaign creators to create campaigns and collect funds.

## Simple workflow

1. User add his campaign idea: name, description, media image (uploaded to IPFS). Campaign must request funds at least `0.02 ETH`
2. See your project and other projects.
3. Select any project.
4. Fund any project
5. Refund your ETH if you want. See returned funds in the header or your metamask wallet (Gas fees will be deducted)
6. If you achieved your fund goal `Claim Fund` button will appear and you can claim funds and see your balance updated on the header and your metamask wallet

## Directory structure

- `root directory`: Project's Next frontend.
- `artifacts`: Abi and Smart contract addresses
- `smart-contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `smart-contracts/scripts`: deployment scripts
- `smart-contracts/test`: Tests for smart contracts.

## Environment variables (not needed for running project locally)

We don't use `.env` but we use two `.secrete` files

```
touch alchemyKey.secret
touch privateKey.secrete
```

## TODO features

- Add a deadline for each campaign.
- upload all campaign files (video, PDFs and images) to ipfs.
- Use pining service like [pinata](https://www.pinata.cloud/).
