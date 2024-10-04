import { Membership, MyMerkleWitness } from './Membership.js';
import {
    Field,
    Mina,
    PrivateKey,
    PublicKey,
    AccountUpdate,
    MerkleTree,
    Poseidon,
} from 'o1js';

describe('Membership', () => {
    let zkApp: Membership,
        zkAppPrivateKey: PrivateKey,
        zkAppAddress: PublicKey,
        sender: Mina.TestPublicKey,
        senderKey: PrivateKey,
        tree: MerkleTree,
        keys: PrivateKey[];

    beforeEach(async () => {
        let Local = await Mina.LocalBlockchain({ proofsEnabled: false });
        Mina.setActiveInstance(Local);
        sender = Local.testAccounts[0];
        senderKey = sender.key;
        zkAppPrivateKey = PrivateKey.random();
        zkAppAddress = zkAppPrivateKey.toPublicKey();
        zkApp = new Membership(zkAppAddress);

        // Initialize Merkle Tree
        tree = new MerkleTree(8);

        // Add some addresses to the Merkle Tree
        keys = Local.testAccounts.map(account => account.key);
        keys.forEach((key, index) => {
            const indBn = BigInt(index);
            tree.setLeaf(indBn, Poseidon.hash(key.toPublicKey().toFields()));
        });
    });

    it('should deploy the contract and set the initial commitment', async () => {
        await deploy(zkApp, zkAppPrivateKey, tree.getRoot(), sender, senderKey);

        let commitment = zkApp.commitment.get();
        expect(commitment.toBigInt()).toEqual(tree.getRoot().toBigInt());
    });

    it('should verify a member correctly', async () => {
        await deploy(zkApp, zkAppPrivateKey, tree.getRoot(), sender, senderKey);

        let memberKey = keys[0];
        let proof = new MyMerkleWitness(tree.getWitness(0n));

        let isMember = await zkApp.isMember(proof, memberKey);
        expect(isMember.toBoolean()).toBe(true);
    });

    it('should reject a non-member correctly', async () => {
        await deploy(zkApp, zkAppPrivateKey, tree.getRoot(), sender, senderKey);

        let nonMemberKey = PrivateKey.random();
        let proof = new MyMerkleWitness(tree.getWitness(0n));

        let isMember = await zkApp.isMember(proof, nonMemberKey);
        expect(isMember.toBoolean()).toBe(false);
    });
});

async function deploy(
    zkApp: Membership,
    zkAppPrivateKey: PrivateKey,
    initialCommitment: Field,
    sender: PublicKey,
    senderKey: PrivateKey
) {
    let tx = await Mina.transaction(sender, async () => {
        AccountUpdate.fundNewAccount(sender);
        await zkApp.deploy();
        await zkApp.setRoot(initialCommitment);
    });
    await tx.prove();
    await tx.sign([zkAppPrivateKey, senderKey]).send();
}