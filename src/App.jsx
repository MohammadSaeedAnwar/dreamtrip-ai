import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoodSelector from './components/MoodSelector';
import DestinationFilter from './components/DestinationFilter';
import ItineraryBoard from './components/ItineraryBoard';
import PackingList from './components/PackingList';
import WelcomeAnimation from './components/WelcomeAnimation';
import BudgetCalculator from './components/BudgetCalculator';
import WeatherForecast from './components/WeatherForecast';
import TravelTips from './components/TravelTips';
import LanguagePhrases from './components/LanguagePhrases';
import { generateItinerary, generatePackingList } from './data/mockItinerary';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState([]);
  const [packingList, setPackingList] = useState([]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    // Clear error when any selection changes
    setError('');
  }, [selectedMood, selectedDestination, days]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    if (selectedDestination) {
      generateTrip(mood, selectedDestination, days);
    }
    setStep(2);
  };

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
    if (selectedMood) {
      generateTrip(selectedMood, destination, days);
    }
    setStep(3);
  };

  const handleDaysChange = (e) => {
    const newDays = parseInt(e.target.value) || 3;
    if (newDays < 1 || newDays > 14) {
      setError('Please select between 1 and 14 days');
      return;
    }
    setDays(newDays);
    if (selectedMood && selectedDestination) {
      generateTrip(selectedMood, selectedDestination, newDays);
    }
  };

  const generateTrip = (mood, destination, numDays) => {
    try {
      const newItinerary = generateItinerary(mood, destination, numDays);
      const newPackingList = generatePackingList(destination, mood);
      setItinerary(newItinerary);
      setPackingList(newPackingList);
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.');
      console.error('Error generating trip:', err);
    }
  };

  if (showWelcome) {
    return <WelcomeAnimation onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            DreamTrip AI
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Plan your perfect mood-based journey
          </motion.p>
        </header>

        {error && (
          <motion.div 
            className="max-w-2xl mx-auto mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key="mood-selector"
                className={`transition-all duration-500 ${step !== 1 ? 'opacity-50' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: step === 1 ? 1 : 0.5, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
              </motion.div>

              {step >= 2 && (
                <motion.div
                  key="destination-filter"
                  className={`transition-all duration-500 ${step !== 2 ? 'opacity-50' : ''}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: step === 2 ? 1 : 0.5, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <DestinationFilter
                    selectedDestination={selectedDestination}
                    onDestinationSelect={handleDestinationSelect}
                  />
                </motion.div>
              )}

              {step >= 3 && (
                <motion.div
                  key="days-selector"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center space-x-4 p-6 bg-white rounded-lg shadow-lg"
                >
                  <label className="text-gray-700 text-lg">Trip Duration:</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={days}
                    onChange={handleDaysChange}
                    className="w-24 p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-700 text-lg">days</span>
                </motion.div>
              )}
            </AnimatePresence>

            {itinerary.length > 0 && (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ItineraryBoard itinerary={itinerary} onItineraryChange={setItinerary} />
                  <div className="space-y-8">
                    <PackingList items={packingList} />
                    <BudgetCalculator destination={selectedDestination} days={days} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <WeatherForecast destination={selectedDestination} days={days} />
                  <TravelTips mood={selectedMood} destination={selectedDestination} />
                </div>

                <LanguagePhrases destination={selectedDestination} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
