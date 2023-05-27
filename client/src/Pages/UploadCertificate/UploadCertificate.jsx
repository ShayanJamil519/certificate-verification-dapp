import React, { useState } from "react";
import "./UploadCertificate.css";
import Navbar from "../../Components/Navbar/Navbar";

import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { toast } from "react-toastify";
import CertificateVerification from "../../CertificateVerification.json";
import useAccessControl from "../../utils/useAccessControl";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

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
  const hasAccess = useAccessControl();
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

  // Function to upload file and Send Email to student
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
      console.log("certificateHash: ", certificateHash);
      // setCertificateHash(certificateHash);

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
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success("Certificate uploaded successfully!");

        let studentName, studentEmail;
        if (
          localStorage.getItem("studentName") &&
          localStorage.getItem("studentEmail")
        ) {
          studentName = localStorage.getItem("studentName");
          studentEmail = localStorage.getItem("studentEmail");
        } else {
          return;
        }

        // // Production Environement
        const templateParams = {
          to_name: studentName,
          to_email: studentEmail,
          message: `We are thrilled to extend our warmest congratulations to you for successfully completing your course.  To view and download your certificate, simply click on the following link: [ https://certificate-generator-verifier.netlify.app/download_certificate/${certificateHash} ]. This secure and decentralized link ensures the integrity and immutability of your certificate, providing you with a reliable record of your accomplishment.  Additionally, to validate the authenticity of your microcredential, you can visit our website's verification page by clicking on this direct link: [ https://certificate-generator-verifier.netlify.app/verify_certificate ] and past your HashID [ ${certificateHash} ]. This page will allow you to confirm your certificate's details and ensure its validity for potential employers, colleagues, or other interested parties.       We commend your commitment to continuous learning and professional development. Your newly acquired skills and knowledge from the course will undoubtedly enhance your career prospects and contribute to your success.
      `,
        };

        // QmX6muprkU3oRQCQtarHrZhP7Y8xJGYKKNQ9pWUUwLXQbc
        // http://localhost:3000/download_certificate/QmX6muprkU3oRQCQtarHrZhP7Y8xJGYKKNQ9pWUUwLXQbc

        // Test Environement
        // const templateParams = {
        //   to_name: studentName,
        //   to_email: studentEmail,
        //   message: `We are thrilled to extend our warmest congratulations to you for successfully completing your course.  To view and download your certificate, simply click on the following link: [ http://localhost:3000/download_certificate/${certificateHash} ]. This secure and decentralized link ensures the integrity and immutability of your certificate, providing you with a reliable record of your accomplishment.  Additionally, to validate the authenticity of your microcredential, you can visit our website's verification page by clicking on this direct link: [ https://certificate-generator-verifier.netlify.app/verify_certificate ] and past your HashID [ ${certificateHash} ]. This page will allow you to confirm your certificate's details and ensure its validity for potential employers, colleagues, or other interested parties.       We commend your commitment to continuous learning and professional development. Your newly acquired skills and knowledge from the course will undoubtedly enhance your career prospects and contribute to your success.
        //   `,
        // };

        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
        emailjs

          .send(
            "service_x7393hg",
            "template_91gjr3s",
            templateParams,
            "zF2fKmlCZB5Z_fJKq"
          )
          .then(
            () => {
              toast.success("Email sent to student");
            },
            (error) => {
              toast.error(error.text);
            }
          );
      } else {
        toast.error("Transaction Failed");
      }

      // Sending Email to Student
      // await handleEmailSend(); // Wait for setCertificateHash to complete before sending email
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ======================================

  // ==========================

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
          {/* Upload Certificate Generator */}
          <div className="upload__cert__container">
            <h1>Upload Certificate</h1>
            <div className="input-container">
              <input
                type="file"
                id="file-input"
                onChange={handleFileSelection}
              />
              <label htmlFor="file-input">
                {fileSelected
                  ? "File selected successfully!"
                  : "Select your file"}
              </label>
            </div>
            <button onClick={handleFileUpload}>Upload File</button>
            {/* <button onClick={handleEmailSend}>Upload File</button> */}
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
      )}
    </>
  );
};

export default UploadCertificate;
