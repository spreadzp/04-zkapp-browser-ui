import React, { useState } from 'react';
import { AdminIcon, HomeIcon, SpaceShipIcon } from './Icon';

interface ButtonContainerProps {
    isButtonMoved: boolean;
    isLanding: boolean;
    setIsButtonMoved: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenGate: React.Dispatch<React.SetStateAction<boolean>>;
    isMemberOfLand: () => Promise<void>;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
    isButtonMoved,
    isLanding,
    setIsButtonMoved,
    setIsOpenGate,
    isMemberOfLand,
}) => {
    return (
        <button
            className="absolute top-4 left-4 pulse-green"
            onClick={() => {
                isMemberOfLand();
                setIsButtonMoved(!isButtonMoved);
                setIsOpenGate(isButtonMoved);
            }}
        >
            {isButtonMoved ? <AdminIcon /> : <SpaceShipIcon />}
            {/* {isLanding && <HomeIcon />} */}
        </button>
    );
};

export default ButtonContainer;