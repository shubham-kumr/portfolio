---
title: "NFTVerse - NFT Mint"
summary: "A full-stack NFT minting dApp on Polygon using Solidity, Hardhat, Node.js, and IPFS."
date: "April 22 2025"
draft: false
tags:
- Blockchain
- Node.js
- Solidity
demoUrl: https://opensea.io/assets/matic/0x176875001b4aa9b6fe1439bbe7aea0dc61223190/0
repoUrl: https://github.com/shubham-kumr/nftverse
---

NFTVerse is a decentralized application for minting NFTs on the Polygon network. It leverages Solidity smart contracts, Hardhat for development, Node.js/Express.js for backend, and IPFS (via Pinata or NFT.Storage) for decentralized storage.

## 🛠️ Tech Stack

- **Solidity** + **Hardhat**
- **Node.js** + **Express.js**
- **HTML**, **CSS**, **JavaScript**
- **Ethers.js**
- **IPFS** (Pinata or NFT.Storage)
- **Polygon**

## ⚙️ Setup Instructions

1. **Clone the repo**
    ```bash
    git clone https://github.com/shubham-kumr/nftverse.git
    cd nftverse
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure Environment**

    Create a `.env` file with:
    ```
    PRIVATE_KEY=your_wallet_private_key
    RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/API-KEY
    ```
    > **Important:** Never share your `.env` file or commit it to version control.

4. **Compile the Contract**
    ```bash
    npx hardhat compile
    ```

5. **Deploy**
    ```bash
    npx hardhat run scripts/deploy.js --network [network-name]
    ```

## 🔗 URI Creation via Pinata

1. **Upload the Image**
    - Go to your Pinata dashboard.
    - Upload your NFT image (e.g., `my-nft.png`).
    - Copy the resulting CID (Content Identifier).

2. **Create Metadata JSON**
    Create a `metadata.json` file:
    ```json
    {
      "name": "Bootcamp Attendance NFT",
      "description": "This NFT certifies participation in the SHARP Blockchain Bootcamp",
      "image": "ipfs://<IMAGE_CID>",
      "attributes": [
         {
            "trait_type": "Attendee",
            "value": "Your Name"
         },
         {
            "trait_type": "Batch",
            "value": "April 2025"
         }
      ]
    }
    ```

## 🌐 Tools & Links

- [🔧 Remix IDE](https://remix.ethereum.org/)
- [🦊 MetaMask](https://metamask.io/)
- [🔎 PolygonScan](https://polygonscan.com/)
- [🖼️ OpenSea](https://opensea.io/)
- [📤 Pinata](https://pinata.cloud/)

## 📸 Sample Output

Once minted, your NFT will appear on OpenSea:  
`https://opensea.io/assets/matic/0x176875001b4aa9b6fe1439bbe7aea0dc61223190/0`

---

🚀 Happy Building, and welcome to Web3!
