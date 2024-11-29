import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import prisma from "@/utils/prisma.client";
import axios from "axios";

export async function getServerSideProps() {
  const animals = await prisma.animal.findMany({
    include: {
      updates: true,
    },
  });
  return {
    props: {
      animals: JSON.parse(JSON.stringify(animals)),
    },
  };
}

export default function Home({ animals }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [form, setForm] = useState({
    agepref: "",
    animal: "",
    time: "",
    food: "",
    isKid: true,
  });

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      let goober = document.getElementById("arrow");
      goober.id = "arrow1";
    } else {
      let goober = document.getElementById("arrow1");
      goober.id = "arrow";
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const send = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    console.log("Submitting form data:", form);
    axios
      .post("/api/getAnimalsPref", form)
      .then(function (response) {
        console.log("Response:", response);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  };

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
        {isDropdownOpen && (
          <div className="dropdown-content">
            {Object.entries(animals).map(([key, animal]) => (
              <a
                key={key}
                className="inner-building"
                href={`/animal/${animal.type.toLowerCase()}`}
              >
                <div className="building">
                  <p className="house-text">{animal.type}</p>
                  <p className="build-text">
                    Number of animals: {animal.max - animal.latestUpdateCount}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="trip-planning-div">
        <form
          className="trip-planning-form"
          onSubmit={send} // Use form's `onSubmit` event
        >
          <label htmlFor="agepref">Age preference</label>
          <select
            onChange={changeForm}
            name="agepref"
            id="agepref"
            value={form.agepref}
          >
            <option value="">Select an option</option>
            <option value="<8">Kids under 8</option>
            <option value="8>">Kids over 8</option>
            <option value="18=>">Adults</option>
            <option value="60>">Elderly</option>
          </select>

          <label htmlFor="animal">Favorite animal</label>
          <select
            onChange={changeForm}
            name="animal"
            id="animal"
            value={form.animal}
          >
            <option value="">Select an animal</option>
            <option value="lions">Lions</option>
            <option value="tigers">Tigers</option>
            <option value="elephants">Elephants</option>
            <option value="hippos">Hippos</option>
          </select>

          <label htmlFor="time">What time will you visit (in hours)?</label>
          <input
            onChange={changeForm}
            type="number"
            id="time"
            name="time"
            value={form.time}
          />

          <fieldset>
            <legend>Would you like food included?</legend>
            <div>
              <input
                type="radio"
                id="food-yes"
                name="food"
                value="yes"
                onChange={changeForm}
                checked={form.food === "yes"}
              />
              <label htmlFor="food-yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="food-no"
                name="food"
                value="no"
                onChange={changeForm}
                checked={form.food === "no"}
              />
              <label htmlFor="food-no">No</label>
            </div>
          </fieldset>

          <button id="agepref-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
