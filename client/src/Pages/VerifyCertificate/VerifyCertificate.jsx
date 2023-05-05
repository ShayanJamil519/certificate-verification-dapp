import React, { useState } from "react";
import "./VerifyCertificate.css";
import { BiSearch, BiCheck } from "react-icons/bi";
import Navbar from "../../Components/Navbar/Navbar";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import CertificateVerification from "../../CertificateVerification.json";

const VerifyCertificate = () => {
  const [hashValue, setHashValue] = useState("");
  const [certificateHash, setCertificateHash] = useState("");
  const [certificateDownloadType, setCertificateDownloadType] = useState(null);

  const handleViewFile = async () => {
    try {
      const savedDownloadType = localStorage.getItem("certificateDownloadType");
      console.log({ savedDownloadType });
      if (savedDownloadType === "PDF") {
        setCertificateDownloadType(true);
      } else {
        setCertificateDownloadType(false);
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CertificateVerification.address,
        CertificateVerification.abi,
        signer
      );

      const getCertficateHash = await contract.getHashByValue(hashValue);
      console.log("getCertficateHash" + getCertficateHash);
      setCertificateHash(getCertficateHash);
      toast.success("Certificate verified successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar isHomePage={false} />

      {/* Verify Certificate Container */}
      <div className="verify__cert__container">
        <h1>Verify Certificate</h1>
        <div className="input__container">
          <input
            type="text"
            placeholder="Paste your Hash ID here..."
            onChange={(e) => setHashValue(e.target.value)}
          />
          <BiSearch />
        </div>
        <button onClick={handleViewFile}>Submit</button>

        {certificateHash && (
          <>
            <div className="hash">
              <p>Certificate is Blockchain verified with hash ID:</p>

              <p
                onClick={() =>
                  window.open(
                    `https://gateway.pinata.cloud/ipfs/${certificateHash}`,
                    "_blank"
                  )
                }
              >
                {certificateHash}
              </p>
            </div>

            <div className="cert__preview__container">
              {certificateDownloadType === true ? (
                <iframe
                  src={`https://gateway.pinata.cloud/ipfs/${certificateHash}`}
                  title="My Certificate"
                ></iframe>
              ) : (
                <img
                  src={`https://gateway.pinata.cloud/ipfs/${certificateHash}`}
                  alt="Certificate"
                />
              )}

              <div>
                <BiCheck />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;
