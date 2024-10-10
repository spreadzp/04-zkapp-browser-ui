
# Pitch for "Proof of Landing in the MINA Universe"
Hello everyone,
Imagine a future where every space mission's landing is securely recorded and easily verifiable. That's the concept behind our project, Proof of Landing in the MINA Universe.

Our project leverages the Mina Protocol’s smart contracts and Merkle Trees to create a decentralized, tamper-proof system for documenting spacecraft landings. Here’s how it works: when a spacecraft lands, cryptographic proofs are generated using Merkle Trees. These proofs are used to grant or deny access to the MINA Universe, ensuring only verified spacecraft can enter. This system not only enhances security but also makes mission data transparent and accessible to everyone.

By utilizing the Mina Protocol's lightweight blockchain, our project provides a scalable and efficient solution for space exploration.

Now, let’s take a quick look at the architecture. **[UML schema how it works](https://github.com/spreadzp/04-zkapp-browser-ui?tab=readme-ov-file#spaceship-verification)**

## How It Works
The core of this system revolves around Merkle Tree proofs. When a spacecraft attempts to land, it must provide cryptographic proof that it belongs to the Merkle Tree — in other words, that it’s allowed to land. This ensures only trusted spacecraft can access our universe.

## Technology Stack
We built this project using the following technologies:

Next.js for the frontend,
Node.js,
And of course, the MINA blockchain itself to run our smart contracts.
We’ve made use of a web worker to handle heavy blockchain operations in the background, keeping the user experience smooth and responsive. If you want to dive deeper into the technologies, you can check out the tech stack **[zkWorker](https://github.com/spreadzp/04-zkapp-browser-ui/blob/main/ui/src/pages/zkappWorker.ts#L7)**.

## Project Structure
Our repository is organized into two main directories:

### UI: The frontend interface built with Next.js. **[UI](https://github.com/spreadzp/04-zkapp-browser-ui/tree/main/ui)**
### Smart Contract: The backend smart contract logic, written and deployed on the MINA blockchain. **[Smart contract MemberShip.ts](https://github.com/spreadzp/04-zkapp-browser-ui/blob/main/smart-contract/src/Membership.ts)**
You can check out the project repository and the smart contract details through these links:
**[Repository](https://github.com/spreadzp/04-zkapp-browser-ui)**.


## Smart Contract Interaction
To interact with the smart contract, we developed an NPM package called  **[membership-zk](https://www.npmjs.com/package/membership-zk)**. This package makes it easy for developers to integrate with our smart contract for secure verification of spacecraft landings.

If you’d like to see how this works in the code, we’ve provided a sample in our GitHub repository **[using membership-zk in the code](https://github.com/spreadzp/04-zkapp-browser-ui/blob/08418333028653043960ec5b33cede165b1492c9/ui/src/pages/zkappWorker.ts#L7)**. 
**[Proof for Merkle Tree](https://github.com/spreadzp/04-zkapp-browser-ui/blob/08418333028653043960ec5b33cede165b1492c9/ui/src/components/MinaVerse.tsx#L38)**

## Blockchain Integration
Our application is deployed on the MINA testnet and is integrated with the AURO wallet, which allows users to securely interact with the blockchain. Through the AURO wallet, users can submit proofs and verify spaceship addresses. 

## Conclusion
In summary, Proof of Landing in the MINA Universe offers a blockchain-based solution for securely verifying spacecraft landings using Merkle Tree proofs. It provides transparency and verifiability, all while maintaining scalability, thanks to the Mina Protocol. We believe this is a crucial step toward secure, decentralized space exploration.
This idea is applicable for games where you need to prove membership in order to pass to a new level, it is also possible to apply it to military systems where you need to distinguish your drone from the enemy's, it is also an idea in business systems where you need to have access without having to show your identity, for example, a person has booked a room in a hotel and proof that he has access will allow him to open the door booked room

## The spaceship crew consists:
 [Captain](https://www.linkedin.com/in/paul-spread-bb337b63/)
    (![Paul1](https://github.com/user-attachments/assets/2907aaf8-e7f7-431c-883b-afc8a6b3bdfc)) 

 [Navigator](https://www.linkedin.com/in/olugbenga-ayoola-196034177/) 
 ![Olujpeg (1)](https://github.com/user-attachments/assets/f4917b42-75ed-4ab3-88c3-cbd079d3ad39) 

## Let’s make space exploration secure and transparent, one landing at a time.