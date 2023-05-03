require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;

module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },

    sepolia: {
      chainId: 11155111,
      blockConfirmations: 6,
      allowUnlimitedContractSize: true,
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY1 !== undefined && [PRIVATE_KEY1],
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [],
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  mocha: {
    timeout: 500000, // 300 sec max
  },
};
