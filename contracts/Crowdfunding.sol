// SPDX-License-Identifier: Unlicense

pragma solidity >=0.7.0 <0.9.0;

/**
* @dev Contract for Crowdfunding 
*
* Smart contract for crowdfunding that meets specific requirements. 
* The smart contract will allow project owners to list various projects
* and initiate crowdfunding campaigns for each project. 
* Users should be able to participate in the crowdfunding campaigns by 
* interacting with the smart contract, such as sending funds.
*
* NOTE: Each function contains the `requirements` section with a detailed 
* explanation of the requirement
*/
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

    /**
     * @dev Modifier that checks if the provided `projectId` is a valid project.
     * Also, `projectId` equals to 0 is not a valid project.
     *
     * @param projectId to be retrieved
     */
    modifier onlyValidProject(uint256 projectId) {
        require(projectId != 0, "Invalid Project");
        require(projectId <= numberOfProjects, "Invalid Project");
        _;
    }

    /**
     * @dev Modifier that checks if the `msg.sender` is the owner of the given project
     *
     * @param projectId to be retrieved
     */
    modifier onlyProjectOwner(uint256 projectId){
        Project storage project = projects[projectId];
        require(project.owner == msg.sender, "Not owner of given project");
        _;   
    }

    /**
     * @dev Create new projects for funding
     * 
     * @param title Title of the project for funding 
     * @param desc Description of the project for funding 
     * @param participationAmount Minimium participation amount. TODO: Should it be minimium or it should be the only amount allowed, and once participated, cannot participate again??
     *
     * Requirements:
     *
     * - Implement a setter function namely, `createProject()` where project owners can
     * list a project for crowdfunding considering the attributes of the struct `Project`.
     *
     * - `title` cannot be empty
     *
     * - `desc` cannot be empty
     *
     * - `participationAmount` needs to be higer than 0
     *
     */
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

    /**
     * @dev Participate in the given project by sending ethers 
     * 
     * @param projectId Project that wants to send the funds
     *
     * Requirements:
     *
     * - Implement a payable setter function called participateToProject(), where
     *   users can interact with the smart contract to fund a specific project. When a user
     *   contributes to a project, the smart contract should record the user's address, project
     *   ID, and the amount of their participation
     *
     * - `projectId` must be a valid project
     *
     * - `amount` needs to be equal or higher than the `participationAmount`
     *
     */
    function participateToProject(uint256 projectId) onlyValidProject(projectId) payable public {
        Project storage project = projects[projectId];
        uint256 amount = msg.value;
        require(amount >= project.participationAmount, "Amount provided is less than the participation amount");
        project.totalFundingAmount += amount;
        projectsContributions[projectId][msg.sender] += amount;
    }

    /**
     * @dev Retrieve the project details
     * 
     * @param projectId Project that wants to retrieve
     *
     * @return uint256 Unsigned integer representing the project id
     * @return string Project title
     * @return string Project description
     * @return address Project owner address
     * @return uint256 Unsigned integer representing the minimium participation amount
     * @return uint256 Unsigned integer representing the total funding amount
     *
     * Requirements:
     *
     * - Implement a getter function called getProjectDetails() that allows users to
     * retrieve the complete details of a crowdfunding project using the projectID.
     *
     * - `projectId` must be a valid project
     *
     */
    function getProjectDetails(uint256 projectId) onlyValidProject(projectId) public view returns (uint256, string memory, string memory, address, uint256, uint256) {
        Project storage project = projects[projectId];
        return (project.id, project.title, project.desc, project.owner, project.participationAmount, project.totalFundingAmount);
    }

    /**
     * @dev Retrieve contribution in a project given the contributor address
     * 
     * @param projectId Project that wants to retrieve
     * @param userAddress Contributor address
     *
     * @return uint256 Unsigned integer representing the contribution of the user address
     *
     * Requirements:
     *
     * - Implement a getter function called getProjectDetails() that allows users to
     * retrieve the complete details of a crowdfunding project using the projectID.
     *
     * - `projectId` must be a valid project
     *
     */
    function retrieveContributions(uint256 projectId, address userAddress) onlyValidProject(projectId) public view returns(uint256) {
        return projectsContributions[projectId][userAddress];
    }

    /**
     * @dev Retrieve all projects
     *
     * @return Project[] Array with all the projects avaiable for funding
     *
     */
    function getAllProjects() public view returns (Project[] memory) {
        require(numberOfProjects > 0, "No projects yet");
        Project[] memory prjcts = new Project[](numberOfProjects);
        for(uint256 idx = 0; idx < numberOfProjects; idx++){
            prjcts[idx] = projects[idx + 1];
        }
        return prjcts;
    }

    /**
     * @dev Transfer the total funding amount of the given project
     * to the project owner's wallet.
     *
     * @param projectId Project that wants to withdraw
     *
     * Requirements:
     *
     * - Implement a withdrawal function, named withdrawFunds(), that can only be
     * called by the project owner of the respective project. When called, this function
     * should transfer the current projectTotalFundingAmount of the specific project
     * to the project owner's wallet.
     *
     * - `projectId` must be a valid project
     * - `msg.sender` must be the owner of the project
     *
     * TODO: after withdraw, project should accept new contributions?
     */
    function withdrawFunds(uint256 projectId) public onlyValidProject(projectId) onlyProjectOwner(projectId) {
        Project storage project = projects[projectId];
        (bool sent, ) = project.owner.call{value: project.totalFundingAmount}("");
        require(sent, "Failed to send amount");
        project.totalFundingAmount = 0;
    }

}
