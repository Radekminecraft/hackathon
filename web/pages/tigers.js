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
                <h2 className={styles.animal_h2}>Rajah</h2>
                <img id={styles.lion_img} src="/tiger1.jpeg" alt="Rajah the Tiger"></img>
                <p><strong>Age:</strong> 8 years</p>
                <p><strong>Arrived at the Zoo:</strong> 6 years ago</p>
                <p>Rajah, a majestic Bengal tiger, was brought to the zoo as a cub. Known for his bold stripes and piercing gaze, Rajah quickly became a favorite among visitors. Over the years, he has transformed into a dignified leader of his enclosure. His calm and authoritative demeanor sets the tone for the zoo’s tiger exhibit, and he enjoys lounging by his favorite tree, observing the visitors and fellow tigers. Rajah has developed an excellent hunting instinct and serves as an example to younger tigers, teaching them the importance of patience and strategy.</p>
            </div>

            <div className={styles.animal_div}>
                <h2 className={styles.animal_h2}>Shaan</h2>
                <img id={styles.lion_img} src="/tiger2.jpg" alt="Shaan the Tiger"></img>
                <p><strong>Age:</strong> 6 years</p>
                <p><strong>Arrived at the Zoo:</strong> 4 years ago</p>
                <p>Shaan arrived at the zoo after being rescued from a wildlife sanctuary where he had spent most of his life in captivity. Initially shy and wary of his new environment, he slowly adjusted to his new life at the zoo. Shaan is known for his quiet strength and intelligent nature, and though he may seem reserved, he is a fierce protector of his territory. His playful interactions with Rajah and the other tigers have made him a respected figure among the zoo's tiger residents. He has found his place and now enjoys exploring his spacious habitat, often basking in the sun during the afternoon.</p>
            </div>

            <div className={styles.animal_div}>
                <h2 className={styles.animal_h2}>Tara</h2>
                <img id={styles.img3} src="/tiger3.jpg" alt="Tara the Tiger"></img>
                <p><strong>Age:</strong> 7 years</p>
                <p><strong>Arrived at the Zoo:</strong> 5 years ago</p>
                <p>Tara, a fierce and elegant tigress, has been a part of the zoo's tiger family since she was just a cub. She is known for her independent and adventurous spirit. Tara’s sharp instincts and agility make her an expert climber, often seen perched on the highest branches of the trees in her enclosure. While she enjoys her solitude, Tara is also a natural leader and takes charge when it comes to the younger tigers. Her ability to balance strength with compassion has made her an important role model in the zoo's tiger community, and she continues to thrive in her habitat.</p>
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
