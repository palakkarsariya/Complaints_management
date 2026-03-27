import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch user details
  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:1300/api/User/users/${id}`);
      setForm(res.data);
    } catch (error) {
      console.log("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:1300/api/User/edit/${id}`, form);
      alert("User Updated Successfully!");
      navigate("/users");
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <Box sx={{ padding: "40px", width: "60%", margin: "0 auto" }}>
      <Typography variant="h4" mb={4}>
        Edit User
      </Typography>

      <TextField
        fullWidth
        label="Name"
        margin="normal"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <TextField
        fullWidth
        label="Address"
        margin="normal"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <Button
        variant="contained"
        color="success"
        sx={{ mt: 3 }}
        onClick={handleUpdate}
      >
        Update User
      </Button>
    </Box>
  );
};

export default EditUser;
