const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const blogNftContract = await hre.ethers.deployContract("BlogNFT");
  await blogNftContract.waitForDeployment();
  console.log("BlogNFT deployed to:", blogNftContract.target);

  await sleep(30*1000);

  await hre.run("verify:verify", {
    address: blogNftContract.target,
    constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
