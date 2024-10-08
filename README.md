# Proof of Landing

This blockchain-based application is built using Node.js and Next.js, with smart contracts deployed in testnet on the blockchain **[MINA]((https://docs.minaprotocol.com/))**   using the **[AURO wallet](https://chromewebstore.google.com/detail/auro-wallet/cnmamaachppnkjgnildpdmkaakejnhae?hl=ru&itemlang=te)**. The application is hosted at **[zkDAPP](https://spreadzp.github.io/04-zkapp-browser-ui/)**.

## Application Overview

This application utilizes a Merkle Tree structure to store the members of a team and the addresses of spaceships allowed to land on Earth. Spaceships are permitted to land only if they provide cryptographic proof that they are part of the Merkle Tree.

[mt1010.webm](https://github.com/user-attachments/assets/d5774310-775b-4455-b82d-17fe5633e0e7)

### Key Features:
- **Next.js & Node.js Integration:** The frontend uses Next.js for rendering and navigation, while the backend is powered by Node.js to handle blockchain interactions.
- **MINA blockchain** Deployed smart contract Membership
- **Merkle Tree Proofs:** The application implements Merkle proofs for securely verifying spaceship addresses without revealing the entire list.
- **AURO Wallet Integration:** The application connects to the AURO wallet for seamless interaction with the blockchain testnet.

## Getting Started

### Prerequisites
- **[MINA blockchain](https://docs.minaprotocol.com/)**
- **Node.js** (version 18.x or higher)
- **Next.js**
- **[AURO wallet extension](https://chromewebstore.google.com/detail/auro-wallet/cnmamaachppnkjgnildpdmkaakejnhae?hl=ru&itemlang=te)**

### Installation

1. Clone the repository from [this link](https://github.com/spreadzp/04-zkapp-browser-ui.git).

2. Navigate to the project directory.
    ```
    cd ui
    ```
3. Install dependencies using npm or yarn:
  
    ```
     npm install 
    ```

### Running the Application

To start the development server:
```
    npm run dev 
```    
 
The application will be available at [http://localhost:3000](http://localhost:3000).

## For smart contract development
1. Navigate to the project directory.
    ```
    cd smart-contract
    ```
2. Learn README.md  
    
## How It Works

### Merkle Tree Structure
The application uses a Merkle Tree to store and verify spaceship addresses.


### Spaceship Verification
Before landing on Earth, a spaceship must submit proof that its address is part of the Merkle Tree.
![mina-schema](https://github.com/user-attachments/assets/a3ad39f6-8597-4dc2-ac54-319121ea49e4)

### AURO Wallet Interaction
Users can interact with the blockchain through the AURO wallet to submit proofs and perform transactions.

## License

This project is licensed under the MIT License.