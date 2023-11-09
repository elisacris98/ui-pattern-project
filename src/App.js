import React, { useState, useEffect } from "react";

const digimon_url = 'https://digimon-api.vercel.app/api/digimon';


const DigimonModal = () => {
  const [digimons, setDigimons] = useState([]);
  const [digi, setDigi] = useState(null);

  const fetchDigimon = async () => {
    const response = await fetch(digimon_url);
    const responseJson = await response.json();
    setDigimons(responseJson);
  };

  const displayDigimon = () => {
    return (
      <div className="digimons">
        {digimons.map((digimon) => (
          <div className="digimon" key={digimon.name}>
            <img name={digimon.name} src={digimon.img} />
          </div>
        ))}
      </div>
    );
  };

  const handleClick = async (event) => {
    const digiUrl = `${digimon_url}/name/${event.target.name}`;
    const response = await fetch(digiUrl);
    const responseJson = await response.json();
    setDigi(responseJson[0]);
  };

  const openDigimon = async () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  };

  const closeModal = async () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  };

  useEffect(() => {
    fetchDigimon();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default DigimonModal;
