import React from 'react';
import { SpaceShipIcon } from './Icon';

interface MovingSpaceShipIconProps {
    numberShip: number
}
const MovingSpaceShipIcon = ({ numberShip }: MovingSpaceShipIconProps) => (
    <div className={`moving-space-ship-${numberShip}`}>
        <SpaceShipIcon />
    </div>
);

export default MovingSpaceShipIcon;