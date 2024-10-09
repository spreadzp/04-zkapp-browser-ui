import React from 'react';

interface MemberMessageProps {
    memberData: boolean;
}

const MemberMessage: React.FC<MemberMessageProps> = ({ memberData }) => {
    const message = memberData
        ? "Welcome to the Mina Universe! Your spaceship has access to our universe!"
        : "You are not a member of Mina Universe! Access denied for your spaceship!";

    const pulseClass = memberData ? 'pulse-green' : 'pulse-red';

    return (
        <div className={`member-message ${pulseClass}`}>
            {message}
        </div>
    );
};

export default MemberMessage;