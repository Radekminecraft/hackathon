import { useState } from 'react';
import Header from "@/components/header";

// Mock animal data
const animalData = {
  Tiger: [3, 2, 4, 3, 5, 6, 8, 10, 12, 15, 14, 18, 20, 25, 22, 19, 17, 16, 14, 12, 10, 8, 6, 4],
  Hippo: [10, 8, 9, 7, 12, 15, 18, 20, 25, 28, 30, 35, 40, 38, 36, 30, 28, 26, 22, 20, 18, 15, 12, 10],
  Elephant: [50, 45, 40, 35, 38, 42, 60, 70, 90, 100, 120, 130, 150, 140, 145, 135, 125, 120, 115, 110, 100, 90, 80, 70],
};

export default function Report() {
  const [hour, setHour] = useState(0); // Default hour
  const [feeding, setFeeding] = useState(''); // Animal currently being fed

  // Handle hour change
  const handleHourChange = (e) => {
    const selectedHour = parseInt(e.target.value, 10) || 0;
    setHour(selectedHour);

    // Randomly select an animal for feeding
    const animals = Object.keys(animalData);
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setFeeding(randomAnimal);
  };

  // Increment hour
  const incrementHour = () => {
    if (hour < 23) {
      setHour(hour + 1);
    }
  };

  // Decrement hour
  const decrementHour = () => {
    if (hour > 0) {
      setHour(hour - 1);
    }
  };

  // Get sorted animal list based on the hour
  const sortedAnimals = Object.entries(animalData)
    .map(([name, counts]) => ({ name, count: counts[hour] }))
    .sort((a, b) => b.count - a.count);

  return (
    <>
<Header/>
    <div className="p-8 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Animal Report</h1>
      
      <div className="flex justify-center items-center mb-6">
        <label htmlFor="hour" className="text-xl font-medium mr-2 text-blue-600">
          Hour of the Day (0-23):
        </label>
        
        {/* Custom Number Input */}
        <div className="flex items-center border border-blue-400 rounded-lg overflow-hidden">
          <button
            onClick={decrementHour}
            className="w-12 h-12 bg-blue-500 text-white text-2xl font-semibold hover:bg-blue-600 focus:outline-none"
          >
            -
          </button>
          <input
            type="text"
            value={hour}
            readOnly
            className="w-16 text-center py-2 bg-white text-xl font-semibold border-l-2 border-r-2 border-blue-400 focus:outline-none"
          />
          <button
            onClick={incrementHour}
            className="w-12 h-12 bg-blue-500 text-white text-2xl font-semibold hover:bg-blue-600 focus:outline-none"
          >
            +
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Animals You Can See</h2>
      <ul className="space-y-4">
        {sortedAnimals.map((animal) => (
          <li
            key={animal.name}
            className="flex justify-between items-center p-4 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            <span className="text-lg font-medium text-gray-700">{animal.name}</span>
            <span className="text-lg font-semibold text-gray-800">{animal.count}</span>
          </li>
        ))}
      </ul>

      {feeding && (
        <div className="mt-6 p-4 text-center bg-green-100 text-green-800 font-bold rounded-lg shadow-md">
          Feeding in Progress: <span className="text-xl font-medium">{feeding}</span>
        </div>
      )}
    </div>
    </>
  );
}
