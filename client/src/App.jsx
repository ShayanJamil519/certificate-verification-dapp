import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import GenerateCertificate from "./Pages/GenerateCertificate/GenerateCertificate";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/generate_certificate" element={<GenerateCertificate />} />
      </Routes>
    </div>
  );
}

export default App;
