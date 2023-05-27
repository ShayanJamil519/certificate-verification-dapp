import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import GenerateCertificate from "./Pages/GenerateCertificate/GenerateCertificate";
import UploadCertificate from "./Pages/UploadCertificate/UploadCertificate";
import VerifyCertificate from "./Pages/VerifyCertificate/VerifyCertificate";
import ViewAllCertificates from "./Pages/ViewAllCertificates/ViewAllCertificates";
import DownloadCertificate from "./Pages/DownloadCertificate/DownloadCertificate";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/generate_certificate" element={<GenerateCertificate />} />
        <Route path="/upload_certificate" element={<UploadCertificate />} />
        <Route
          path="/view_all_certificates"
          element={<ViewAllCertificates />}
        />

        <Route path="/verify_certificate" element={<VerifyCertificate />} />
        <Route
          path="/download_certificate/:hashID"
          element={<DownloadCertificate />}
        />
      </Routes>
    </div>
  );
}

export default App;
