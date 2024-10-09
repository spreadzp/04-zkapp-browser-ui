import React from 'react';
import { PlanetIcon } from './Icon';

interface PlanetProps {
    className?: string;
}

const Planet: React.FC<PlanetProps> = ({ className }) => (
    <div className={className}>
        <PlanetIcon />
    </div>
);

export default Planet;