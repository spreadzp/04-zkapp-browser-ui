import { Field, Mina, PrivateKey, PublicKey, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import { Membership, MyMerkleWitness } from 'membership-zk';

const state = {
    Membership: null as null | typeof Membership,
    zkapp: null as null | Membership,
    transaction: null as null | Transaction,
};

// ---------------------------------------------------------------------------------------

const functions = {
    setActiveInstanceToDevnet: async (args: {}) => {
        const Network = Mina.Network(
            'https://api.minascan.io/node/devnet/v1/graphql'
        );
        console.log('Devnet network instance configured.');
        Mina.setActiveInstance(Network);
    },
    loadContract: async (args: {}) => {
        state.Membership = Membership;
    },
    compileContract: async (args: {}) => {
        await state.Membership!.compile();
    },
    fetchAccount: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        return await fetchAccount({ publicKey });
    },
    initZkappInstance: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        state.zkapp = new state.Membership!(publicKey);
    },
    getRoot: async (args: {}) => {
        const currentRoot = await state.zkapp!.commitment.get();
        console.log("🚀 ~ getRoot: ~ currentRoot:", currentRoot)
        return JSON.stringify(currentRoot.toJSON());
    },
    setRoot: async (args: { commitment: string }) => {
        debugger
        const commitment = Field.fromJSON(JSON.parse(args.commitment));
        const transaction = await Mina.transaction(async () => {
            await state.zkapp!.setRoot(commitment);
        });
        state.transaction = transaction;

    },
    isMember: async (args: { proof: string, key: string }): Promise<string>  => {
        const proof = MyMerkleWitness.fromJSON(JSON.parse(args.proof));
        const key = PrivateKey.fromJSON(JSON.parse(args.key));
        return JSON.stringify(await state.zkapp!.isMember(proof, key));
    },
    // createUpdateTransaction: async (args: {}) => {

    //         await state.zkapp!.update();
    //     });
    //     state.transaction = transaction;
    // },
    proveUpdateTransaction: async (args: {}) => {
        await state.transaction!.prove();
    },
    getTransactionJSON: async (args: {}) => {
        return state.transaction!.toJSON();
    },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
    id: number;
    fn: WorkerFunctions;
    args: any;
};

export type ZkappWorkerReponse = {
    id: number;
    data: any;
};

if (typeof window !== 'undefined') {
    addEventListener(
        'message',
        async (event: MessageEvent<ZkappWorkerRequest>) => {
            const returnData = await functions[event.data.fn](event.data.args);

            const message: ZkappWorkerReponse = {
                id: event.data.id,
                data: returnData,
            };
            postMessage(message);
        }
    );
}

console.log('Web Worker Successfully Initialized.');