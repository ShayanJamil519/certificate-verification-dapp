import React from "react";
import "./Certificate.css";

const Certificate = ({ data }) => {
  return (
    <div className="certificate">
      <iframe
        title="My Certificate"
        src={`https://gateway.pinata.cloud/ipfs/${data}`}
      ></iframe>
    </div>
  );
};

export default Certificate;
