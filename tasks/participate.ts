import { task, types } from "hardhat/config";

task("participate", "Participate in a given project")
  .addParam("crowdfunding", "Crowdfunding Contract address")
  .addParam("projectId", "Project to fund")
  .addParam("amount", "Amount for funding")
  .setAction(
    async (_args, {ethers}) => {
      const crowdfunding = await ethers.getContractAt("Crowdfunding", _args.crowdfunding);
      const transaction = await crowdfunding.participateToProject(
        _args.projectId, {value: _args.amount}
      )
      await transaction.wait;
      console.log("Thanks for participation! Transaction hash: ", transaction.hash);
    }
);