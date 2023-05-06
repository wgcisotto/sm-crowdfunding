import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { Crowdfunding } from "../typechain-types";

let Crowdfunding;

describe('Crowdfunding', function () {

    async function deployment() {
        Crowdfunding = await ethers.getContractFactory("Crowdfunding");
        return await Crowdfunding.deploy();
    }

    describe("Deployment", function() {
        it('Should be initialized', async () => {
            const crowdfunding =  await loadFixture(deployment);
            expect(crowdfunding.address).to.not.equal(null);
            expect(crowdfunding.address).to.not.equal("");
        });
        it('Should not have projects', async () => {
            const crowdfunding =  await loadFixture(deployment);
            const numberOfProjects = await crowdfunding.numberOfProjects();
            expect(numberOfProjects).to.equal(0);
            await expect(crowdfunding.getAllProjects()).to.be.revertedWith('No projects yet');
            await expect(crowdfunding.getProjectDetails(1)).to.be.revertedWith('Invalid Project');
            
        });
        it('Should not have contributors', async () => {
            const crowdfunding =  await loadFixture(deployment);
            const [ owner ] = await ethers.getSigners();
            await expect(crowdfunding.retrieveContributions(1, owner.address)).to.be.revertedWith(
                "Invalid Project"
            );
            
        });
    });

    describe("Create a single Project", function() {
        let crowdfunding: Crowdfunding;
        beforeEach(async () => {
            crowdfunding =  await loadFixture(deployment);
        });
        
        it("should create only one project with the correct details", async () => {
            await crowdfunding.createProject("Project Title", "Project Description", 100);
            const project  = await crowdfunding.getProjectDetails(1);
            const [ owner ] = await ethers.getSigners();
            expect(project[0]).to.equal(1);
            expect(project[1]).to.equal("Project Title");
            expect(project[2]).to.equal("Project Description");
            expect(project[3]).to.equal(owner.address);
            expect(project[4]).to.equal(100);
            expect(project[5]).to.equal(0);
            const numberOfProjects = await crowdfunding.numberOfProjects();
            expect(numberOfProjects).to.equal(1);
          });
      
          it("should not allow creating a project with an empty title", async () => {
            await expect(crowdfunding.createProject("", "Project Description", 100)).to.be.revertedWith("Title cannot be empty");
          });
      
          it("should not allow creating a project with an empty description", async () => {
            await expect(crowdfunding.createProject("Project Title", "", 100)).to.be.revertedWith("Description cannot be empty");
          });
      
          it("should not allow creating a project with an invalid participation amount", async () => {
            await expect(crowdfunding.createProject("Project Title", "Project Description", 0)).to.be.revertedWith("Invalid participation amount");
          });

    });

    describe("Create multiples projects", function() {
        let crowdfunding: Crowdfunding;
        beforeEach(async () => {
            const [owner1, owner2, owner3 ] = await ethers.getSigners();
            crowdfunding =  await loadFixture(deployment);
            await crowdfunding.connect(owner1).createProject("Project One", "Project One Description", 100);
            await crowdfunding.connect(owner2).createProject("Project Two", "Project Two Description", 200);
            await crowdfunding.connect(owner3).createProject("Project Three", "Project Three Description", 300);
        });
        
        it("should contains three projects", async () => {
            const numberOfProjects = await crowdfunding.numberOfProjects();
            expect(numberOfProjects).to.equal(3);
          });
          
        
        it("should return all three projects details", async () => {
            const projects = await crowdfunding.getAllProjects();
            expect(projects[0][0]).to.equal(1);
            expect(projects[0][1]).to.equal("Project One");
            expect(projects[0][2]).to.equal("Project One Description");
            expect(projects[0][4]).to.equal(100);
            expect(projects[1][0]).to.equal(2);
            expect(projects[1][1]).to.equal("Project Two");
            expect(projects[1][2]).to.equal("Project Two Description");
            expect(projects[1][4]).to.equal(200);
            expect(projects[2][0]).to.equal(3);
            expect(projects[2][1]).to.equal("Project Three");
            expect(projects[2][2]).to.equal("Project Three Description");
            expect(projects[2][4]).to.equal(300);
          });
    });

    describe("Participate in a Project", () => {
        let crowdfunding: Crowdfunding;
        beforeEach(async () => {
            crowdfunding =  await loadFixture(deployment);
            await crowdfunding.createProject("Project Title", "Project Description", 100);
        });
    
        it("should add the sender's contribution to the project's total funding amount", async () => {
          const [, participant ] = await ethers.getSigners();
          const projectId = 1;
    
          await crowdfunding.connect(participant).participateToProject(projectId, { value: 100 });
    
          const project = await crowdfunding.getProjectDetails(projectId);
          expect(project[5]).to.equal(100);
          
          const contributionAmount = await crowdfunding.retrieveContributions(projectId, participant.address)
          expect(contributionAmount).to.equal(100);
        });
    
        it("should not allow participating to an invalid project", async () => {
          await expect(crowdfunding.participateToProject(0, { value: 100 })).to.be.revertedWith("Invalid Project");
        });
    
        it("should not allow participating with an amount less than the participation amount", async () => {
          const [,participant ] = await ethers.getSigners();
          const projectId = 1;
    
          await expect(crowdfunding.connect(participant).participateToProject(projectId, { value: 50 })).to.be.revertedWith("Amount provided is less than the participation amount");
        });
      });

      describe("Owner withdraw funds", () => {
        let crowdfunding: Crowdfunding;
        const projectId = 1;
        beforeEach(async () => {
            crowdfunding =  await loadFixture(deployment);
            await crowdfunding.createProject("Project Title", "Project Description", 100);
            const [, participant ] = await ethers.getSigners();
            await crowdfunding.connect(participant).participateToProject(projectId, { value: 100 });
        });
        it("Owner should be able to withdraw", async () => {
            const [ owner ] = await ethers.getSigners()
            const ownerInitialBalance = owner.getBalance();
            await crowdfunding.withdrawFunds(projectId);
            const ownerUpdatedBalance = owner.getBalance();
            expect(ownerInitialBalance > ownerUpdatedBalance);
        });
      });

});