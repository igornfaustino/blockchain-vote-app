# blockchain-vote-app

The goal of this repository is to learn the basic concepts of blockchain by developing a simple application

## How to run

Running the local network:
`npx hardhat node`

Compiling and deploying our contract:
`npx hardhat compile` and `npx hardhat run scripts/deploy.js --network localhost`

Grab the address on the terminal and paste inside de `src/app`

```js
const voteAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
```

Running React:
`npm start`

## Goals

- [x] Learn the development flow of a blockchain app
- [x] Learn how to deploy a contract to blockchain
- [ ] Learn how to test contracts
- [x] Learn how to interact with contracts
- [x] Learn how to create smart contracts
- [x] Learn how to store user data

## Application description

A simple decentralized vote app that allows users to register new candidates and to vote on the desired candidate

### Requirements

- [ ] Allow adding more candidates
- [x] allow users to vote on a candidate via web browser
- [ ] Show on a web page the number of votes for each candidate

### Related Projects

Other repositories created to complement this blockchain learning project

#### Blockchain data structure

[Simple blockchain representation](https://github.com/igornfaustino/blockchain-py) created in python

#### Simple Crypto

[My first blockchain app](https://github.com/igornfaustino/igor-crypto-token) created using hardhat
