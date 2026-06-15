---
title: "Hello Ethernaut – Level 0 Walkthrough"
summary: "Step-by-step walkthrough for the first Ethernaut wargame level. Learn to interact with smart contracts, uncover passwords, and authenticate using JavaScript in your browser."
date: "Jun 22 2025"
tags:
- Ethereum
- Smart Contracts
- Security
- Ethernaut
- Walkthrough
---

 Hello Ethernaut – Level 0 Walkthrough

Welcome to the first level of the **Ethernaut** wargame by [OpenZeppelin](https://ethernaut.openzeppelin.com/), designed to teach smart contract security through hands-on hacking.

---

 Challenge Objective

You are given a contract deployed to the blockchain. Your goal is to:

- Interact with the contract using JavaScript in the browser console
- Uncover the password
- Call the `authenticate()` function with the correct password
- Successfully pass the level

---

 Prerequisites

Before you begin, ensure the following:

- **MetaMask** is installed and connected
- **Test ETH** is available (Goerli, Sepolia, etc.)
- Familiarity with using **browser DevTools** and executing JavaScript commands
- Access to the [Ethernaut Game](https://ethernaut.openzeppelin.com/)

---

 Getting Started

 1. **Load the Level**

- Navigate to [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
- Select **"Hello Ethernaut"** from the list of levels
- Click **"Get new instance"**
- Approve the MetaMask transaction to deploy your personalized challenge contract

Once the contract is deployed, it will inject a global object called `contract` into your browser console.

---

 Walkthrough – Step by Step

 Step 1: Follow the Hint Chain

```js
await contract.info()
```
> "You will find what you need in info1()."

```js
await contract.info1()
```
> "Try info2(), but with "hello" as a parameter."

```js
await contract.info2("hello")
```
> "The property infoNum holds the number of the next info method to call."

```js
await contract.infoNum()
```
> Returns: BigNumber { value: 42 }

```js
await contract.info42()
```
> "theMethodName is the name of the next method."

```js
await contract.theMethodName()
```
> Returns: "method7123949"

```js
await contract.method7123949()
```
> "If you know the password, submit it to authenticate()."

---

 Step 2: Retrieve the Password

```js
await contract.password()
```
> Returns: "ethernaut0"

---

 Step 3: Authenticate with the Password

```js
await contract.authenticate("ethernaut0")
```
Wait for the MetaMask transaction to confirm.

---

 Step 4: Submit the Level

Click **“Submit instance”** in the UI and confirm the MetaMask transaction. Once successful, the level is marked as **completed**.

---

 What You Learn

- Using `await` to interact with contracts
- Reading public state variables
- Navigating contract hints
- Understanding how contract functions can guide the user
- Sending transactions using `authenticate()` function
- The basics of interacting with the Ethereum VM in a real browser context

---

 Concepts Covered

| Concept | Description |
| ------------------- | ---------------------------------------------------------------------------- |
| Public Functions | All `infoX()` and `password()` functions are public and can be called freely |
| BigNumber Handling | Values like 42 are returned in BigNumber format by ethers.js |
| Web3 Interaction | Using injected contract instances and console JS to interact |
| MetaMask Signatures | MetaMask is used to sign and send the transaction to `authenticate()` |

---

 Resources

- [Ethernaut Game](https://ethernaut.openzeppelin.com/)
- [Video Walkthrough](https://www.youtube.com/watch?v=Hzu36mTJLeA)

---