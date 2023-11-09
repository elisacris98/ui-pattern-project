import React, { useState, useEffect } from "react";
import './App.css'; // Make sure to import your CSS file

const digimon_url = 'https://digimon-api.vercel.app/api/digimon';

const DigimonModal = () => {
  const [digimons, setDigimons] = useState([]);
  const [digi, setDigi] = useState(null);
  const [error, setError] = useState(null);

  const fetchDigimon = async () => {
    try {
      const response = await fetch(digimon_url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseJson = await response.json();
      setDigimons(responseJson);
    } catch (error) {
      setError(error.message);
    }
  };

  const displayDigimon = () => {
    return (
      <div className="digimons">
        {digimons.map((digimon) => (
          <div className="digimon" key={digimon.name} onClick={() => handleClick(digimon.name)}>
            <img name={digimon.name} src={digimon.img} alt={digimon.name} />
          </div>
        ))}
      </div>
    );
  };

  const handleClick = async (name) => {
    const digiUrl = `${digimon_url}/name/${name}`;
    try {
      const response = await fetch(digiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseJson = await response.json();
      setDigi(responseJson[0]);
      openDigimon();
    } catch (error) {
      setError(error.message);
    }
  };

  const openDigimon = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  };

  const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  };

  useEffect(() => {
    fetchDigimon();
  }, []);

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {displayDigimon()}
          <div className="modal">
            <div className="modal-content">
              <h3>{digi?.name}</h3>
              <img src={digi?.img} alt={digi?.name} />
              <p>Level: {digi?.level}</p>
            </div>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DigimonModal;
