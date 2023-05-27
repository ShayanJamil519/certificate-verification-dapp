import React, { useState, useRef } from "react";
import "./GenerateCertificate.css";
import Navbar from "../../Components/Navbar/Navbar";

import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useAccessControl from "../../utils/useAccessControl";
import { Link } from "react-router-dom";

const GenerateCertificate = () => {
  const hasAccess = useAccessControl();
  const [registeredID, setRegisteredID] = useState("");
  const [certificateHolderName, setCertificateHolderName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [certificateCompletionDate, setCerticateCompletionData] = useState("");
  const certificateRef = useRef(null);

  // Function to download Certificate as PNG File
  const handleCertificateDownloadPNG = () => {
    // Checking if someone clicks generate certicate submit button without entering all fields to make sure it gives error
    if (
      !certificateName ||
      !certificateHolderName ||
      !certificateCompletionDate ||
      !registeredID ||
      !studentEmail
    ) {
      toast.error("Please enter all fields to generate the certificate");
      return;
    }

    localStorage.setItem("studentName", certificateHolderName);
    localStorage.setItem("studentEmail", studentEmail);

    // Donwload file as PNG
    html2canvas(certificateRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = imgData;
      link.click();
    });
  };

  // Function to download Certificate as PDF
  const handleCertificateDownloadPDF = () => {
    // Checking if someone clicks generate certicate submit button without entering all fields to make sure it gives error
    if (
      !certificateName ||
      !certificateHolderName ||
      !certificateCompletionDate ||
      !registeredID ||
      !studentEmail
    ) {
      toast.error("Please enter all fields to generate the certificate");
      return;
    }

    localStorage.setItem("studentName", certificateHolderName);
    localStorage.setItem("studentEmail", studentEmail);

    // Donwload file as PDF
    const input = certificateRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", [512, 512]);
      pdf.addImage(imgData, "PNG", 0, 0, 512, 512);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <>
      {!hasAccess ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <h1>You are not authorized to access this page</h1>
          <Link to={"/"}>Back</Link>
        </div>
      ) : (
        <div>
          {/* Navbar */}
          <Navbar isHomePage={false} />
          {/* Generate Certificate Container */}
          <div className="cert__gen__container">
            <h1>Certificate Generation</h1>
            <h6>Fill in all student's details</h6>
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="e.g: johndaud@gmail.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="registeredID">Registered Id</label>
                <input
                  type="text"
                  id="registeredID"
                  required
                  placeholder="e.g: 001122334455"
                  value={registeredID}
                  onChange={(e) => setRegisteredID(e.target.value)}
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
                <input
                  type="date"
                  id="dateOfCompletion"
                  required
                  value={certificateCompletionDate}
                  onChange={(e) => setCerticateCompletionData(e.target.value)}
                />
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

                <p
                  style={{
                    marginBottom: "25px",
                    fontSize: "16px",
                    fontStyle: "normal",
                  }}
                >
                  Registered ID:
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {registeredID}
                  </span>
                </p>

                <p>This certifies that</p>
                <h1>{certificateHolderName}</h1>
                <p>has successfully completed the:</p>
                <h2>{certificateName}</h2>
                <h3>
                  built in partnership with & endorsed by University Kuala
                  Lumpur
                </h3>
                <p
                  style={{
                    marginTop: "35px",
                    fontSize: "18px",
                    fontStyle: "normal",
                  }}
                >
                  Completion Date:
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "20px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {certificateCompletionDate}
                  </span>
                </p>
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
      )}
    </>
  );
};

export default GenerateCertificate;
