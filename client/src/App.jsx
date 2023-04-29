import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import GenerateCertificate from "./Pages/GenerateCertificate/GenerateCertificate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/generate_certificate" element={<GenerateCertificate />} />
      </Routes>
    </div>
  );
}

export default App;
