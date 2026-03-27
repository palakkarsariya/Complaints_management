import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Pages/Header";
import Footer from "./Pages/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Complaint from "./Pages/Complaint";
import AboutcityVision from "./Pages/AboutcityVision";
import Feedback from "./Pages/Feedback";
import ContactUs from "./Pages/ContactUs";
import ForgotPassword from "./Pages/ForgotPassword";
import MapDashboard from "./Pages/MapDashboard";
import Profile from "./Pages/Profile";
import Review from "./Pages/Review";

function App() {
  return (
    <Router>
      <Header />

      {/* All Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/report" element={<Complaint />} />
        <Route path="/review" element={<Review />} />
        <Route path="/about" element={<AboutcityVision/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/map" element={<MapDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
