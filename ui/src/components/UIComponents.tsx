import React, { useState } from 'react';
import { State } from './StateManager'; // Import the State type from StateManager
import SetMembersForm from './SetMembersForm'; // Import the new SetMembersForm component

interface UIComponentsProps {
    state: State;
    displayText: string;
    transactionlink: string;
    account: string;
    onSendTransaction: () => Promise<void>;
    onRefreshCurrentRoot: () => Promise<void>;
    setMembers: (members: string[]) => Promise<void>;
}

const UIComponents = ({ state, displayText, transactionlink, account, onSendTransaction, onRefreshCurrentRoot, setMembers }: UIComponentsProps) => {
    const [members, setMembersState] = useState<string[]>([]);

    const handleMembersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log('e.target.value :>>', e.target.value);
        debugger;
        const cleanedMembers = e.target.value
            .split(/[\n,]+/) // Split by newline or comma
            .map((item: string) => item.trim())
            .filter(Boolean) // Remove any empty strings
            .map((item: string) => item.replace(/\\/g, '').replace(/^"|"$/g, ''));
        setMembersState(cleanedMembers);
    };

    const handleSetMembers = async () => {
        if (members.length > 0) {
            await setMembers(members);
        }
    };

    let hasWallet;
    if (state.hasWallet != null && !state.hasWallet) {
        const auroLink = 'https://www.aurowallet.com/';
        const auroLinkElem = (
            <a href={auroLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                Install Auro wallet here
            </a>
        );
        hasWallet = <div className="text-red-500">Could not find a wallet. {auroLinkElem}</div>;
    }

    const stepDisplay = transactionlink ? (
        <a
            href={transactionlink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
        >
            View transaction
        </a>
    ) : (
        <span className="">{displayText}</span>
    );

    let setup = (
        <div className="text-xl font-bold mb-8 text-center">
            {stepDisplay}
            {hasWallet}
        </div>
    );

    let accountDoesNotExist;
    if (state.hasBeenSetup && !state.accountExists) {
        const faucetLink =
            'https://faucet.minaprotocol.com/?address=' + state.publicKey!.toBase58();
        accountDoesNotExist = (
            <div className="mt-4 text-center">
                <span className="mr-2">Account does not exist.</span>
                <a href={faucetLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                    Visit the faucet to fund this fee payer account
                </a>
            </div>
        );
    }

    let mainContent;
    if (state.hasBeenSetup && state.accountExists) {
        mainContent = (
            <div className="flex flex-col items-center space-y-4 text-white">
                <div>Connected account {`${account.slice(0, 6)}...${account.slice(-4)}`}</div>
                <div>{displayText}</div>
                <div>Current root in zkApp: {state.currentRoot!.toString()}</div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={onSendTransaction}
                    disabled={state.creatingTransaction}
                >
                    Send Transaction
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={onRefreshCurrentRoot}>
                    Get Current Root
                </button>
                <SetMembersForm
                    handleMembersChange={handleMembersChange}
                    handleSetMembers={handleSetMembers}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
            <div className="text-center">
                {setup}
                {accountDoesNotExist}
                {mainContent}
            </div>
        </div>
    );
};

export default UIComponents;