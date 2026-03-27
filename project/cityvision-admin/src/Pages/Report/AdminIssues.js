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

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Nav from "../Nav/Nav";

const AdminIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Issues
  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:1300/api/Comp/getall");
      setIssues(res.data);
    } catch (error) {
      console.log("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // ✅ Update Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:1300/api/Comp/update/${id}`, {
        status: newStatus,
      });

      // Update UI instantly
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, status: newStatus } : issue
        )
      );
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  // ✅ Delete Issue
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    try {
      await axios.delete(`http://localhost:1300/api/Comp/delete/${id}`);

      // Update UI
      setIssues(issues.filter((issue) => issue._id !== id));
    } catch (error) {
      console.log("Error deleting issue:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F8FB" }}>
      <Nav />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography
          variant="h4"
          sx={{ color: "#1E88E5", fontWeight: 700, textAlign: "center", mb: 5 }}
        >
          Reported Issues Management
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
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Image</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>Status</TableCell>
                  {/* <TableCell sx={{ color: "white", fontWeight: 600, textAlign: "center" }}>
                    Actions
                  </TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {issues.map((issue, index) => (
                  <TableRow key={issue._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{issue.name}</TableCell>
                    <TableCell>{issue.category}</TableCell>
                    <TableCell>{issue.location}</TableCell>

                    <TableCell>
                      <img
                        src={issue.image}
                        alt="issue"
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                      />
                    </TableCell>

                    <TableCell>

                    <Chip
                      label={issue.status}
                      sx={{
                        fontWeight: 600,
                        color: "white",
                        backgroundColor:
                          issue.status === "Resolved"
                            ? "green"
                            : issue.status === "In Progress"
                            ? "#FF8C00"
                            : "red",
                      }}
                    />

                  </TableCell>

                    {/* <TableCell sx={{ textAlign: "center" }}>
                      <IconButton color="primary">
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton color="error" onClick={() => handleDelete(issue._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Summary */}
        {!loading && (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Chip
              label={`Total Reports: ${issues.length}`}
              sx={{ backgroundColor: "#1E88E5", color: "#fff", mx: 1 }}
            />
            <Chip
              label={`Resolved: ${issues.filter((i) => i.status === "Resolved").length}`}
              sx={{ backgroundColor: "green", color: "#fff", mx: 1 }}
            />
            <Chip
              label={`In Progress: ${issues.filter((i) => i.status === "In Progress").length}`}
              sx={{ backgroundColor: "#FF8C00", color: "#fff", mx: 1 }}
            />
            <Chip
              label={`Pending: ${issues.filter((i) => i.status === "Pending").length}`}
              sx={{ backgroundColor: "red", color: "#fff", mx: 1 }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminIssues;
