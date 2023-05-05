import React, { useState } from "react";
import "./UploadCertificate.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
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

  const handleFileSelection = (event) => {
    if (event.target.files.length > 0) {
      setUploadFile(event.target.files[0]);
      setFileSelected(true);
    }
  };

  const handleFileUpload = async () => {
    try {
      const added = await ipfs.add(uploadFile);
      let certificateHash = added.path;
      // setFileSelected(`https://gateway.pinata.cloud/ipfs/${fileSelected}`)
      setCertificateHash(certificateHash);

      console.log(`https://gateway.pinata.cloud/ipfs/${certificateHash}`);

      // console.log("dsfdsf: ", certificateHash);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CertificateVerification.address,
        CertificateVerification.abi,
        signer
      );

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
