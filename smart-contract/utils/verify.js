const { run } = require("hardhat");

const verify = async () => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: "0xAeaD053c1B4F9959e44dd648CcA5Cc9BA55A6d1D",
      constructorArguments: [],
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};

verify();

module.exports = {
  verify,
};
