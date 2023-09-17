import React, { useContext } from 'react';
import LocationContext from "../../contexts/LocationContext";

function Textbox() {
  const { locationData } = useContext(LocationContext);
  const tripPlan = locationData.tripPlan;

  console.log(tripPlan);

  return (
    <div className="container-textbox">
      <p>{tripPlan}</p>
    </div>
  );
}

export default Textbox;
