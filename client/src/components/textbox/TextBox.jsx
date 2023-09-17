import React, { useContext } from 'react';
import LocationContext from "../../contexts/LocationContext";
import "./textBox.css"

function Textbox() {
  const { locationData } = useContext(LocationContext);
  const tripPlan = locationData.tripPlan;

  console.log(tripPlan);

  return (
    <div className="container-textbox">
      <p className="preserve-format">{tripPlan}</p>
    </div>
  );
}

export default Textbox;
