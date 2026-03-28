import React, { useEffect, useState } from "react";
import axios from "axios";

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
  IconButton,
  MenuItem,
  Select,
  Chip,
  CircularProgress
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import Nav from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const DepartmentComplaints = () => {

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Fetch Department Complaints */

  const fetchIssues = async () => {

    try {

      const department = localStorage.getItem("department");
      const zone = localStorage.getItem("zone");

      const res = await axios.get(
        "https://citivision-backend.onrender.com/api/Comp/department",
        {
          params: {
            category: department,
            zone: zone
          }
        }
      );

      setIssues(res.data);

    } catch (error) {

      console.log("Error fetching complaints:", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchIssues();
  }, []);

  /* Update Complaint Status */

  const handleStatusChange = async (id, newStatus) => {

    try {

      await axios.put(
        `https://citivision-backend.onrender.com/api/Comp/update/${id}`,
        { status: newStatus }
      );

      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, status: newStatus } : issue
        )
      );

    } catch (error) {

      console.log("Error updating status:", error);

    }

  };

  return (

    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F8FB" }}>

      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>

        <Nav />

        <Box sx={{ p: 4 }}>

          <Typography
            variant="h4"
            sx={{ color: "#1E88E5", fontWeight: 700, textAlign: "center", mb: 5 }}
          >
            Department Complaints
          </Typography>

          {loading ? (

            <Box sx={{ textAlign: "center", mt: 5 }}>
              <CircularProgress />
            </Box>

          ) : (

            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>

              <Table>

                <TableHead sx={{ backgroundColor: "#1E88E5" }}>

                  <TableRow>

                    <TableCell sx={{ color: "white", fontWeight: 600 }}>ID</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>Location</TableCell>
                    {/* <TableCell sx={{ color: "white", fontWeight: 600 }}>Image</TableCell> */}
                    <TableCell sx={{ color: "white", fontWeight: 600 }}>Status</TableCell>
                    {/* <TableCell sx={{ color: "white", fontWeight: 600 }}>Action</TableCell> */}

                  </TableRow>

                </TableHead>

                <TableBody>

                  {issues.map((issue, index) => (

                    <TableRow key={issue._id} hover>

                      <TableCell>{index + 1}</TableCell>

                      <TableCell>{issue.name}</TableCell>

                      <TableCell>{issue.category}</TableCell>

                      <TableCell>{issue.location}</TableCell>

                      {/* <TableCell>

                        <img
                          src={issue.image}
                          alt="issue"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                            objectFit: "cover"
                          }}
                        />

                      </TableCell> */}

                      <TableCell>

                        <Select
                          value={issue.status}
                          onChange={(e) =>
                            handleStatusChange(issue._id, e.target.value)
                          }
                          size="small"
                          sx={{
                            fontWeight: 600,
                            color:
                              issue.status === "Resolved"
                                ? "green"
                                : issue.status === "In Progress"
                                ? "#FF8C00"
                                : "red",
                          }}
                        >

                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="In Progress">In Progress</MenuItem>
                          <MenuItem value="Resolved">Resolved</MenuItem>

                        </Select>

                      </TableCell>

                      {/* <TableCell>

                        <IconButton color="primary">
                          <VisibilityIcon />
                        </IconButton>

                      </TableCell> */}

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            </TableContainer>

          )}

          {/* Statistics */}

          {!loading && (

            <Box sx={{ textAlign: "center", mt: 5 }}>

              <Chip
                label={`Total Complaints: ${issues.length}`}
                sx={{ backgroundColor: "#1E88E5", color: "#fff", mx: 1 }}
              />

              <Chip
                label={`Resolved: ${issues.filter(i => i.status === "Resolved").length}`}
                sx={{ backgroundColor: "green", color: "#fff", mx: 1 }}
              />

              <Chip
                label={`In Progress: ${issues.filter(i => i.status === "In Progress").length}`}
                sx={{ backgroundColor: "#FF8C00", color: "#fff", mx: 1 }}
              />

              <Chip
                label={`Pending: ${issues.filter(i => i.status === "Pending").length}`}
                sx={{ backgroundColor: "red", color: "#fff", mx: 1 }}
              />

            </Box>

          )}

        </Box>

      </Box>

    </Box>

  );

};

export default DepartmentComplaints;