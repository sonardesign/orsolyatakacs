import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./styles/main.scss";
import HomePage from "./components/PageTypes/HomePage";
import GeneralPage from "./components/PageTypes/GeneralPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<GeneralPage />} />
            <Route path="/contact" element={<GeneralPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
