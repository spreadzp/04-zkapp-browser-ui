import {
    SmartContract,
    Poseidon,
    Field,
    State,
    state,
    PublicKey,
    PrivateKey,
    method,
    MerkleTree,
    MerkleWitness,
    Bool,
} from 'o1js';

export class MyMerkleWitness extends MerkleWitness(8) { }

export class Membership extends SmartContract {
    @state(Field) commitment = State<Field>();
    @state(PublicKey) adminPublicKey = State<PublicKey>();

    @method async init() {
        super.init();
        this.commitment.set(Field(0));
    }

    @method async initState() {
        const emptyTreeRoot = new MerkleTree(8).getRoot();
        this.commitment.set(emptyTreeRoot);
    }

    @method.returns(Field)
    async getRoot(): Promise<Field> {
        this.commitment.requireEquals(this.commitment.get());
        return this.commitment.get();
    }
    @method
    async setRoot(commitment: Field) {
        this.commitment.set(commitment);
    }

    @method.returns(Bool)
    async isMember(proof: MyMerkleWitness, memberPublicKey: PublicKey): Promise<Bool> {
        let commitment = this.commitment.get();
        this.commitment.requireEquals(commitment);

        let addressHash = Poseidon.hash(memberPublicKey.toFields());
        let calculatedRoot = proof.calculateRoot(addressHash);

        return calculatedRoot.equals(commitment);
    }
}