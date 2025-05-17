import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TravelTips = ({ mood, destination }) => {
  const [selectedCategory, setSelectedCategory] = useState('general');

  const tips = {
    general: {
      mountains: [
        "Pack layers for varying temperatures",
        "Stay hydrated at high altitudes",
        "Check weather forecasts regularly"
      ],
      beach: [
        "Apply sunscreen every 2 hours",
        "Stay hydrated in the heat",
        "Protect electronics from sand"
      ],
      city: [
        "Research public transportation",
        "Keep valuables secure",
        "Download offline maps"
      ],
      nature: [
        "Respect wildlife and vegetation",
        "Carry basic first aid supplies",
        "Follow marked trails"
      ],
      culture: [
        "Learn basic local phrases",
        "Research local customs",
        "Try traditional foods"
      ]
    },
    mood: {
      happy: [
        "Join group activities",
        "Try adventure sports",
        "Attend local festivals"
      ],
      cool: [
        "Explore hidden gems",
        "Try trendy local spots",
        "Take artistic photos"
      ],
      thoughtful: [
        "Visit quiet spots",
        "Keep a travel journal",
        "Practice mindfulness"
      ],
      melancholic: [
        "Find peaceful viewpoints",
        "Take solo walks",
        "Visit art galleries"
      ],
      excited: [
        "Try spontaneous activities",
        "Meet new people",
        "Document everything"
      ]
    },
    safety: {
      mountains: [
        "Carry emergency supplies",
        "Tell someone your plans",
        "Check equipment"
      ],
      beach: [
        "Check tide schedules",
        "Swim near lifeguards",
        "Watch for flags/warnings"
      ],
      city: [
        "Keep emergency contacts",
        "Use reputable services",
        "Stay aware of surroundings"
      ],
      nature: [
        "Bring navigation tools",
        "Check weather conditions",
        "Carry extra water"
      ],
      culture: [
        "Register with embassy",
        "Keep documents safe",
        "Know local emergency numbers"
      ]
    }
  };

  const categories = [
    { id: 'general', icon: '📝', label: 'General Tips' },
    { id: 'mood', icon: '😊', label: 'Mood-Based' },
    { id: 'safety', icon: '🛡️', label: 'Safety' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Travel Tips</h2>

      <div className="flex space-x-4 mb-6">
        {categories.map(({ id, icon, label }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(id)}
            className={`flex items-center px-4 py-2 rounded-full ${
              selectedCategory === id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{icon}</span>
            {label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-4"
        >
          {(selectedCategory === 'mood' ? tips.mood[mood] : tips[selectedCategory][destination])?.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
            >
              <span className="text-blue-500 mt-1">•</span>
              <p className="text-gray-700">{tip}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TravelTips; 