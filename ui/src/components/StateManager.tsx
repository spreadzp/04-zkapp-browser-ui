// StateManager.tsx
import { useState, useEffect } from 'react';
import { PublicKey, Field } from 'o1js';
import ZkappWorkerClient from '@/pages/zkappWorkerClient';

export interface State {
    zkappWorkerClient: null | ZkappWorkerClient;
    hasWallet: null | boolean;
    hasBeenSetup: boolean;
    accountExists: boolean;
    currentRoot: null | Field;
    publicKey: null | PublicKey;
    zkappPublicKey: null | PublicKey;
    creatingTransaction: boolean;
}

const initialState: State = {
    zkappWorkerClient: null,
    hasWallet: null,
    hasBeenSetup: false,
    accountExists: false,
    currentRoot: null,
    publicKey: null,
    zkappPublicKey: null,
    creatingTransaction: false,
};

const ZKAPP_ADDRESS = 'B62qjwsyBfqQi86ErgVN5pTemqx99xEdGRt2s6yJy1YuEFjChZ7uoy5';

interface StateManagerProps {
    setDisplayText: (text: string) => void;
    setAccount: (account: string) => void;
    setTransactionLink: (link: string) => void;
}

const StateManager = ({ setDisplayText, setAccount, setTransactionLink }: StateManagerProps) => {
    const [state, setState] = useState<State>(initialState);

    useEffect(() => {
        async function timeout(seconds: number): Promise<void> {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, seconds * 1000);
            });
        }

        (async () => {
            if (!state.hasBeenSetup) {
                setDisplayText('Loading web worker...');
                console.log('Loading web worker...');
                const zkappWorkerClient = new ZkappWorkerClient();
                await timeout(5);

                setDisplayText('Done loading web worker');
                console.log('Done loading web worker');
                await zkappWorkerClient.setActiveInstanceToDevnet();
                const mina = (window as any).mina;
                if (mina == null) {
                    setState({ ...state, hasWallet: false });
                    return;
                }

                const publicKeyBase58: string = (await mina.requestAccounts())[0];
                setAccount(publicKeyBase58);
                const publicKey = PublicKey.fromBase58(publicKeyBase58);

                console.log(`Using key:${publicKey.toBase58()}`);
                setDisplayText(`Using key:${publicKey.toBase58()}`);

                setDisplayText('Checking if fee payer account exists...');
                console.log('Checking if fee payer account exists...');

                const res = await zkappWorkerClient.fetchAccount({
                    publicKey: publicKey!,
                });
                const accountExists = res.error == null;

                await zkappWorkerClient.loadContract();

                console.log('Compiling zkApp...');
                setDisplayText('Compiling zkApp...');
                await zkappWorkerClient.compileContract();
                console.log('zkApp compiled');
                setDisplayText('zkApp compiled...');

                const zkappPublicKey = PublicKey.fromBase58(ZKAPP_ADDRESS);

                await zkappWorkerClient.initZkappInstance(zkappPublicKey);

                console.log('Getting zkApp state...');
                setDisplayText('Getting zkApp state...');
                await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey });
                const currentRoot = await zkappWorkerClient.getRoot();
                console.log("🚀 ~ currentRoot:", currentRoot);
                console.log(`Current state in zkApp: ${currentRoot.toString()}`);
                setDisplayText('');

                setState({
                    ...state,
                    zkappWorkerClient,
                    hasWallet: true,
                    hasBeenSetup: true,
                    publicKey,
                    zkappPublicKey,
                    accountExists,
                    currentRoot,
                });
            }
        })();
    }, [state.hasBeenSetup]);

    useEffect(() => {
        (async () => {
            if (state.hasBeenSetup && !state.accountExists) {
                for (; ;) {
                    setDisplayText('Checking if fee payer account exists...');
                    console.log('Checking if fee payer account exists...');
                    const res = await state.zkappWorkerClient!.fetchAccount({
                        publicKey: state.publicKey!,
                    });
                    const accountExists = res.error == null;
                    if (accountExists) {
                        break;
                    }
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                }
                setState({ ...state, accountExists: true });
            }
        })();
    }, [state.hasBeenSetup]);

    return state;
};

export default StateManager;