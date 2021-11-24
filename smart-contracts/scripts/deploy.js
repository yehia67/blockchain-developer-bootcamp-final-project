const { ethers } = require('ethers')

async function main() {
  const minGoal = '0.02'
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const CampaignFactory = await ethers.getContractFactory('CampaignFactory')
  const CampaignFactoryContract = await CampaignFactory.deploy(ethers.utils.parseEther(minGoal))

  console.log('CampaignFactory address:', CampaignFactoryContract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
