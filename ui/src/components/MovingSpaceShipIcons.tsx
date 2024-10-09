import React from 'react';
import MovingSpaceShipIcon from './MovingSpaceShipIcon';

const MovingSpaceShipIcons: React.FC = () => {
    return (
        <>
            <MovingSpaceShipIcon numberShip={1} />
            <MovingSpaceShipIcon numberShip={2} />
            <MovingSpaceShipIcon numberShip={3} />
            <MovingSpaceShipIcon numberShip={4} />
        </>
    );
};

export default MovingSpaceShipIcons;