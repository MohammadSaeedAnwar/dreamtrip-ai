import React from 'react';
import { motion } from 'framer-motion';

const WeatherForecast = ({ destination, days }) => {
  // Mock weather data generation based on destination type
  const generateWeather = (destination, day) => {
    const weatherTypes = {
      mountains: ['⛄️', '🌨️', '⛅️', '🌤️', '❄️'],
      beach: ['☀️', '🌤️', '⛅️', '🌦️', '🌊'],
      city: ['☀️', '⛅️', '🌧️', '⛈️', '🌥️'],
      nature: ['🌳', '🌦️', '🌤️', '⛅️', '🌿'],
      culture: ['☀️', '⛅️', '🌤️', '🌥️', '🏛️']
    };

    const temps = {
      mountains: { min: -5, max: 15 },
      beach: { min: 20, max: 35 },
      city: { min: 15, max: 30 },
      nature: { min: 10, max: 25 },
      culture: { min: 15, max: 28 }
    };

    const destWeather = weatherTypes[destination] || weatherTypes.city;
    const destTemp = temps[destination] || temps.city;

    return {
      icon: destWeather[Math.floor(Math.random() * destWeather.length)],
      temp: Math.floor(Math.random() * (destTemp.max - destTemp.min + 1) + destTemp.min),
      humidity: Math.floor(Math.random() * 30 + 50),
      wind: Math.floor(Math.random() * 20 + 5)
    };
  };

  const forecasts = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    ...generateWeather(destination, i)
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Weather Forecast</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecasts.map(({ day, icon, temp, humidity, wind }) => (
          <motion.div
            key={day}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: day * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-gray-700">Day {day}</span>
              <span className="text-4xl">{icon}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Temperature</span>
                <span className="font-semibold text-gray-800">{temp}°C</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Humidity</span>
                <span className="font-semibold text-gray-800">{humidity}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wind</span>
                <span className="font-semibold text-gray-800">{wind} km/h</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherForecast; 