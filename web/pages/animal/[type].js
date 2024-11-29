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
import prisma from "@/utils/prisma.client";

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
  

export async function getServerSideProps({ params }) {
    const { type } = params;
    const animal = await prisma.animal.findUnique({
      where: {
        type: type,
      },
      include: {
        articles: true
      }
    });
    console.log(animal)
    return {
      props: {
        animal: animal,
      },
    };
}
export default function Animal({ animal }) {
     const router = useRouter(); // Get the router instance

     const { query } = router; // Extract query parameters
     const animalName = query.q || 'tiger'; // Default to 'tiger' if no query is provided

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
        <Header></Header>
        {/* Line Chart for Animal Exhibition */}
        <div class={styles.animal_heading}>
            <p>Our {animal.type}s</p>
        </div>
        <br></br>
        <div className={styles.animal_grid_container}>
          {animal.articles.map((article, i) => {
            return <>
              <div id={animal.type + i} className={styles.animal_div}>
                <h2 className={styles.animal_h2}>{article.animalName}</h2>
                  <img id={styles.lion_img} src={"/" + article.imageUrl} alt={article.id}></img>
                  <p><strong>Age:</strong> {article.age}</p>
                  <p><strong>Arrived at the Zoo:</strong> {article.arrivedAtTheZoo}</p>
                  <p>{article.description}</p>
              </div>
              </>
          })}
        </div>
        <br></br>
        <div class={styles.animal_heading}>
            <p>{animal.type} activity during the day</p>
        </div>
        <div className={styles.graph}>
            <Line data={data} options={options} />
        </div>
        <h1>Statistika</h1>
        <h1>Harmonogram</h1>
        </>
    )
}
