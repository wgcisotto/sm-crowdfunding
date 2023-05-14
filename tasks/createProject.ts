import { task, types } from "hardhat/config";

task("create-project", "Create an project for funding")
  .addParam("crowdfunding", "Crowdfunding Contract address")
  .addParam("title", "Project title")
  .addParam("desc", "Project description")
  .addParam("participationAmount", "Project participation amount")
  .setAction(
    async (_args, {ethers}) => {
      const crowdfunding = await ethers.getContractAt("Crowdfunding", _args.crowdfunding);
      const transaction = await crowdfunding.createProject(
        _args.title,
        _args.desc,
        _args.participationAmount
      )
      await transaction.wait;
      console.log("Project Created! Transaction hash: ", transaction.hash);
    }
);