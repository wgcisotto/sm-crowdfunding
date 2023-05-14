import { task, types } from "hardhat/config";

task("project-details", "Retrieve project details")
  .addParam("crowdfunding", "Crowdfunding Contract address")
  .addParam("projectId", "Project to fund")
  .setAction(
    async (_args, {ethers}) => {
      const crowdfunding = await ethers.getContractAt("Crowdfunding", _args.crowdfunding);
      const project = await crowdfunding.getProjectDetails(
        _args.projectId
      )
      
      console.log(
        `Project Found! \n 
        Id=[${project[0]}] \n 
        Title=[${project[1]}] \n 
        Description=[${project[2]}] \n
        Owner=[${project[3]}] \n
        Participation Amount=[${project[4]}] \n
        Total Funding Amount=[${project[5]}] \n` );
    }
);