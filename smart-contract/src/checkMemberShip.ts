import { Membership, MyMerkleWitness } from './Membership.js';
import {
    Field,
    Mina,
    PrivateKey,
    PublicKey,
    AccountUpdate,
    MerkleTree,
    Poseidon,
    fetchAccount
} from 'o1js';

const doProofs = true;
const ZKAPP_ADDRESS = 'B62qjwsyBfqQi86ErgVN5pTemqx99xEdGRt2s6yJy1YuEFjChZ7uoy5';
const zkappPublicKey = PublicKey.fromBase58(ZKAPP_ADDRESS);

const Network = Mina.Network(
    'https://api.minascan.io/node/devnet/v1/graphql'
);
console.log('Devnet network instance configured.');
Mina.setActiveInstance(Network);

await fetchAccount({ publicKey: zkappPublicKey })
const Tree = new MerkleTree(8);

// Add some addresses to the Merkle Tree
let addresses = [
    "B62qiVmjkRqnFoQEBRtBs7jsFQq43f4FkPtNFvt3VM7xmtU7oxgox5R", "B62qro7UZZAGFdKEHvgLSrcGh8FQejDwJiw1N5jKkGQpqfocu8dMt9z",
    "B62qp5mEnmEfaKhxKi8FcbcmXc6wjFzpQLnHJsDpytxi66R6YRmMVEc",
    "B62qoWswa1b4Fr6iiT9XfpT6kEH5fgCkPRfZhCwkdspN3WvEfZ362Qi",
    "B62qp1pkE3xP6cMhj2MG5pT32yLHDv6S9CqwCwuQSFjGY6jkbph8qUV",
    "B62qjwsyBfqQi86ErgVN5pTemqx99xEdGRt2s6yJy1YuEFjChZ7uoy5"
]
addresses.forEach((address, index) => {

    const indBn = BigInt(index);
    Tree.setLeaf(indBn, Poseidon.hash(PublicKey.fromBase58(address).toFields()));
});
let zkApp = new Membership(zkappPublicKey);
console.log('tree.getRoot()', Tree.getRoot())

if (doProofs) {
    console.log(' getting proofs');
    let proof = new MyMerkleWitness(Tree.getWitness(1n));
    const memberPublicKey = PublicKey.fromBase58(addresses[0]);
    let isMember = await zkApp.isMember(proof, memberPublicKey);
    console.log("🚀 ~ isMember:", isMember)
    console.log("🚀 ~ isMember:", isMember.toBoolean())
}

