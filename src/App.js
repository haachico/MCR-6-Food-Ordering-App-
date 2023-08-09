import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DetailsPage from "./Pages/Detailspage";
import Header from "./Components/Header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}
