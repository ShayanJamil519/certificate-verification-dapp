import React, { useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";

const Navbar = ({ isHomePage }) => {
  const address = useAddress();

  let showAdminNavLinks =
    address &&
    (address === "0xf479060656de6C8a32B84C8DD508E659A14A3460" ||
      "0xD57577BC6cdcF9a7EC9e7536BacB2C6c154CF521");

  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <>
      {/* Navbar */}
      <div className={`navbar ${isHomePage ? "" : "navbar__not-home"}`}>
        <div className="left__container">
          {isHomePage ? (
            <img src="/assets/home__logo.png" alt="Logo" />
          ) : (
            <FaBars />
          )}
        </div>

        <div className="nav-icon" onClick={toggleNavLinks}>
          {showNavLinks ? <FaTimes /> : <FaBars />}
        </div>

        {/* <div className="right__container"> */}
        <div className={`right__container ${showNavLinks ? "nav-active" : ""}`}>
          <Link to="/">Home</Link>
          {showAdminNavLinks && (
            <>
              <Link to="/generate_certificate">Generate certificate</Link>
              <Link to="/upload_certificate">Upload certificate</Link>
            </>
          )}

          <Link to="/verify_certificate">Verify certificate</Link>

          {isHomePage ? (
            <ConnectWallet
              theme="dark"
              className="connect__button"
              btnTitle="Connect Wallet"
            />
          ) : (
            <CgProfile />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
