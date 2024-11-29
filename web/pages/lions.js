import styles from "@/styles/animal.module.css";
import Header from "@/components/header";
import React, {useState,useEffect} from "react";
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
  


export default function Lions() {
     // State for animal data and loading status
     const router = useRouter(); // Get the router instance

     const { query } = router; // Extract query parameters
     const animalName = query.q || 'tiger'; // Default to 'tiger' if no query is provided
   

   
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
        <Header></Header>
        {/* Line Chart for Animal Exhibition */}
        <div class={styles.animal_heading}>
            <p>Our lions</p>
        </div>
        <br></br>
        <div className={styles.animal_grid_container}>
            <div id={styles.item1} className={styles.animal_div}>
                <h2  className={styles.animal_h2}>Simba</h2>
                <img id={styles.lion_img} src="/lion1.jpeg"></img>
                <p><strong>Age:</strong> 8 years</p>
                <p><strong>Arrived at the Zoo:</strong> 6 years ago</p>
                <p>
                
            </div>

            <div className={styles.animal_div}>
                <h2 className={styles.animal_h2}>Kovu</h2>
                <img id={styles.lion_img} src="/lion2.jpg"></img>
                <p><strong>Age:</strong> 6 years</p>
                <p><strong>Arrived at the Zoo:</strong> 4 years ago</p>
                <p>Kovu joined the zoo after being rescued from a nearby sanctuary. Raised in a different pride, Kovu faced some difficulties adjusting to his new home, but his quiet strength and steady nature helped him quickly integrate into his new environment. Known for his calm demeanor, Kovu has earned respect from his fellow lions and zoo staff alike. Although he is more reserved than others, Kovu’s presence is vital to the pride, and his thoughtful approach to leadership has made him an important figure in the zoo.</p>
                
            </div>

            <div className={styles.animal_div}>
                <h2 className={styles.animal_h2}>Nala</h2>
                <img id={styles.img3} src="/lion3.jpg"></img>
                <p><strong>Age:</strong> 7 years</p>
                <p><strong>Arrived at the Zoo:</strong> 5 years ago</p>
                <p>Nala is a sharp and resilient lioness who adapted quickly to her new surroundings. She is a skilled hunter and a strong presence within the pride. Nala’s leadership qualities and nurturing nature have made her an essential member of the group, ensuring the pride's success and well-being. She continues to guide the younger lions, providing them with the wisdom and strength they need to thrive in their environment.</p>
                
            </div>
        </div>
        <br></br>
        <div class={styles.animal_heading}>
            <p>Lion activity during the day</p>
        </div>
        <div className={styles.graph}>
            <Line data={data} options={options} />
        </div>
        <h1>Statistika</h1>
        <h1>Harmonogram</h1>
        </>
    )
}
