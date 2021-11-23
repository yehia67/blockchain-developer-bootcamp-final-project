import chai, { expect } from 'chai'
import { utils } from 'ethers'
const { ethers, waffle } = require('hardhat')
const { solidity } = waffle

interface AccountI {
  address: string
  privateKey: string
}
chai.use(solidity)
describe('Campaign Factory contract', () => {
  let CampaignFactory
  let CampaignFactoryContract: any
  let owner: AccountI
  let addr1: AccountI
  let addr2: AccountI
  let addrs: AccountI[]
  const minGoal = '0.02'

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  before(async () => {
    // Get the ContractFactory and Signers here.
    CampaignFactory = await ethers.getContractFactory('CampaignFactory')
    ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    CampaignFactoryContract = await CampaignFactory.deploy(utils.parseEther(minGoal))
  })

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await CampaignFactoryContract.owner()).to.equal(owner.address)
    })
    it(`Should set the min goal to ${minGoal} ETH`, async () => {
      expect(await CampaignFactoryContract.getMinGoal()).to.equal(utils.parseEther(minGoal))
    })
  })

  describe('Transactions', () => {
    it(`Should set the min goal to 0.03 ETH`, async () => {
      await CampaignFactoryContract.setMinGoal(utils.parseEther('0.03'))
      expect(await CampaignFactoryContract.getMinGoal()).to.equal(utils.parseEther('0.03'))
    })

    it('Should create campaign with goal 1 ETH', async () => {
      await expect(
        CampaignFactoryContract.createCampaign('new campaign', 'description', 'ipfs hash', utils.parseEther('1'))
      )
        .to.emit(CampaignFactoryContract, 'CampaignDeployed')
        .withArgs(
          owner.address,
          (
            await CampaignFactoryContract.getDeployedCampaigns()
          )[0],
          'new campaign',
          'description',
          'ipfs hash',
          utils.parseEther('1')
        )
    })

    it('Should revert for campaign with goal 0.001 ETH', async () => {
      await expect(
        CampaignFactoryContract.createCampaign('new campaign', 'description', 'ipfs hash', utils.parseEther('0.001'))
      ).to.revertedWith('REVERT: Goal must be greater or equal to the minimum amount')
    })

    it('Should deploy three campaigns', async () => {
      await Promise.all([
        CampaignFactoryContract.createCampaign('new campaign 1', 'description', 'ipfs hash', utils.parseEther('1.2')),
        CampaignFactoryContract.createCampaign('new campaign 2', 'description', 'ipfs hash', utils.parseEther('8.2')),
        CampaignFactoryContract.createCampaign('new campaign 3', 'description', 'ipfs hash', utils.parseEther('6.2')),
      ])

      expect((await CampaignFactoryContract.getDeployedCampaigns()).length).to.equal(4)
    })
  })
})
