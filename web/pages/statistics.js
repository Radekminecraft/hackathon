import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from 'next/router'; // Import useRouter

// Registering the components needed for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnimalPage() {
  const router = useRouter(); // Get the router instance
  const { query } = router; // Extract query parameters
  const animalName = query.q || 'tiger'; // Default to 'tiger' if no query is provided

  // Static mock data for animals (You can extend this as needed)
  const animals = {
    tiger: {
      name: 'Tiger',
      population: 3900,
      habitat: 'Forests of Asia',
      diet: 'Carnivorous',
      lifespan: '10-15 years',
    },
    hippo: {
      name: 'Hippo',
      population: 12000,
      habitat: 'Rivers of Sub-Saharan Africa',
      diet: 'Herbivorous',
      lifespan: '40-50 years',
    },
    elephant: {
      name: 'Elephant',
      population: 415000,
      habitat: 'Grasslands, forests, and savannahs',
      diet: 'Herbivorous',
      lifespan: '60-70 years',
    },
  };

  const animal = animals[animalName.toLowerCase()] || animals.tiger; // Fallback to 'tiger' if the animal is not found

  // Mock data for the hours of the day (X-axis)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // State for number of animals (Y-axis)
  const [numberOfAnimals, setNumberOfAnimals] = useState(null);

  // Generate random number of animals after the component mounts
  useEffect(() => {
    const randomAnimals = hours.map(() => Math.floor(Math.random() * 50) + 10);
    setNumberOfAnimals(randomAnimals);
  }, []); // Empty dependency array to run only once on mount

  // Don't render the chart until the data is ready
  if (numberOfAnimals === null) {
    return <div className="text-center mt-10">Loading chart...</div>;
  }

  const data = {
    labels: hours.map(hour => `${hour}:00`), // Hour labels for the X-axis
    datasets: [
      {
        label: 'Number of Animals in Exhibition',
        data: numberOfAnimals,
        fill: false,
        borderColor: '#ff8343', // Orange color
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Animals in Exhibition Over Time`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hour of the Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Animals',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Header />

      <div className="flex flex-col lg:flex-row items-center min-h-screen bg-gray-100">
        {/* Population info div aligned to the left */}
        <div className="flex flex-col items-start lg:w-1/3 p-5 space-y-4">
          <header className="main-title text-3xl font-bold text-gray-800">
            {animal.name} Statistics
          </header>

          {/* Learn More button */}
          <button className="building-overview-button bg-gray-800 text-white py-3 px-5 hover:bg-gray-700 mt-4">
            Learn More
          </button>

          {/* Animal Info Section (under Learn More button) */}
          <div className="building-overview-div text-left p-5 rounded-lg shadow-lg bg-white mt-4">
            <p className="text-xl font-semibold house-text">
              Population: {animal.population.toLocaleString()}
            </p>
            <p className="text-xl font-semibold house-text">Habitat: {animal.habitat}</p>
            <p className="text-xl font-semibold house-text">Diet: {animal.diet}</p>
            <p className="text-xl font-semibold house-text">Lifespan: {animal.lifespan}</p>
          </div>
        </div>

        {/* Line Chart for Animal Exhibition */}
        <div className="w-full lg:w-2/3 max-w-4xl mt-10 lg:mt-0 px-5">
          <Line data={data} options={options} />
        </div>
      </div>

      <Footer />
    </>
  );
}
