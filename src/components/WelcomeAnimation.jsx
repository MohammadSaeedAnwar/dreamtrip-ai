import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const WelcomeAnimation = ({ onComplete }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        scale: [0, 1.2, 1],
        rotate: [0, 360, 0],
        opacity: [0, 1],
        transition: { duration: 1.5, ease: "easeOut" }
      });
      
      if (onComplete) {
        setTimeout(onComplete, 500);
      }
    };
    
    sequence();
  }, [controls, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50">
      <motion.div
        animate={controls}
        initial={{ scale: 0, opacity: 0 }}
        className="text-center"
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✈️
        </motion.div>
        <motion.h1 
          className="text-4xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          DreamTrip AI
        </motion.h1>
        <motion.p
          className="text-xl text-white opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Your Journey Begins Here
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WelcomeAnimation; 