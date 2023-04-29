import React from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="home__container">
      {/* Navbar */}
      <Navbar isHomePage={true} />

      {/* Hero */}
      <div className="hero__section">
        <div className="left__container">
          <h1>
            Certificate <br /> Verifier
          </h1>
        </div>
        <div className="right__container">
          <div className="img__container">
            <img src="/assets/home__cert.jpg" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
