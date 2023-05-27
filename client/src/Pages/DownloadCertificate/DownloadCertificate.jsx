import React, { useRef } from "react";
import "./DownloadCertificate.css";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

// QmX6muprkU3oRQCQtarHrZhP7Y8xJGYKKNQ9pWUUwLXQbc

const DownloadCertificate = () => {
  const { hashID } = useParams();
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const handleDownload = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="download__certificate__container">
      <div className="go__back">
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
      <div className="certificate">
        <iframe
          ref={iframeRef}
          title="My Certificate"
          src={`https://gateway.pinata.cloud/ipfs/${hashID}`}
        ></iframe>
      </div>
      <div className="btn__container">
        <button
          onClick={() =>
            handleDownload(`https://gateway.pinata.cloud/ipfs/${hashID}`)
          }
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default DownloadCertificate;
