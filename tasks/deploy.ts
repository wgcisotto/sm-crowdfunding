import { task } from "hardhat/config";

task("deploy", "Deploy Crodfunding Smart Contract")
  .setAction(
    async (_args, {ethers}) => {
      const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
      const crowdfunding = await Crowdfunding.deploy();
      const addr = crowdfunding.address;
      console.log("Crowdfunding address deployed at: ", addr);
      return addr;
    }
);