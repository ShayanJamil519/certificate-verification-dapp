import React, { useState } from "react";
import "./UploadCertificate.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";

const UploadCertificate = () => {
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileSelection = (event) => {
    if (event.target.files.length > 0) {
      setFileSelected(true);
    }
  };
  return (
    <div>
      {/* Navbar */}
      <Navbar isHomePage={false} />
      {/* Upload Certificate Generator */}
      <div className="upload__cert__container">
        <h1>Upload Certificate</h1>
        <div className="input-container">
          <input type="file" id="file-input" onChange={handleFileSelection} />
          <label htmlFor="file-input">
            {fileSelected ? "File selected successfully!" : "Select your file"}
          </label>
        </div>
        <button>Upload File</button>
        <div className="hash">
          <p>
            <span>IPFS HASH:</span>
            <Link to="/">
              {" "}
              jkabaknfafnqofadnanfalfjnafnafk9rn1nqmnqflqfqjioqhqohfqfqkfnqofqofnqf
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadCertificate;
