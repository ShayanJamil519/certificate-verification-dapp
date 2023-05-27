import React, { useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import useAccessControl from "../../utils/useAccessControl";

const Navbar = ({ isHomePage }) => {
  const hasAccess = useAccessControl();
  const [showNavLinks, setShowNavLinks] = useState(false);

  // Function to toggle between the normal users and admin links in navbar
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
          {hasAccess && (
            <>
              <Link to="/generate_certificate">Generate certificate</Link>
              <Link to="/upload_certificate">Upload certificate</Link>
              <Link to="/view_all_certificates">View all certificate</Link>
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
