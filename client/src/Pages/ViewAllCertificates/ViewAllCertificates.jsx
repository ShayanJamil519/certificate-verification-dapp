import React, { useState, useEffect } from "react";
import "./ViewAllCertificates.css";
import Navbar from "../../Components/Navbar/Navbar";
import Certificate from "../../Components/ViewAllCertificates/Certificate";
import CertificateVerification from "../../CertificateVerification.json";
import { ethers } from "ethers";
import Pagination from "../../Components/Pagination/Pagination";
import useAccessControl from "../../utils/useAccessControl";
import { Link } from "react-router-dom";

const ViewAllCertificates = () => {
  const hasAccess = useAccessControl();
  const [allCertificates, setAllCertificates] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCertificates.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = allCertificates.length > itemsPerPage ? true : false;

  useEffect(() => {
    const fetchAllCertificates = async () => {
      // Connect to the contract using ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CertificateVerification.address,
        CertificateVerification.abi,
        signer
      );

      const allCertificates = await contract.getAllHashes();
      console.log("allCertificates " + allCertificates);

      setAllCertificates(allCertificates);
    };

    fetchAllCertificates();
  }, [allCertificates]);

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
        <>
          <div>
            <Navbar isHomePage={false} />
          </div>
          <div className="view__all__certificates__container">
            <h1>View All Certificates</h1>
            <div className="all__certificates">
              {currentItems.map((data, i) => (
                <Certificate data={data} key={i} />
              ))}
            </div>
            {showPagination && (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={allCertificates.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ViewAllCertificates;
