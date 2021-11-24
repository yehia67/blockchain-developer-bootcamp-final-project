import chai, { expect } from 'chai'
import { utils } from 'ethers'
const { ethers, waffle } = require('hardhat')
const { solidity } = waffle

interface AccountI {
  address: string
  privateKey: string
}
interface CampaignInfoI {
  owner: string
  name: string
  description: string
  ipfsHash: string
  goal: string
}
chai.use(solidity)
describe('Campaign contract', () => {
  let Campaign
  let CampaignContract: any
  let owner: AccountI
  let addr1: AccountI
  let addr2: AccountI
  let addrs: AccountI[]
  const goal = '0.9'
  let campaignInfo: CampaignInfoI | {} = {}
  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  before(async () => {
    // Get the Contract and Signers here.
    Campaign = await ethers.getContractFactory('Campaign')
    ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    CampaignContract = await Campaign.deploy(
      owner.address,
      'new campaign',
      'campaign description',
      'IPFS hash',
      utils.parseEther(goal)
    )
    campaignInfo = {
      owner: owner.address,
      name: 'new campaign',
      description: 'campaign description',
      ipfsHash: 'IPFS hash',
      goal: utils.parseEther(goal),
    }
  })

  describe('Campaign Deployment', () => {
    it(`Should set the campaign information`, async () => {
      const contractCampaignInfo = await CampaignContract.campaignInfo()
      expect(contractCampaignInfo.owner).to.equal((campaignInfo as CampaignInfoI).owner)
      expect(contractCampaignInfo.name).to.equal((campaignInfo as CampaignInfoI).name)
      expect(contractCampaignInfo.description).to.equal((campaignInfo as CampaignInfoI).description)
      expect(contractCampaignInfo.ipfsHash).to.equal((campaignInfo as CampaignInfoI).ipfsHash)
      expect(contractCampaignInfo.goal).to.equal((campaignInfo as CampaignInfoI).goal)
    })
  })

  describe('Campaign Transactions', () => {
    it(`Should fund campaign`, async () => {
      expect(await CampaignContract.connect(addr1).fund({ value: utils.parseEther('0.06') }))
        .to.emit(CampaignContract, 'CampaignFunded')
        .withArgs(addr1.address, utils.parseEther('0.06'))
    })

    it(`Should revert fund campaign with zero value`, async () => {
      await expect(CampaignContract.connect(addr1).fund({ value: utils.parseEther('0') })).to.be.revertedWith(
        'REVERT: The amount of wei should be more than zero'
      )
    })
    it(`Should refund all campaign funds`, async () => {
      expect(await CampaignContract.connect(addr1).refund({ value: utils.parseEther('0.06') }))
        .to.emit(CampaignContract, 'CampaignRefunded')
        .withArgs(addr1.address, utils.parseEther('0.06'))
    })

    it(`Should refund partially campaign`, async () => {
      expect(await CampaignContract.connect(addr1).fund({ value: utils.parseEther('0.06') }))
        .to.emit(CampaignContract, 'CampaignFunded')
        .withArgs(addr1.address, utils.parseEther('0.06'))
      expect(await CampaignContract.connect(addr1).refund({ value: utils.parseEther('0.02') }))
        .to.emit(CampaignContract, 'CampaignRefunded')
        .withArgs(addr1.address, utils.parseEther('0.02'))
    })

    it(`Should revert refund more than the campaign fund`, async () => {
      expect(await CampaignContract.connect(addr2).fund({ value: utils.parseEther('0.06') }))
        .to.emit(CampaignContract, 'CampaignFunded')
        .withArgs(addr2.address, utils.parseEther('0.06'))

      await expect(CampaignContract.connect(addr2).refund({ value: utils.parseEther('1') })).to.be.revertedWith(
        'REVERT: You can not refund more than you have'
      )
    })

    it(`Should revert you are not a funder`, async () => {
      await expect(CampaignContract.connect(owner).refund({ value: utils.parseEther('0.02') })).to.revertedWith(
        'REVERT: You are not a funder'
      )
    })

    it(`Should revert if claim before the goal is reached`, async () => {
      await expect(CampaignContract.connect(owner).claimFunds()).to.revertedWith('REVERT: campaign need to reach goal')
    })

    it(`Should claim funds`, async () => {
      expect(await CampaignContract.connect(addr1).fund({ value: utils.parseEther('1') }))
        .to.emit(CampaignContract, 'CampaignFunded')
        .withArgs(addr1.address, utils.parseEther('1'))
      expect(await CampaignContract.connect(owner).claimFunds()).to.emit(CampaignContract, 'CampaignClaimed')
    })

    it(`Should revert if funded an ended campaign`, async () => {
      await expect(CampaignContract.connect(addr1).fund({ value: utils.parseEther('1') })).to.revertedWith(
        'REVERT: Campaign is not active'
      )
    })

    it(`Should revert if claimed an ended campaign`, async () => {
      await expect(CampaignContract.connect(addr1).fund({ value: utils.parseEther('1') })).to.revertedWith(
        'REVERT: Campaign is not active'
      )
    })
  })
})
