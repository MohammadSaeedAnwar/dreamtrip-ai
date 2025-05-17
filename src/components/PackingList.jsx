import React, { useState } from 'react';

const PackingList = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const toggleItem = (item) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(item)) {
      newCheckedItems.delete(item);
    } else {
      newCheckedItems.add(item);
    }
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Packing List</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <input
              type="checkbox"
              checked={checkedItems.has(item)}
              onChange={() => toggleItem(item)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span
              className={`text-gray-700 ${
                checkedItems.has(item) ? 'line-through text-gray-400' : ''
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        {checkedItems.size} of {items.length} items packed
      </div>
    </div>
  );
};

export default PackingList; 