import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhaserGame from '../components/PhaserGame';
import { recyclingGameConfig } from '../games/RecyclingGame';
import { treePlantingGameConfig } from '../games/TreePlantingGame';
import { energySaverGameConfig } from '../games/EnergySaverGame';
import { waterConservationGameConfig } from '../games/WaterConservationGame';
import './MiniGames.scss';

const MiniGames: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'recycling',
      title: 'Recycling Challenge',
      description: 'Sort waste items into the correct recycling bins',
      icon: '♻️',
      difficulty: 'Easy',
      points: 50
    },
    {
      id: 'tree-planting',
      title: 'Tree Planting',
      description: 'Plant trees and watch your forest grow',
      icon: '🌳',
      difficulty: 'Medium',
      points: 100
    },
    {
      id: 'energy-saver',
      title: 'Energy Saver',
      description: 'Turn off lights and save energy',
      icon: '💡',
      difficulty: 'Easy',
      points: 30
    },
    {
      id: 'water-conservation',
      title: 'Water Conservation',
      description: 'Fix leaks and conserve water',
      icon: '💧',
      difficulty: 'Hard',
      points: 150
    }
  ];

  const renderGame = () => {
    switch (selectedGame) {
      case 'recycling':
        return <PhaserGame gameConfig={recyclingGameConfig} />;
      case 'tree-planting':
        return <PhaserGame gameConfig={treePlantingGameConfig} />;
      case 'energy-saver':
        return <PhaserGame gameConfig={energySaverGameConfig} />;
      case 'water-conservation':
        return <PhaserGame gameConfig={waterConservationGameConfig} />;
      default:
        return (
          <div className="game-placeholder">
            <h3>Game Coming Soon!</h3>
            <p>This game is under development. Check back soon!</p>
          </div>
        );
    }
  };

  if (selectedGame) {
    return (
      <motion.div
        className="minigames-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="game-header">
          <motion.button
            className="back-btn"
            onClick={() => setSelectedGame(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Games
          </motion.button>
          <h1>🎮 {games.find(g => g.id === selectedGame)?.title}</h1>
        </div>
        
        <div className="game-content">
          {renderGame()}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="minigames-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-header">
        <h1>🎮 Mini Games</h1>
        <p>Play fun environmental games powered by Phaser.js!</p>
      </div>
      
      <div className="games-grid">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            className="game-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedGame(game.id)}
          >
            <div className="game-icon">{game.icon}</div>
            <div className="game-info">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className="game-meta">
                <span className={`difficulty ${game.difficulty.toLowerCase()}`}>
                  {game.difficulty}
                </span>
                <span className="points">+{game.points} pts</span>
              </div>
            </div>
            <div className="play-btn">
              <span>▶️</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MiniGames;
