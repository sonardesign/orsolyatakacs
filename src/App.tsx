import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BlogPage from "./components/PageTypes/BlogPage";
import "./styles/main.scss";
import HomePage from "./components/PageTypes/HomePage";
import Home from "./pages/Home";
import GeneralPage from "./components/PageTypes/GeneralPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/generic" element={<GeneralPage />} />
            <Route path="/blog/first" element={<BlogPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
