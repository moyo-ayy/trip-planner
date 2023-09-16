import React from "react";
import "./home.css";
import MAP from "../../assets/3d-casual-life-trail-map.png";

function Home() {
  return (
    <div className="background">
      <div className="container container-grid">
        {/* Col 1 */}
        <div>
          <h1>Let AI design your road trip!</h1>
          <p>
            Transform your road trips with AI magic. Crafted routes. Curated
            experiences. Crystal-clear adventures.
          </p>
          <a href="/login" className="btn">
            Start the magic!
          </a>
        </div>
        {/* Col 2 */}

        <div className="image-fit up-down">
          <img
            className="drop-shadow"
            src="https://img.pikbest.com/origin/09/24/92/79bpIkbEsTgTF.png!sw800"
            alt="robot image"
          />
        </div>

        {/* Col 3 */}
        <div className="image-fit ">
          <img className="up-down drop-shadow" src={MAP} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
