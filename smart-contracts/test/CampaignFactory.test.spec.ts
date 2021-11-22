const { expect } = require('chai')
const { ethers } = require('hardhat')

interface AccountI {
  address: string
  privateKey: string
}

describe('Campaign Factory contract', function () {
  let CampaignFactory
  let CampaignFactoryContract: any
  let owner: AccountI
  let addr1: AccountI
  let addr2: AccountI
  let addrs: AccountI[]

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    CampaignFactory = await ethers.getContractFactory('CampaignFactory')
    ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    CampaignFactoryContract = await CampaignFactory.deploy()
  })

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await CampaignFactoryContract.owner()).to.equal(owner.address)
    })

    it('Should create campaign', async function () {
      await CampaignFactoryContract.createCampaign
    })
  })

  describe('Transactions', function () {
    it('Should transfer tokens between accounts', async function () {
      // Transfer 50 tokens from owner to addr1
      await hardhatToken.transfer(addr1.address, 50)
      const addr1Balance = await hardhatToken.balanceOf(addr1.address)
      expect(addr1Balance).to.equal(50)

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await hardhatToken.connect(addr1).transfer(addr2.address, 50)
      const addr2Balance = await hardhatToken.balanceOf(addr2.address)
      expect(addr2Balance).to.equal(50)
    })

    it('Should fail if sender doesn’t have enough tokens', async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address)

      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith('Not enough tokens')

      // Owner balance shouldn't have changed.
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance)
    })

    it('Should update balances after transfers', async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address)

      // Transfer 100 tokens from owner to addr1.
      await hardhatToken.transfer(addr1.address, 100)

      // Transfer another 50 tokens from owner to addr2.
      await hardhatToken.transfer(addr2.address, 50)

      // Check balances.
      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address)
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150)

      const addr1Balance = await hardhatToken.balanceOf(addr1.address)
      expect(addr1Balance).to.equal(100)

      const addr2Balance = await hardhatToken.balanceOf(addr2.address)
      expect(addr2Balance).to.equal(50)
    })
  })
})
