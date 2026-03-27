import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MapDashboard from "./pages/MapDashboard";
import AllComplaints from "./pages/Complaint";

import ProtectedRoute from "./routes/ProtectedRoute";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}

        <Route path="/login" element={<Login />} />

        {/* Protected Pages */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Sidebar />
              <div style={{ marginLeft: "220px" }}>
                <Navbar />
                <Dashboard />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              {/* <Sidebar /> */}
              {/* <div style={{ marginLeft: "220px" }}> */}
              {/* <Navbar /> */}
              {/* </div> */}
              <AllComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Sidebar />
              <div style={{ marginLeft: "220px" }}>
                <Navbar />
                <MapDashboard />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
