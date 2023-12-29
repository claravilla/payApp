import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Confirmation from "./pages/Confirmation";
import ErrorPage from "./pages/ErrorPage";
import ThreeDS from "./pages/ThreeDS";
import "@lego/skroll/css/skroll.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/redirect/:id" element={<ThreeDS />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
