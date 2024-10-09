import React, { useEffect, useRef, useState } from 'react';
import { SpaceShipIcon } from './Icon';

interface SpaceShipIconContainerProps {
    isButtonMoved: boolean;
    isOpenGate: boolean;
}

const SpaceShipIconContainer: React.FC<SpaceShipIconContainerProps> = ({ isButtonMoved, isOpenGate }) => {
    const iconRef = useRef<HTMLDivElement>(null);
    const [movingShip, setMovingShip] = useState(false);

    useEffect(() => {
        setMovingShip(true);
        if (isButtonMoved && iconRef.current) {
            iconRef.current.classList.add('move-icon');
        } else if (iconRef.current) {
            iconRef.current.classList.remove('move-icon');
            setMovingShip(false);
        }
    }, [isButtonMoved]);

    useEffect(() => {
        if (isOpenGate && iconRef.current) {
            iconRef.current.classList.add('open-gate');
            setTimeout(() => {
                iconRef.current?.classList.remove('open-gate');
            }, 3000); // 3 seconds for the gate opening animation
        }
    }, [isOpenGate]);

    return (
        <div
            ref={iconRef}
            className={`absolute top-4 left-4 transition-all duration-500 ease-in-out ${isButtonMoved ? 'move-icon' : ''} ${isOpenGate ? 'open-gate' : ''}`}
        >
            <SpaceShipIcon />
        </div>
    );
};

export default SpaceShipIconContainer;