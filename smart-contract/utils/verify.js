const { run } = require("hardhat");

const verify = async () => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: "0x3948eB23D4Ed0D180499F89D5a4169bE415d7E10",
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
