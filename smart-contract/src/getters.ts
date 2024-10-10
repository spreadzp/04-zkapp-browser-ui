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
console.log("🚀 ~ zkappPublicKey:", zkappPublicKey)

const Network = Mina.Network(
    'https://api.minascan.io/node/devnet/v1/graphql'
);
console.log('Devnet network instance configured.');
Mina.setActiveInstance(Network);

await fetchAccount({ publicKey: zkappPublicKey })

let zkapp = new Membership(zkappPublicKey);


if (doProofs) {
    console.log(' getting proofs');
    const currentRoot = await zkapp.getRoot();
    console.log("🚀 ~ currentRoot:", currentRoot)
}

