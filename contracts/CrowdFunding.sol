// SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

contract Crowdfunding {

    struct Project {
        uint256 id;
        string title;
        string desc;
        address owner;
        uint256 participationAmount;
        uint256 totalFundingAmount;
    }
    
    mapping(uint256 => Project) private projects;
    
    uint256 public numberOfProjects;

    mapping(uint256 => mapping(address => uint256)) projectsContributions;

    modifier onlyValidProject(uint256 projectId) {
        require(projectId != 0, "Invalid Project");
        require(projectId <= numberOfProjects, "Invalid Project");
        _;
    }

    modifier onlyProjectOwner(uint256 projectId){
        Project storage project = projects[projectId];
        require(project.owner == msg.sender, "Not owner of given project");
        _;   
    }

    function createProject(string memory title, string memory desc, uint256 participationAmount) public {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(desc).length > 0, "Description cannot be empty");
        require(participationAmount > 0, "Invalid participation amount");
        numberOfProjects++;
        Project storage project = projects[numberOfProjects];
        project.id = numberOfProjects;
        project.title = title;
        project.desc = desc;
        project.owner = msg.sender;
        project.participationAmount = participationAmount;
        projects[numberOfProjects] = project;
    }

    function participateToProject(uint256 projectId) onlyValidProject(projectId) payable public {
        Project storage project = projects[projectId];
        uint256 amount = msg.value;
        require(amount >= project.participationAmount, "Amount provided is less than the participation amount");
        project.totalFundingAmount += amount;
        projectsContributions[projectId][msg.sender] += amount;
    }

    function getProjectDetails(uint256 projectId) onlyValidProject(projectId) public view returns (uint256, string memory, string memory, address, uint256, uint256) {
        Project storage project = projects[projectId];
        return (project.id, project.title, project.desc, project.owner, project.participationAmount, project.totalFundingAmount);
    }

    function getAllProjects() public view returns (Project[] memory) {
        require(numberOfProjects > 0, "No projects yet");
        Project[] memory prjcts = new Project[](numberOfProjects);
        for(uint256 idx = 0; idx < numberOfProjects; idx++){
            prjcts[idx] = projects[idx + 1];
        }
        return prjcts;
    }

    function retrieveContributions(uint256 projectId, address userAddress) onlyValidProject(projectId) public view returns(uint256) {
        return projectsContributions[projectId][userAddress];
    }

    function withdrawFunds(uint256 projectId) public onlyValidProject(projectId) onlyProjectOwner(projectId) {
        Project storage project = projects[projectId];
        (bool sent, ) = project.owner.call{value: project.totalFundingAmount}("");
        require(sent, "Failed to send amount");
        project.totalFundingAmount = 0;
    }


}