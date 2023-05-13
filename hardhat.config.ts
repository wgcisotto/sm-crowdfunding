import { task, HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/index.ts";

require('dotenv').config()

// Go to https://infura.io or https://alchemy.com 
// sign up, create a new API key
// in its dashboard, and replace "KEY" with it
const GOERLI_RPC_PROVIDER = process.env.GOERLI_RPC_PROVIDER;
const SEPOLIA_RPC_PROVIDER = process.env.SEPOLIA_RPC_PROVIDER;

// Replace this private key with your Sepolia or Goerli account private key
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  paths: { tests: "tests" },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: `${SEPOLIA_RPC_PROVIDER}`,
      accounts: [`${SEPOLIA_PRIVATE_KEY}`]
    },
    goerli: {
      url: `${GOERLI_RPC_PROVIDER}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`]
    }
  }
};

export default config;
