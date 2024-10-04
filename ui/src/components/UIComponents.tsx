// UIComponents.tsx
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
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
            <a href={auroLink} target="_blank" rel="noreferrer">
                Install Auro wallet here
            </a>
        );
        hasWallet = <div>Could not find a wallet. {auroLinkElem}</div>;
    }

    const stepDisplay = transactionlink ? (
        <a
            href={transactionlink}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'underline' }}
        >
            View transaction
        </a>
    ) : (
        displayText
    );

    let setup = (
        <div
            className={styles.start}
            style={{ fontWeight: 'bold', fontSize: '1.5rem', paddingBottom: '5rem' }}
        >
            {stepDisplay}
            {hasWallet}
        </div>
    );

    let accountDoesNotExist;
    if (state.hasBeenSetup && !state.accountExists) {
        const faucetLink =
            'https://faucet.minaprotocol.com/?address=' + state.publicKey!.toBase58();
        accountDoesNotExist = (
            <div>
                <span style={{ paddingRight: '1rem' }}>Account does not exist.</span>
                <a href={faucetLink} target="_blank" rel="noreferrer">
                    Visit the faucet to fund this fee payer account
                </a>
            </div>
        );
    }

    let mainContent;
    if (state.hasBeenSetup && state.accountExists) {
        mainContent = (
            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div>Connected account {`${account.slice(0, 6)}...${account.slice(-4)}`}</div>
                <div>{displayText}</div>
                <div className={styles.center} style={{ padding: 0 }}>
                    Current root in zkApp: {state.currentRoot!.toString()}{' '}
                </div>
                <button
                    className={styles.card}
                    onClick={onSendTransaction}
                    disabled={state.creatingTransaction}
                >
                    Send Transaction
                </button>
                <button className={styles.card} onClick={onRefreshCurrentRoot}>
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
        <div className={styles.main} style={{ padding: 0 }}>
            <div className={styles.center} style={{ padding: 0 }}>
                {setup}
                {accountDoesNotExist}
                {mainContent}
            </div>
        </div>
    );
};

export default UIComponents;