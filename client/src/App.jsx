import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import GenerateCertificate from "./Pages/GenerateCertificate/GenerateCertificate";
import UploadCertificate from "./Pages/UploadCertificate/UploadCertificate";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/generate_certificate" element={<GenerateCertificate />} />
        <Route path="/upload_certificate" element={<UploadCertificate />} />
      </Routes>
    </div>
  );
}

export default App;
