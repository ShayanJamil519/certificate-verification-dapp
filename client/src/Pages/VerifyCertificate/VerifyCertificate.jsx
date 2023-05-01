import React from "react";
import "./VerifyCertificate.css";
import { BiSearch, BiCheck } from "react-icons/bi";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";

const VerifyCertificate = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar isHomePage={false} />

      {/* Verify Certificate Container */}
      <div className="verify__cert__container">
        <h1>Verify Certificate</h1>
        <div className="input__container">
          <input type="text" placeholder="Search..." />
          <BiSearch />
        </div>
        <button>Submit</button>
        <div className="hash">
          <p>Certificate is Blockchain verified with hash ID:</p>
          <Link to={"/"}>
            asfnalfnafnaiofaio92r19r1mafkmasfajfcvveeveerevqpfa-9qf-qq=
          </Link>
        </div>
        {/* Certificate Preview Container */}
        <div className="cert__preview__container">
          <img src="/assets/certificate__preview1.png" alt="Certificate" />
          <div>
            <BiCheck />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
