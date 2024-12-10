import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BlogPage from "./components/PageTypes/BlogPage";
import DynamicPage from "./pages/DynamicPages";
import Home from "./pages/Home";
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<DynamicPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
