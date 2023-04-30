import React from "react";
import "./GenerateCertificate.css";
import Navbar from "../../Components/Navbar/Navbar";

const GenerateCertificate = () => {
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
            />
          </div>
          <div>
            <label htmlFor="dateOfCompletion">Date Of Completion</label>
            <input type="date" id="dateOfCompletion" required />
          </div>
        </form>
        <div className="btns__container">
          <button>Generate and download as PDF</button>
          <button>Generate and download as PNG</button>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;
