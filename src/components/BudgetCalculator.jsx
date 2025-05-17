import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BudgetCalculator = ({ destination, days }) => {
  const [budget, setBudget] = useState({
    accommodation: 0,
    food: 0,
    activities: 0,
    transport: 0
  });

  const [currency, setCurrency] = useState('USD');
  const [totalBudget, setTotalBudget] = useState(0);

  const destinationCosts = {
    mountains: { base: 100, food: 30, activities: 50, transport: 20 },
    beach: { base: 120, food: 40, activities: 60, transport: 25 },
    city: { base: 150, food: 50, activities: 70, transport: 30 },
    nature: { base: 90, food: 25, activities: 45, transport: 35 },
    culture: { base: 130, food: 45, activities: 65, transport: 28 }
  };

  useEffect(() => {
    if (destination && days) {
      const costs = destinationCosts[destination];
      const newBudget = {
        accommodation: costs.base * days,
        food: costs.food * days,
        activities: costs.activities * days,
        transport: costs.transport * days
      };
      setBudget(newBudget);
      setTotalBudget(Object.values(newBudget).reduce((a, b) => a + b, 0));
    }
  }, [destination, days]);

  const currencies = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.85 },
    GBP: { symbol: '£', rate: 0.73 },
    JPY: { symbol: '¥', rate: 110 }
  };

  const formatMoney = (amount) => {
    const converted = amount * currencies[currency].rate;
    return `${currencies[currency].symbol}${Math.round(converted)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Estimated Budget</h2>
      
      <div className="mb-4">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(currencies).map(curr => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {Object.entries(budget).map(([category, amount]) => (
          <motion.div
            key={category}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
          >
            <span className="capitalize text-gray-700">
              {category}
            </span>
            <span className="font-semibold text-gray-900">
              {formatMoney(amount)}
            </span>
          </motion.div>
        ))}

        <motion.div
          className="mt-6 p-4 bg-blue-50 rounded-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-900">Total Budget</span>
            <span className="text-2xl font-bold text-blue-900">
              {formatMoney(totalBudget)}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        * Estimates based on average prices. Actual costs may vary.
      </div>
    </motion.div>
  );
};

export default BudgetCalculator; 