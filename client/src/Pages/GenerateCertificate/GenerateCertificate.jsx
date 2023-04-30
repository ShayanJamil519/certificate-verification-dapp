import React, { useState } from "react";
import "./GenerateCertificate.css";
import html2canvas from "html2canvas";
// import html2pdf from "html2pdf.js";
import Navbar from "../../Components/Navbar/Navbar";

const GenerateCertificate = () => {
  const [certificateHolderName, setCertificateHolderName] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const certificate = document.getElementById("certificate");

  const handleCertificateDownloadPNG = () => {
    html2canvas(certificate).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = imgData;
      link.click();
    });
  };

  // const handleCertificateDownloadPDF = () => {
  //   const options = {
  //     margin: 0,
  //     filename: "certificate.pdf",
  //     image: { type: "png", quality: 1 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //   };

  //   html2pdf().set(options).from(certificate).save();
  // };

  return (
    <div>
      {/* Navbar */}
      <Navbar isHomePage={false} />
      {/* Generate Certificate Container */}
      <div className="cert__gen__container">
        <h1>Certificate Generation</h1>
        <h6>Fill in all details</h6>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              placeholder="e.g: John Daud"
              value={certificateHolderName}
              onChange={(e) => setCertificateHolderName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="registeredID">Registered Id</label>
            <input
              type="number"
              id="registeredID"
              required
              placeholder="e.g: 001122334455"
            />
          </div>
          <div>
            <label htmlFor="credentials">Credentials</label>
            <input
              type="text"
              id="credentials"
              required
              placeholder="e.g: Certified Ethical Hacker - Academia (PCP)"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dateOfCompletion">Date Of Completion</label>
            <input type="date" id="dateOfCompletion" required />
          </div>
        </form>
        <div className="btns__container">
          {/* <button onClick={handleCertificateDownloadPDF}>
            Generate and download as PDF
          </button> */}
          <button>Generate and download as PDF</button>
          <button onClick={handleCertificateDownloadPNG}>
            Generate and download as PNG
          </button>
        </div>
      </div>

      {/* Certificate Preview Container */}
      <div className="certificate__preview__container">
        <h1>Certificate Preview</h1>
        <div className="certificate__preview" id="certificate">
          <div className="name__container">
            <h1>{certificateHolderName}</h1>
          </div>
          <div className="credentials__container">
            <h2>{certificateName}</h2>
            <h3>
              built in partnership with & endorsed by University Kuala Lumpur
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;

// Certified Ethical Hacker - Academia (PCP)
