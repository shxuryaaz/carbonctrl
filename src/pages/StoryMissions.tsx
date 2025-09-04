import React from 'react';
import { motion } from 'framer-motion';

const StoryMissions: React.FC = () => {
  return (
    <motion.div
      className="storymissions-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-header">
        <h1>📚 Story Missions</h1>
        <p>Embark on eco-adventures with comic-style missions!</p>
      </div>
      
      <div className="missions-content">
        <div className="coming-soon">
          <h2>Coming Soon!</h2>
          <p>Comic-style eco missions with progress tracking and story-driven gameplay.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryMissions;
