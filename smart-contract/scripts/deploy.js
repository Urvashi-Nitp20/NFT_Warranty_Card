const hre = require('hardhat')

async function main() {
  const amazonCoinFactory = await hre.ethers.getContractFactory('ProductNFT')
  const amazonCoin = await amazonCoinFactory.deploy()

  await amazonCoin.deployed()

  console.log('ProductNFT deployed to:', amazonCoin.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })