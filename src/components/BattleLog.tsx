import React from 'react';

interface BattleLogProps {
    battleLog: string;
}

const BattleLog: React.FC<BattleLogProps> = ({ battleLog }) => {
    return (
        <div className="border p-3" style={{ minHeight: '100px' }}>
            {battleLog || 'No battle log available'}
        </div>
    );
};

export default BattleLog;