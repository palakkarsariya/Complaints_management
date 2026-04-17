import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const Profile = () => {

  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // 🔒 Redirect if not logged in
    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const fetchComplaints = async () => {
      try {

        const res = await axios.get(
          `https://citivision-backend.onrender.com/api/Comp/user/${userId}`
        );

        console.log("API RESPONSE:", res.data);

        // ✅ Handle both API formats (array or object)
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.complaints)
          ? res.data.complaints
          : [];

        setComplaints(data);

      } catch (error) {

        console.log("Error fetching complaints:", error);
        setComplaints([]);

      }
    };

    fetchComplaints();

  }, [navigate]);

  /* ===============================
     🚪 Logout
  =============================== */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (

    <Box sx={{ p: 6, background: "#F4F8FB", minHeight: "90vh" }}>

      {/* ================= Profile Card ================= */}

      <Paper sx={{ p: 4, mb: 5, borderRadius: 3 }}>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>

            <Avatar sx={{ width: 70, height: 70, bgcolor: "#1E88E5" }}>
              {email?.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography variant="h6">{email}</Typography>
              <Typography color="text.secondary">
                Registered Citizen
              </Typography>
            </Box>

          </Box>

          {/* Logout Button */}
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              background: "#d32f2f",
              "&:hover": { background: "#b71c1c" }
            }}
          >
            Logout
          </Button>

        </Box>

      </Paper>

      {/* ================= Complaints Table ================= */}

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        My Complaints
      </Typography>

      <TableContainer component={Paper}>

        <Table>

          <TableHead sx={{ background: "#1E88E5" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Category</TableCell>
              <TableCell sx={{ color: "white" }}>Location</TableCell>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {/* ✅ Safe Rendering */}
            {Array.isArray(complaints) && complaints.length > 0 ? (

              complaints.map((c) => (
                <TableRow key={c._id}>

                  <TableCell>{c.category}</TableCell>
                  <TableCell>{c.location}</TableCell>

                  <TableCell>
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={c.status || "Pending"}
                      sx={{
                        backgroundColor:
                          c.status === "Resolved"
                            ? "green"
                            : c.status === "In Progress"
                            ? "#FF8C00"
                            : "red",
                        color: "white"
                      }}
                    />
                  </TableCell>

                </TableRow>
              ))

            ) : (

              <TableRow>
                <TableCell colSpan={4} align="center">
                  No complaints registered yet.
                </TableCell>
              </TableRow>

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>
  );
};

export default Profile;