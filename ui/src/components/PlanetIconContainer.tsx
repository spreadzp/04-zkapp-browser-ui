import React from 'react';
import Planet from './Planet';

interface PlanetIconContainerProps {
    isOpenGate: boolean;
}

const PlanetIconContainer: React.FC<PlanetIconContainerProps> = ({ isOpenGate }) => {
    return isOpenGate ? <Planet className="planet-icon" /> : null;
};

export default PlanetIconContainer;