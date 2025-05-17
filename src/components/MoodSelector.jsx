import React from 'react';

const moods = [
  { emoji: '😄', label: 'Happy', value: 'happy' },
  { emoji: '😎', label: 'Cool', value: 'cool' },
  { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful' },
  { emoji: '😔', label: 'Melancholic', value: 'melancholic' },
  { emoji: '😍', label: 'Excited', value: 'excited' }
];

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">How are you feeling today?</h2>
      <div className="flex flex-wrap gap-4">
        {moods.map(({ emoji, label, value }) => (
          <button
            key={value}
            onClick={() => onMoodSelect(value)}
            className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
              selectedMood === value
                ? 'bg-blue-100 scale-110 shadow-md'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <span className="text-4xl mb-2">{emoji}</span>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector; 