import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("https://citivision-backend.onrender.com/api/Comp/getall");
      setComplaints(res.data); // Ensure backend returns array only
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Count based on status
  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const pending = complaints.filter((c) => c.status === "Pending").length;

  // Show latest 5 complaints in table
  const recentComplaints = complaints.slice(-5).reverse();

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F4F8FB",
        minHeight: "100vh",
        marginLeft: "230px",
        p: 4,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
        <Typography variant="h4" sx={{ color: "#1E88E5", fontWeight: 700, mb: 4 }}>
          Dashboard Overview
        </Typography>

        {/* 📊 Dynamic Summary Cards */}
        <Grid container spacing={3}>
          {[
            { title: "Total Reports", count: total, color: "#1E88E5" },
            { title: "Resolved", count: resolved, color: "green" },
            { title: "In Progress", count: inProgress, color: "#FF8C00" },
            { title: "Pending", count: pending, color: "red" },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Paper
                  elevation={5}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    color: "#fff",
                    backgroundColor: stat.color,
                    height: "100px",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {loading ? "..." : stat.count}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* 📋 Dynamic Recent Complaints Table */}
        <Typography
          variant="h5"
          sx={{ color: "#1E88E5", mt: 6, mb: 2, fontWeight: 700 }}
        >
          Recent Reported Issues
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#1E88E5" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "600" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600" }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600" }}>
                  Location
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {recentComplaints.map((issue, index) => (
                <TableRow key={issue._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{issue.category}</TableCell>
                  <TableCell>{issue.location}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        issue.status === "Resolved"
                          ? "green"
                          : issue.status === "Pending"
                          ? "red"
                          : "#FF8C00",
                      fontWeight: 600,
                    }}
                  >
                    {issue.status}
                  </TableCell>
                </TableRow>
              ))}

              {recentComplaints.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    No complaints found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
