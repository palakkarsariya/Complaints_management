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
  TextField,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UsersPage = () => {
  const navigate = useNavigate();   // ✅ FIXED

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://citivision-backend.onrender.com/api/User/allUser");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`https://citivision-backend.onrender.com/api/User/delete/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F4F7FA", minHeight: "100vh", padding: "40px 20px", ml: "230px" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#1565C0", textAlign: "center", mb: 4 }}>
        Manage Users
      </Typography>

      {/* Search */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          sx={{ width: "60%", backgroundColor: "white", borderRadius: 2 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Loader */}
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ width: "90%", margin: "0 auto", borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1565C0" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 600, textAlign: "center" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users
                .filter(
                  (u) =>
                    u.name?.toLowerCase().includes(search.toLowerCase()) ||
                    u.email?.toLowerCase().includes(search.toLowerCase())
                )
                .map((user, index) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton color="primary">
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton color="success" onClick={() => navigate(`/edit-user/${user._id}`)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton color="error" onClick={() => handleDelete(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UsersPage;
