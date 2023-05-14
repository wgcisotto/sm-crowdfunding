import { task, types } from "hardhat/config";

task("project-contribution", "Retrieve project contribution by User address")
  .addParam("crowdfunding", "Crowdfunding Contract address")
  .addParam("projectId", "Project to find contributor")
  .addParam("userAddress", "User Address")
  .setAction(
    async (_args, {ethers}) => {
      const crowdfunding = await ethers.getContractAt("Crowdfunding", _args.crowdfunding);
      const amount = await crowdfunding.retrieveContributions(
        _args.projectId,
        _args.userAddress
      )
      
      console.log(`User=[${_args.userAddress}] contributed ${amount} wei`);
    }
);