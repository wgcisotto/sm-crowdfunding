import { task, types } from "hardhat/config";

task("withdraw", "Withdraw funds")
  .addParam("crowdfunding", "Crowdfunding Contract address")
  .addParam("projectId", "Project to fund")
  .setAction(
    async (_args, {ethers}) => {
      const crowdfunding = await ethers.getContractAt("Crowdfunding", _args.crowdfunding);
      const transaction = await crowdfunding.withdrawFunds(
        _args.projectId
      )
      await transaction.wait();
      
      console.log("Withdraw successful! Transaction hash: ", transaction.hash);
    }
);