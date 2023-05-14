import { task, types } from "hardhat/config";

task("projects", "Retrieve all project details")
  .addParam("crowdfunding", "Crowdfunding Contract address")
  .setAction(
    async (_args, {ethers}) => {
      const crowdfunding = await ethers.getContractAt("Crowdfunding", _args.crowdfunding);
      const projects = await crowdfunding.getAllProjects()
      for (let index = 0; index < projects.length; index++) {
        const project:any = projects[index];
        console.log(
          `Project Found! \n 
          Id=[${project[0]}] \n 
          Title=[${project[1]}] \n 
          Description=[${project[2]}] \n
          Owner=[${project[3]}] \n
          Participation Amount=[${project[4]}] \n
          Total Funding Amount=[${project[5]}] \n` );
        }
    }
);