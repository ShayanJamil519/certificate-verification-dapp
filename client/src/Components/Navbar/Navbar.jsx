import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import CertificateVerification from "../../CertificateVerification.json";

const Navbar = ({ isHomePage }) => {
  const address = useAddress();
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [deployerAddress, setDeployerAddress] = useState("");
  const [showNavLinks, setShowNavLinks] = useState(false);

  useEffect(() => {
    // Function to get Admin and Deployer Addresses
    const getAdminandDeployerAddresses = async () => {
      // Making connection to the blockchain, getting signer wallet address and connecting to our smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CertificateVerification.address,
        CertificateVerification.abi,
        signer
      );

      // calling our smart contract function
      const isAdminConnected = await contract.isAdmin(address);
      setIsAdminConnected(isAdminConnected);
      // calling our smart contract function
      const deployerAddress = await contract.getDeployerAddress();
      setDeployerAddress(deployerAddress);
    };

    getAdminandDeployerAddresses();
  }, [address]);

  // It will show links when the connect wallet is either deployer of the contract or the current admin
  let showAdminNavLinks =
    address === deployerAddress || isAdminConnected === true;

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
