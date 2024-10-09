import { useState } from 'react';
import UIComponents from '@/components/UIComponents';
import TransactionHandler from '@/components/TransactionHandler';
import StateManager from '@/components/StateManager';
import StarryBackground from '@/components/StarryBackground';

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [transactionlink, setTransactionLink] = useState('');
  const [account, setAccount] = useState('');

  const state = StateManager({ setDisplayText, setAccount, setTransactionLink });
  const { onSendTransaction, onRefreshCurrentRoot, setMembers, creatingTransaction } = TransactionHandler({ state, setDisplayText, setTransactionLink });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <StarryBackground>
        <UIComponents
          state={state}
          displayText={displayText}
          transactionlink={transactionlink}
          account={account}
          onSendTransaction={onSendTransaction}
          onRefreshCurrentRoot={onRefreshCurrentRoot}
          setMembers={setMembers}
        />
      </StarryBackground>
    </div>
  );
}