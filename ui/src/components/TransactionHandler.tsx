// TransactionHandler.tsx
import { useState } from 'react';
import { Mina, PublicKey, MerkleTree, Poseidon } from 'o1js';
import { State } from './StateManager'; // Import the State type from StateManager

const transactionFee = 0.1;

interface TransactionHandlerProps {
    state: State;
    setDisplayText: (text: string) => void;
    setTransactionLink: (link: string) => void;
}

const TransactionHandler = ({ state, setDisplayText, setTransactionLink }: TransactionHandlerProps) => {
    const [creatingTransaction, setCreatingTransaction] = useState(false);

    const onSendTransaction = async () => {
        setCreatingTransaction(true);

        setDisplayText('Creating a transaction...');
        console.log('Creating a transaction...');

        await state.zkappWorkerClient!.fetchAccount({
            publicKey: state.publicKey!,
        });

        setDisplayText('Creating proof...');
        console.log('Creating proof...');
        await state.zkappWorkerClient!.proveUpdateTransaction();

        console.log('Requesting send transaction...');
        setDisplayText('Requesting send transaction...');
        const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON();

        setDisplayText('Getting transaction JSON...');
        console.log('Getting transaction JSON...');
        const { hash } = await (window as any).mina.sendTransaction({
            transaction: transactionJSON,
            feePayer: {
                fee: transactionFee,
                memo: '',
            },
        });

        const transactionLink = `https://minascan.io/devnet/tx/${hash}`;
        console.log(`View transaction at ${transactionLink}`);

        setTransactionLink(transactionLink);
        setDisplayText(transactionLink);

        setCreatingTransaction(false);
    };

    const onRefreshCurrentRoot = async () => {
        console.log('Getting zkApp state...');
        setDisplayText('Getting zkApp state...');

        await state.zkappWorkerClient!.fetchAccount({
            publicKey: state.zkappPublicKey!,
        });
        const currentRoot = await state.zkappWorkerClient!.getRoot();
        console.log("🚀 ~ onRefreshCurrentRoot ~ currentRoot:", currentRoot);
        setDisplayText('');

        return; // Return void instead of Field
    };

    const setMembers = async (members: string[]) => {
        console.log('Getting zkApp state...');
        setDisplayText('Getting zkApp state...');

        await state.zkappWorkerClient!.fetchAccount({
            publicKey: state.zkappPublicKey!,
        });

        const Tree = new MerkleTree(8);
        const membersAddresses = members.map(member => PublicKey.fromBase58(member));
        console.log("🚀 ~ setMembers ~ membersAddresses:", membersAddresses);
        let addresses = membersAddresses.map(account => account as Mina.TestPublicKey);
        addresses.forEach((address, index) => {
            const indBn = BigInt(index);
            Tree.setLeaf(indBn, Poseidon.hash(address.toFields()));
        });
        const tx = await Mina.transaction(async () => {
            await state.zkappWorkerClient!.setRoot(Tree.getRoot());
        });

        await tx.prove();

        const { hash } = await (window as any).mina.sendTransaction({
            transaction: tx.toJSON(),
            feePayer: {
                fee: '',
                memo: 'zk',
            },
        });

        console.log(hash);

        const transactionLink = `https://minascan.io/devnet/tx/${hash}`;
        console.log(`View transaction at ${transactionLink}`);

        setTransactionLink(transactionLink);
        setDisplayText(transactionLink);

        setCreatingTransaction(false);
        const newMembers = await state.zkappWorkerClient!.setRoot(Tree.getRoot());
        console.log("🚀 ~ setMembers ~ newMembers:", newMembers);
        const currentRoot = await state.zkappWorkerClient!.getRoot();
        console.log("🚀 ~ onRefreshCurrentRoot ~ currentRoot:", currentRoot);
        setDisplayText('');

        return; // Return void instead of Field
    };

    return { onSendTransaction, onRefreshCurrentRoot, setMembers, creatingTransaction };
};

export default TransactionHandler;