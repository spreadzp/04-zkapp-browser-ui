// Home.tsx
import { useState } from 'react';
import GradientBG from '../components/GradientBG.js';
import UIComponents from '@/components/UIComponents';
import TransactionHandler from '@/components/TransactionHandler';
import StateManager from '@/components/StateManager';

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [transactionlink, setTransactionLink] = useState('');
  const [account, setAccount] = useState('');

  const state = StateManager({ setDisplayText, setAccount, setTransactionLink });
  const { onSendTransaction, onRefreshCurrentRoot, setMembers, creatingTransaction } = TransactionHandler({ state, setDisplayText, setTransactionLink });

  return (
    <GradientBG>
      <UIComponents
        state={state}
        displayText={displayText}
        transactionlink={transactionlink}
        account={account}
        onSendTransaction={onSendTransaction}
        onRefreshCurrentRoot={onRefreshCurrentRoot}
        setMembers={setMembers}
      />
    </GradientBG>
  );
}