const activities = {
  mountains: {
    happy: ['Scenic hiking with friends', 'Mountain biking adventure', 'Picnic with a view'],
    cool: ['Rock climbing expedition', 'Paragliding session', 'Mountain photography tour'],
    thoughtful: ['Meditation retreat', 'Nature journaling', 'Peaceful mountain walks'],
    melancholic: ['Cozy cabin reading', 'Quiet forest bathing', 'Sunset watching'],
    excited: ['Zip-lining adventure', 'Mountain safari', 'Peak climbing']
  },
  beach: {
    happy: ['Beach volleyball', 'Snorkeling with friends', 'Beachside BBQ'],
    cool: ['Surfing lessons', 'Beach club hopping', 'Jet ski adventure'],
    thoughtful: ['Beach yoga', 'Shell collecting', 'Sunset meditation'],
    melancholic: ['Quiet beach walks', 'Reading by the waves', 'Stargazing'],
    excited: ['Water sports package', 'Island hopping', 'Beach party']
  },
  city: {
    happy: ['City food tour', 'Shopping spree', 'Local festival visit'],
    cool: ['Rooftop bar hopping', 'Street art tour', 'Urban photography'],
    thoughtful: ['Museum visits', 'Café hopping', 'Architecture tour'],
    melancholic: ['Bookstore exploration', 'Park visits', 'Art gallery tour'],
    excited: ['Theme park visit', 'Concert attendance', 'Night market exploration']
  },
  nature: {
    happy: ['Wildlife spotting', 'Nature trail hiking', 'Camping under stars'],
    cool: ['Adventure sports', 'Waterfall rappelling', 'Night safari'],
    thoughtful: ['Bird watching', 'Nature photography', 'Forest meditation'],
    melancholic: ['Quiet lake visit', 'Botanical garden tour', 'Nature sketching'],
    excited: ['River rafting', 'Canopy walk', 'Animal sanctuary visit']
  },
  culture: {
    happy: ['Local cooking class', 'Festival participation', 'Dance workshop'],
    cool: ['Street food tour', 'Local music show', 'Art workshop'],
    thoughtful: ['Temple/Museum visit', 'Historical tour', 'Cultural workshop'],
    melancholic: ['Ancient ruins exploration', 'Traditional tea ceremony', 'Cultural show'],
    excited: ['Cultural festival', 'Traditional dance show', 'Market exploration']
  }
};

export const generateItinerary = (mood, destination, days) => {
  const destinationActivities = activities[destination][mood] || [];
  
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1}`,
    activities: [
      destinationActivities[i % destinationActivities.length],
      destinationActivities[(i + 1) % destinationActivities.length],
      destinationActivities[(i + 2) % destinationActivities.length]
    ],
    notes: '',
    moodEmoji: '😊',
    weather: ['☀️', '🌤️', '⛅', '🌦️'][Math.floor(Math.random() * 4)]
  }));
};

export const generatePackingList = (destination, mood) => {
  const baseItems = ['Passport', 'Phone charger', 'Toiletries'];
  
  const destinationItems = {
    mountains: ['Hiking boots', 'Warm jacket', 'Backpack'],
    beach: ['Swimwear', 'Sunscreen', 'Beach towel'],
    city: ['Comfortable shoes', 'City map', 'Day bag'],
    nature: ['Insect repellent', 'Water bottle', 'First-aid kit'],
    culture: ['Modest clothing', 'Camera', 'Language guide']
  };

  return [...baseItems, ...(destinationItems[destination] || [])];
};
