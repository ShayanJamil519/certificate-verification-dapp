import React, { useState, useRef } from "react";
import "./GenerateCertificate.css";
import { toast } from "react-toastify";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "../../Components/Navbar/Navbar";

const GenerateCertificate = () => {
  const [certificateHolderName, setCertificateHolderName] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const certificateRef = useRef(null);

  const handleCertificateDownloadPNG = () => {
    if (!certificateName || !certificateHolderName) {
      toast.error("Please enter all fields to generate the certificate");
      return;
    }

    localStorage.setItem("certificateDownloadType", "PNG");

    html2canvas(certificateRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "Certificate.png";
      link.href = imgData;
      link.click();
    });
  };

  const handleCertificateDownloadPDF = () => {
    if (!certificateName || !certificateHolderName) {
      toast.error("Please enter all fields to generate the certificate");
      return;
    }

    localStorage.setItem("certificateDownloadType", "PDF");

    const input = certificateRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // const pdf = new jsPDF("p", "mm", "a4");
      // const imgProps = pdf.getImageProperties(imgData);
      // const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Create new jsPDF instance with orientation 'p' (portrait)
      const pdf = new jsPDF("p", "px", [512, 512]);

      // Add the image to the PDF document and set the width and height to match the image size
      pdf.addImage(imgData, "PNG", 0, 0, 512, 512);

      // pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save("Certificate.pdf");
    });
  };

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
          <button onClick={handleCertificateDownloadPDF}>
            Generate and download as PDF
          </button>
          {/* <button>Generate and download as PDF</button> */}
          <button onClick={handleCertificateDownloadPNG}>
            Generate and download as PNG
          </button>
        </div>
      </div>

      {/* Certificate Preview Container */}
      <div className="certificate__preview__container">
        <h1>Certificate Preview</h1>
        <div className="certificate__preview" ref={certificateRef}>
          <div className="content__container">
            <h4>CERTIFICATE OF COMPLETION</h4>
            <p>This certifies that</p>
            <h1>{certificateHolderName}</h1>
            <p>has successfully completed the:</p>
            <h2>{certificateName}</h2>
            <h3>
              built in partnership with & endorsed by University Kuala Lumpur
            </h3>
          </div>
          <div className="logo__container">
            <img src="/assets/UniKL_logo.png" alt="Logo" />
            <div>
              <h4>Universiti Kuala Lumpur (UniKL)</h4>
              <p>Center for Advancement & Continuing Education (ACE)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;
