import { useState, useEffect } from 'react';
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  // State to hold the animal data
  const [animalData, setAnimalData] = useState({});
  const [loading, setLoading] = useState(true);

  // State to handle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch the animal data from the JSON file when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/animals.json'); // Access animals.json from the public folder
        const data = await res.json();
        setAnimalData(data); // Store the entire animal data in state
      } catch (error) {
        console.error('Error loading animal data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData(); // Call the function to fetch data
  }, []);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    if(isDropdownOpen) {
      let goober = document.getElementById("arrow")
      goober.id = "arrow1"
    } else {
      let goober = document.getElementById("arrow1")
      goober.id = "arrow"
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <>
      <Header />
      <div className="main-title dropdown-container">
        <img src="/pet.png" className="img" alt="Pet" />
        <h1 className="title">Exhibition</h1>
        <img
          src="/arrow.png"
          id="arrow1"
          className="dropbtn"
          onClick={toggleDropdown}
          alt="Toggle Dropdown"
        />
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="dropdown-content">
            {/* Display animal data dynamically */}
            {Object.entries(animalData).map(([key, animal]) => (
              <a key={key} className="inner-building" href={`statistics?q=${animal.name.toLowerCase()}`}>
                <div className="building">
                  <p className="house-text">{animal.name}</p>
                  <p className="build-text">Number of animals: {animal.population}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
