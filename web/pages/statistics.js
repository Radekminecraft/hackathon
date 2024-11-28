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
import { useRouter } from 'next/router';

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

  // State for animal data and loading status
  const [animalData, setAnimalData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the animal data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/animals.json'); // Access animals.json from public folder
        const data = await res.json();
        setAnimalData(data[animalName.toLowerCase()] || data.tiger); // Fallback to 'tiger' if not found
      } catch (error) {
        console.error('Error loading animal data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [animalName]);

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
  if (loading) {
    return <div className="text-center mt-10">Loading animal data...</div>;
  }

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
      <title>Statistics</title>
      <div className="mainTitle flex flex-col lg:flex-row items-center min-h-screen bg-gray-100">
        {/* Population info div aligned to the left */}
        <div className="flex flex-col items-start lg:w-1 p-1 space-y-1">
          <header className="main-title text-9xl font-bold text-gray-800">
            {animalData.name} Statistics
          </header>


          {/* Animal Info Section (under Learn More button) */}
          <div className="triviaVec ">
            <p className="text-5xl font-semibold bg-white rounded box-border">
              Interesting trivia✨
            </p>
            <p className="text-xl font-semibold house-text">
              Population: {animalData.population.toLocaleString()}
            </p>
            <p className="text-xl font-semibold house-text">Habitat: {animalData.habitat}</p>
            <p className="text-xl font-semibold house-text">Diet: {animalData.diet}</p>
            <p className="text-xl font-semibold house-text">Lifespan: {animalData.lifespan}</p>
          </div>
        </div>

        {/* Line Chart for Animal Exhibition */}
        <div className="graf w-full lg:w-3/3 max-w-4xl mt-10 lg:mt-0 px-5">
          <Line data={data} options={options} />
        </div>
      </div>

      <Footer />
    </>
  );
}
