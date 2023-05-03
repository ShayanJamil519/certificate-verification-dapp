const { ethers } = require("hardhat");

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners();

  // Deploy contract
  const CertificateVerification = await ethers.getContractFactory(
    "CertificateVerification"
  );
  const certificateVerification = await CertificateVerification.deploy();
  await certificateVerification.deployed();

  console.log(
    `Deployed CertificateVerification Contract at: ${certificateVerification.address}\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x5FbDB2315678afecb367f032d93F642f64180aa3
