[![CircleCI](https://dl.circleci.com/status-badge/img/gh/wgcisotto/sm-crowdfunding/tree/main.svg?style=svg&circle-token=b1382b52d2b3e60e0b17132f31b923f70fa47a82)](https://dl.circleci.com/status-badge/redirect/gh/wgcisotto/sm-crowdfunding/tree/main)
[![codecov](https://codecov.io/gh/wgcisotto/sm-crowdfunding/branch/main/graph/badge.svg?token=1W8793GR5X)](https://codecov.io/gh/wgcisotto/sm-crowdfunding)

# BLOC522 Spring 2023 – Project Assignment

## [Crowdfunding](https://sepolia.etherscan.io/address/0xF241B32766781e867D08C9458Bb2939d687a7820)

[Smart contract for crowdfunding](contracts/Crowdfunding.sol) that meets specific requirements. The smart contract will allow project owners to list various projects and initiate crowdfunding campaigns for each project. Users should be able to participate in the crowdfunding campaigns by interacting with the smart contract, such as sending funds.

### Project is structured as follows:
    .
    ├── contracts               # Smart Contracts
    ├── scripts                 # Scripts
    ├── tasks                   # Interactions Hardhat Tasks
    ├── tests                   # Automated tests
    └── README.md


## Interaction with the code

1) [Install the dependencies](#install-dependencies), you may use either yarn or npm
2) [Compile](#compile) the Smart Contract
3) Run the [tests](#tests) and see the results
4) Check the [coverage](#coverage) 

## Iteration with the Smart Contract

To see the currently available tasks run `yarn hardhat` or `npx hardhat`

* [Deploy](#deploy-at-sepolia)
* [Create Project](#create-project)
* [Participate](#participate-in-a-project)
* [Retrieve Project](#retrieve-project-details)
* [Get all Projects](#get-all-projects)
* [Get contribution by User](#get-contribution-by-user-address)
* [Withdraw](#owner-withdraw-funds)

> **Note:** To run on Goerli or Sepolia Network.

> Create `.env` file, see `.env.example` for more details.

### Deploy at Sepolia

```shell
yarn hardhat deploy --network sepolia
````
> For simplicity amount is _always_ in **WEI**

### Create project

```shell
yarn hardhat create-project --crowdfunding "0xF241B32766781e867D08C9458Bb2939d687a7820" --participation-amount "10" --desc "Project For Funding" --title "Project One" --network sepolia
````

```
Project Created! Transaction hash:  0xef271aa179d1f54e04cb18f8e62c986a6e0f74a9437c508b34e8bc0ad16b3936
```

### Participate in a Project

```shell
yarn hardhat participate --crowdfunding "0xF241B32766781e867D08C9458Bb2939d687a7820" --project-id "1" --amount "10" --network sepolia
````

```
Thanks for participation! Transaction hash:  0x90f931799a61c6dfc6ab34debd9d157a45d45d290699884b6ed4f3b86c81a99e
```

### Retrieve Project details

```shell
yarn hardhat project-details --crowdfunding "0xF241B32766781e867D08C9458Bb2939d687a7820" --project-id "1" --network sepolia
````

```
Project Found! 

          Id=[1]

          Title=[Project One]

          Description=[Project For Funding]

          Owner=[0x4276653514F9206c2cB371DF4D530f6fEe0EDE17]

          Participation Amount=[10]

          Total Funding Amount=[10]
```

### Get all Projects

```shell
yarn hardhat projects --crowdfunding "0xF241B32766781e867D08C9458Bb2939d687a7820" --network sepolia
````

````
Project Found! 

          Id=[1]

          Title=[Project One]

          Description=[Project For Funding]

          Owner=[0x4276653514F9206c2cB371DF4D530f6fEe0EDE17]

          Participation Amount=[10]

          Total Funding Amount=[10]

Project Found!

          Id=[2]

          Title=[Project Two]

          Description=[Project For Funding]

          Owner=[0x4276653514F9206c2cB371DF4D530f6fEe0EDE17]

          Participation Amount=[100]

          Total Funding Amount=[100]
````

### Get Contribution by User Address

```shell
yarn hardhat project-contribution --crowdfunding "0xF241B32766781e867D08C9458Bb2939d687a7820" --project-id "1" --user--address "0x4276653514F9206c2cB371DF4D530f6fEe0EDE17" --network sepolia
````

````
User=[0x4276653514F9206c2cB371DF4D530f6fEe0EDE17] contributed 10 wei
````

### Owner Withdraw Funds

```shell
yarn hardhat withdraw --crowdfunding "0xF241B32766781e867D08C9458Bb2939d687a7820" --project-id "1" --network sepoli
````

````
Withdraw successful! Transaction hash:  0x345e25a16715c9288b4aea7ca7e6e6c32e76e2df3dad9aa0f762f364a0dec09c
````

---

> **Note:** You can use either `yarn` or `npm`

### Install dependencies

```shell
yarn install || npm install
```

### Compile

```shell
yarn hardhat compile || npx hardhat compile
```

### Tests

```shell
yarn hardhat test || npx hardhat test
```

### Coverage

```shell
yarn hardhat coverage || npx hardhat coverage
```
