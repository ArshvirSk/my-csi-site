import { AnimatePresence } from "framer-motion";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Navigation } from "./components/Navigation";
import ShiningStars from "./components/ShiningStars";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Events } from "./pages/Events";
import { Gallery } from "./pages/Gallery";
import { Home } from "./pages/Home";
import { Membership } from "./pages/Membership";
import { NotFound } from "./pages/NotFound";
import { Sponsors } from "./pages/Sponsors";
import { Team } from "./pages/Team";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#0f0f0f] text-white">
        <ShiningStars count={50} />
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
