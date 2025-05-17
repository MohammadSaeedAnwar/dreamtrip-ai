import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ItineraryDay = ({ day, activities, notes, moodEmoji, weather, index, onNotesChange }) => (
  <Draggable draggableId={`day-${day}`} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        className="bg-white p-6 rounded-lg shadow-md mb-4"
      >
        <div {...provided.dragHandleProps} className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Day {day}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{weather}</span>
            <span className="text-2xl">{moodEmoji}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-green-500">•</span>
              <p className="text-gray-700">{activity}</p>
            </div>
          ))}
        </div>

        <textarea
          className="mt-4 w-full p-2 border rounded-md"
          placeholder="Add notes for this day..."
          value={notes}
          onChange={(e) => onNotesChange(day, e.target.value)}
        />
      </div>
    )}
  </Draggable>
);

const ItineraryBoard = ({ itinerary, onItineraryChange }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(itinerary);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onItineraryChange(items);
  };

  const handleNotesChange = (day, newNotes) => {
    const updatedItinerary = itinerary.map(item =>
      item.day === day ? { ...item, notes: newNotes } : item
    );
    onItineraryChange(updatedItinerary);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Travel Itinerary</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="itinerary">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {itinerary.map((day, index) => (
                <ItineraryDay
                  key={day.day}
                  {...day}
                  index={index}
                  onNotesChange={handleNotesChange}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ItineraryBoard; 