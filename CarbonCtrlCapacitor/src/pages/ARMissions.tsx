import React from 'react';
import { motion } from 'framer-motion';

const ARMissions: React.FC = () => {
  return (
    <motion.div
      className="armissions-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-header">
        <h1>📱 AR Missions</h1>
        <p>Use augmented reality for tree planting and waste segregation!</p>
      </div>
      
      <div className="armissions-content">
        <div className="coming-soon">
          <h2>Coming Soon!</h2>
          <p>AR.js powered missions with camera overlay and eco icons.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ARMissions;
