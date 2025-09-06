import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
// import { recyclingGameConfig } from '../games/RecyclingGame';
import './PhaserGame.scss';

interface PhaserGameProps {
  gameConfig: Phaser.Types.Core.GameConfig;
  className?: string;
}

const PhaserGame: React.FC<PhaserGameProps> = ({ gameConfig, className = '' }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current && !phaserGameRef.current) {
      // Create Phaser game instance
      phaserGameRef.current = new Phaser.Game({
        ...gameConfig,
        parent: gameRef.current,
      });
    }

    // Cleanup function
    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [gameConfig]);

  return (
    <div className={`phaser-game-container ${className}`}>
      <div ref={gameRef} className="phaser-game" />
    </div>
  );
};

export default PhaserGame;
