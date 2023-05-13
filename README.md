[![CircleCI](https://dl.circleci.com/status-badge/img/gh/wgcisotto/sm-crowdfunding/tree/main.svg?style=svg&circle-token=b1382b52d2b3e60e0b17132f31b923f70fa47a82)](https://dl.circleci.com/status-badge/redirect/gh/wgcisotto/sm-crowdfunding/tree/main)
[![codecov](https://codecov.io/gh/wgcisotto/sm-crowdfunding/branch/main/graph/badge.svg?token=1W8793GR5X)](https://codecov.io/gh/wgcisotto/sm-crowdfunding)

# BLOC522 Spring 2023 – Project Assignment

## Crowdfunding

Smart contract for crowdfunding that meets specific requirements. The smart contract will allow project owners to list various projects and initiate crowdfunding campaigns for each project. Users should be able to participate in the crowdfunding campaigns by interacting with the smart contract, such as sending funds.

## Interaction with the code

1) [Install the dependencies](#install-dependencies), you may use either yarn or npm
2) [Compile](#compile) the Smart Contract
3) Run the [tests](#tests) and see the results
4) Check the [coverage](#coverage) 

## Iteration with the Smart Contract

To see the currently available tasks run `yarn hardhat` or `npx hardhat` 

> **Note:** To run on Goerli or Sepolia Network

> Create `.env` file, see `.env.example`

### Deploy at Sepolia

```shell
yarn hardhat deploy --network sepolia
````

---

### Install dependencies

```shell
yarn install
```

or

```shell
npm install
```

### Compile

```shell
yarn hardhat compile
```

or

```shell
npx hardhat compile
```

### Tests

```shell
yarn hardhat test
```

or

```shell
npx hardhat test
```

### Coverage

```shell
yarn hardhat coverage
```

or


```shell
npx hardhat coverage
```