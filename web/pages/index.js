import { useState, useEffect } from 'react';
import Footer from "@/components/footer";
import Header from "@/components/header";
import prisma from '@/utils/prisma.client';



export async function getServerSideProps() {
  const animals = await prisma.animal.findMany(
    {include: {
      updates: true
    }}
  );
  return {
    props: {
      animals: JSON.parse(JSON.stringify(animals)),
    },
  };
}


export default function Home({ animals }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            {Object.entries(animals).map(([key, animal]) => (
              <a key={key} className="inner-building" href={`/animal/${animal.type.toLowerCase()}`}>
                <div className="building">
                  <p className="house-text">{animal.type}</p>
                  <p className="build-text">Number of animals: {animal.max - animal.updates[0].animalsIn}</p>
                </div>
              </a>
            ))}
          </div>
          
        )}
      </div>
      <div className="trip-planning-div">
        <form className="trip-planning-form">
          {/* Age preference */}
          <label htmlFor="agepref">Age preference</label>
          <select name="agepref" id="agepref">
            <option value="first-age-pref">Kids under 8</option>
            <option value="second-age-pref">Kids over 8</option>
            <option value="third-age-pref">Adults</option>
            <option value="fourth-age-pref">Elderly</option>
          </select>

          {/* Favorite animal */}
          <label htmlFor="favorite-animal">Favorite animal</label>
          <select name="favorite-animal" id="favorite-animal">
            <option value="lions">Lions</option>
            <option value="tigers">Tigers</option>
            <option value="elephants">Elephants</option>
            <option value="hippos">Hippos</option>
          </select>

          {/* Time of visit */}
          <label htmlFor="visit-time">What time will you visit?</label>
          <input type="time" id="visit-time" name="visit-time" />

          {/* Food preference */}
          <fieldset>
            <legend>Would you like food included?</legend>
            <div>
              <input type="radio" id="food-yes" name="food" value="yes" />
              <label htmlFor="food-yes">Yes</label>
            </div>
            <div>
              <input type="radio" id="food-no" name="food" value="no" />
              <label htmlFor="food-no">No</label>
            </div>
          </fieldset>

          <input id="agepref-submit" type="submit" value="Submit" />
        </form>
      </div>



      <Footer />
    </>
  );
}
