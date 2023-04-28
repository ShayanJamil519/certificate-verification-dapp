import React, { useState } from "react";
import "./Home.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";

const Home = () => {
  const address = useAddress();

  let showAdminNavLinks =
    address && address === "0xf479060656de6C8a32B84C8DD508E659A14A3460";

  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <div className="home__container">
      {/* Navbar */}
      <div className="navbar">
        <div className="left__container">
          <img src="/assets/home__logo.png" alt="Logo" />
        </div>

        <div className="nav-icon" onClick={toggleNavLinks}>
          {showNavLinks ? <FaTimes /> : <FaBars />}
        </div>

        {/* <div className="right__container"> */}
        <div className={`right__container ${showNavLinks ? "nav-active" : ""}`}>
          <Link to="/">Home</Link>
          {showAdminNavLinks && (
            <>
              <Link to="/">Generate certificate</Link>
              <Link to="/">Upload certificate</Link>
            </>
          )}

          <Link to="/">Verify certificate</Link>
          <ConnectWallet
            theme="dark"
            className="connect__button"
            btnTitle="Connect Wallet"
          />
        </div>
      </div>

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
