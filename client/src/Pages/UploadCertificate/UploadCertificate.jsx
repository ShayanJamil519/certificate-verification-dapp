import React, { useState } from "react";
import "./UploadCertificate.css";
import Navbar from "../../Components/Navbar/Navbar";

import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { toast } from "react-toastify";
import CertificateVerification from "../../CertificateVerification.json";

const projectId = "2NeEZqOeOOi9fQgDL6VoIMwKIZY";
const projectSecret = "b4ae65044a6e29c52c4091bf29a976b2";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const UploadCertificate = () => {
  const [fileSelected, setFileSelected] = useState(false);
  const [certificateHash, setCertificateHash] = useState("");
  const [uploadFile, setUploadFile] = useState("");

  // Function to update the status of upload certificate file field text and also updates the uploadfile state
  const handleFileSelection = (event) => {
    if (event.target.files.length > 0) {
      setUploadFile(event.target.files[0]);
      setFileSelected(true);
    }
  };

  // Function to upload file
  const handleFileUpload = async () => {
    try {
      // Checking if someone clicks upload certicate submit button without selecting a file to make sure it gives error
      if (!uploadFile) {
        toast.error("Please select a file to upload.");
        return;
      }

      // Adding our file to ipfs
      const added = await ipfs.add(uploadFile);
      let certificateHash = added.path;
      setCertificateHash(certificateHash);

      // Making connection to the blockchain, getting signer wallet address and connecting to our smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CertificateVerification.address,
        CertificateVerification.abi,
        signer
      );

      // calling our smart contract function
      const tx = await contract.addImageHash(certificateHash);
      await tx.wait();
      toast.success("Certificate uploaded successfully!");
    } catch (error) {
      toast.error(error.message);
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
        <button onClick={handleFileUpload}>Upload File</button>
        {certificateHash && (
          <div className="hash">
            <p
              onClick={() =>
                window.open(
                  `https://gateway.pinata.cloud/ipfs/${certificateHash}`,
                  "_blank"
                )
              }
            >
              <span>IPFS HASH:</span>

              {certificateHash}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCertificate;
