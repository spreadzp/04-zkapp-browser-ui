# Proof of Landing

This blockchain-based application is built using Node.js and Next.js, with smart contracts deployed on the blockchain testnet using the AURO wallet. The application is hosted at [this link](https://spreadzp.github.io/04-zkapp-browser-ui/).

## Application Overview

This application utilizes a Merkle Tree structure to store the members of a team and the addresses of spaceships allowed to land on Earth. Spaceships are permitted to land only if they provide cryptographic proof that they are part of the Merkle Tree.

### Key Features:
- **Next.js & Node.js Integration:** The frontend uses Next.js for rendering and navigation, while the backend is powered by Node.js to handle blockchain interactions.
- **Merkle Tree Proofs:** The application implements Merkle proofs for securely verifying spaceship addresses without revealing the entire list.
- **AURO Wallet Integration:** The application connects to the AURO wallet for seamless interaction with the blockchain testnet.

## Getting Started

### Prerequisites

- **Node.js** (version 16.x or higher)
- **npm** (version 18.x or higher)
- **AURO wallet extension**

### Installation

1. Clone the repository from [this link](https://github.com/spreadzp/04-zkapp-browser-ui.git).

2. Navigate to the project directory.

3. Install dependencies using npm or yarn:

   - Using npm:    
    ```
     npm install 
    ```

### Running the Application

To start the development server:

- Using npm:

# Proof of Landing

This blockchain-based application is built using Node.js and Next.js, with smart contracts deployed on the blockchain testnet using the AURO wallet. The application is hosted at ***[Proof of Landing zkAPP](https://spreadzp.github.io/04-zkapp-browser-ui/)***.

[proofOfLanding.webm](https://github.com/user-attachments/assets/5dbfe363-6284-4c8f-b020-ebea60531508)

## Application Overview

This application utilizes a Merkle Tree structure to store the members of a team and the addresses of spaceships allowed to land on Earth. Spaceships are permitted to land only if they provide cryptographic proof that they are part of the Merkle Tree.

### Key Features:
- **Next.js & Node.js Integration:** The frontend uses Next.js for rendering and navigation, while the backend is powered by Node.js to handle blockchain interactions.
- **Merkle Tree Proofs:** The application implements Merkle proofs for securely verifying spaceship addresses without revealing the entire list.
- **AURO Wallet Integration:** The application connects to the AURO wallet for seamless interaction with the blockchain testnet.

## Getting Started

### Prerequisites

- **Node.js** (version 16.x or higher)
- **npm** (version 7.x or higher) or **yarn**
- **AURO wallet extension**

### Installation

1. Clone the repository from [this link](https://github.com/spreadzp/04-zkapp-browser-ui.git).

2. Navigate to the project directory.

3. Install dependencies using npm :
    
     ```
     npm install
     ```

### Running the Application

To start the development server:

- Using npm:
 ```
 npm run dev
 ```

 
The application will be available at [http://localhost:3000](http://localhost:3000).

## How It Works

### Merkle Tree Structure
The application uses a Merkle Tree to store and verify spaceship addresses.

### Spaceship Verification
Before landing on Earth, a spaceship must submit proof that its address is part of the Merkle Tree.

### AURO Wallet Interaction
Users can interact with the blockchain through the AURO wallet to submit proofs and perform transactions.

## License

This project is licensed under the MIT License.