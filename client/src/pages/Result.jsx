import React from "react";
import Map from "../components/Map/Map.jsx";
import TextBox from "../components/textbox/TextBox.jsx";
import Nav from "../components/nav/Nav.jsx"

function Result() {
  return (
    <>
    <Nav />
      <div className="container">
        <div className="flex-container">
          <TextBox />
          <Map />
        </div>
      </div>
    </>
  );
}

export default Result;
