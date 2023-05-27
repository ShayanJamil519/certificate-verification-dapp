import React, { useRef } from "react";
import "./DownloadCertificate.css";
import { useParams, useNavigate } from "react-router-dom";

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
        <p>
          To download a certificate : <br />
          As PDF: Click on download certificate button and it will navigate to
          new page then click on download icon <br />
          As PNG: Click on download certificate button and it will navigate to
          new page then right click on certificate
        </p>
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
