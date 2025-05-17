import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguagePhrases = ({ destination }) => {
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const phrases = {
    mountains: {
      language: 'Nepali',
      phrases: [
        { phrase: 'Namaste', translation: 'Hello', pronunciation: 'nuh-muh-stay' },
        { phrase: 'Dhanyabad', translation: 'Thank you', pronunciation: 'dhan-ya-baad' },
        { phrase: 'Ramro', translation: 'Good', pronunciation: 'ram-ro' }
      ]
    },
    beach: {
      language: 'Thai',
      phrases: [
        { phrase: 'Sawadee', translation: 'Hello', pronunciation: 'sa-wa-dee' },
        { phrase: 'Khob khun', translation: 'Thank you', pronunciation: 'kop-kun' },
        { phrase: 'Chai', translation: 'Yes', pronunciation: 'chai' }
      ]
    },
    city: {
      language: 'French',
      phrases: [
        { phrase: 'Bonjour', translation: 'Hello', pronunciation: 'bon-zhoor' },
        { phrase: 'Merci', translation: 'Thank you', pronunciation: 'mair-see' },
        { phrase: 'Sil vous plaît', translation: 'Please', pronunciation: 'seel-voo-play' }
      ]
    },
    nature: {
      language: 'Spanish',
      phrases: [
        { phrase: 'Hola', translation: 'Hello', pronunciation: 'oh-la' },
        { phrase: 'Gracias', translation: 'Thank you', pronunciation: 'gra-see-as' },
        { phrase: 'Por favor', translation: 'Please', pronunciation: 'por-fa-vor' }
      ]
    },
    culture: {
      language: 'Japanese',
      phrases: [
        { phrase: 'Konnichiwa', translation: 'Hello', pronunciation: 'kon-nee-chi-wa' },
        { phrase: 'Arigatou', translation: 'Thank you', pronunciation: 'ah-ree-ga-toh' },
        { phrase: 'Onegaishimasu', translation: 'Please', pronunciation: 'oh-neh-gai-shi-mas' }
      ]
    }
  };

  const simulateAudioPlayback = (phrase) => {
    setSelectedPhrase(phrase);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const destinationPhrases = phrases[destination] || phrases.city;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Essential Phrases</h2>
      <p className="text-gray-600 mb-6">Learn some {destinationPhrases.language} phrases for your trip!</p>

      <div className="space-y-4">
        {destinationPhrases.phrases.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.phrase}</h3>
                <p className="text-gray-600">{item.translation}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => simulateAudioPlayback(item)}
                className={`p-2 rounded-full ${
                  isPlaying && selectedPhrase === item
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isPlaying && selectedPhrase === item ? '🔊' : '▶️'}
              </motion.button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-blue-50 p-2 rounded"
            >
              <p className="text-sm text-gray-700">
                <span className="font-medium">Pronunciation:</span> {item.pronunciation}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 p-4 bg-yellow-50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-yellow-800">
          💡 Tip: Practice these phrases before your trip to better connect with locals!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LanguagePhrases; 