import React, { useCallback, useState } from 'react';
import CanvasBackground from './CanvasBackground';
import SpaceShipIconContainer from './SpaceShipIconContainer';
import PlanetIconContainer from './PlanetIconContainer';
import MovingSpaceShipIcons from './MovingSpaceShipIcons';
import MemberMessage from './MemberMessage';
import { State } from './StateManager';
import { MyMerkleWitness } from 'membership-zk';
import { MerkleTree, Poseidon, PrivateKey, PublicKey } from 'o1js';
import ButtonContainer from './ ButtonContainer';

interface MinaVerseProps {
    state: State;
    account: string;
    children?: React.ReactNode;
}

const MinaVerse: React.FC<MinaVerseProps> = ({ state, account, children }) => {
    const [isButtonMoved, setIsButtonMoved] = useState(false);
    const [isOpenGate, setIsOpenGate] = useState(false);
    const [isLanding, setIsLanding] = useState(false);
    const [memberData, setMemberData] = useState<boolean | null>(null);

    const isMemberOfLand = useCallback(async () => {
        if (state && state.zkappWorkerClient) {
            const Tree = new MerkleTree(8);

            const response = await fetch('https://raw.githubusercontent.com/spreadzp/04-zkapp-browser-ui/refs/heads/main/spaceShipsAddresses.json');
            const addresses = await response.json();

            addresses.forEach((address: string, index: number) => {
                const indBn = BigInt(index);
                Tree.setLeaf(indBn, Poseidon.hash(PublicKey.fromBase58(address).toFields()));
            });

            let proof = new MyMerkleWitness(Tree.getWitness(0n));
            await state.zkappWorkerClient!.fetchAccount({
                publicKey: state.zkappPublicKey!,
            });

            //const key = PublicKey.fromBase58(account);
            debugger
            let memberData = await state.zkappWorkerClient!.isMember({ proof, key: account });
            const isMember = JSON.parse(memberData);
            if (isMember) {
                setMemberData(isMember);
                setIsLanding(isMember);
                setIsOpenGate(isMember); // Trigger the open-gate animation
            } else {
                setMemberData(false);
            }
        }
    }, [state, account]);

    return (
        <>
            <CanvasBackground />
            <div className="absolute top-0 left-0 w-full h-full z-auto">
                <SpaceShipIconContainer isButtonMoved={isButtonMoved} isOpenGate={isOpenGate} />
                <ButtonContainer
                    isButtonMoved={isButtonMoved}
                    isLanding={isLanding}
                    setIsButtonMoved={setIsButtonMoved}
                    setIsOpenGate={setIsOpenGate}
                    isMemberOfLand={isMemberOfLand}
                />
                {memberData && <PlanetIconContainer isOpenGate={isOpenGate} />}
                <MovingSpaceShipIcons />
                {memberData !== null && <MemberMessage memberData={memberData} />}
                {children}
            </div>
        </>
    );
};

export default MinaVerse;