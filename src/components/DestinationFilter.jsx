import React from 'react';

const destinations = [
  { icon: '🏔️', label: 'Mountains', value: 'mountains' },
  { icon: '🏖️', label: 'Beach', value: 'beach' },
  { icon: '🌆', label: 'City', value: 'city' },
  { icon: '🌳', label: 'Nature', value: 'nature' },
  { icon: '🏛️', label: 'Culture', value: 'culture' }
];

const DestinationFilter = ({ selectedDestination, onDestinationSelect }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Choose your destination type</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {destinations.map(({ icon, label, value }) => (
          <button
            key={value}
            onClick={() => onDestinationSelect(value)}
            className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
              selectedDestination === value
                ? 'bg-green-100 scale-105 shadow-md'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <span className="text-4xl mb-2">{icon}</span>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DestinationFilter; 