import React from 'react';

interface BattleButtonProps {
    startBattle: () => void;
}

const BattleButton: React.FC<BattleButtonProps> = ({ startBattle }) => {
    return (
        <button className="btn btn-primary" onClick={startBattle}>Start Battle</button>
);
};

export default BattleButton;