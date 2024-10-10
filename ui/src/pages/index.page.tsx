import { useState } from 'react';
import UIComponents from '@/components/UIComponents';
import TransactionHandler from '@/components/TransactionHandler';
import StateManager from '@/components/StateManager';
import MinaVerse from '@/components/MinaVerse';
import ExternalMenu from '@/components/ExternalMenu';
import { getIconByName } from '@/components/Icon';

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [transactionlink, setTransactionLink] = useState('');
  const [account, setAccount] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const state = StateManager({ setDisplayText, setAccount, setTransactionLink });
  const { onSendTransaction, onRefreshCurrentRoot, setMembers, creatingTransaction } = TransactionHandler({ state, setDisplayText, setTransactionLink });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <MinaVerse state={state} account={account}>
        <UIComponents
          state={state}
          displayText={displayText}
          transactionlink={transactionlink}
          account={account}
          onSendTransaction={onSendTransaction}
          onRefreshCurrentRoot={onRefreshCurrentRoot}
          setMembers={setMembers}
        />
      </MinaVerse>
      {/* <button onClick={toggleMenu} className="focus:outline-none">
        {getIconByName('Burger')}
      </button>
      <ExternalMenu
        isOpen={isMenuOpen}
        onClose={toggleMenu}
      /> */}
    </div>
  );
}