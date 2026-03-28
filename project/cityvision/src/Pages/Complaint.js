import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Complaint = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // 🔥 IMPORTANT

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    pincode: "",
    description: "",
    image: null,
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const categories = [
    "Road Damage",
    "Garbage Issue",
    "Water Supply",
    "Electricity",
  ];

  // Block if not logged in
  if (!token || !userId) {
    return (
      <Box sx={{ textAlign: "center", mt: 12 }}>
        <Typography variant="h5" color="error" fontWeight={700}>
          ⚠ You must login to submit a complaint.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleCloseAlert = () =>
    setAlert({ ...alert, open: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.category ||
      !form.location ||
      !form.pincode ||
      !form.description ||
      !form.image
    ) {
      setAlert({
        open: true,
        message: "Please fill all fields.",
        severity: "warning",
      });
      return;
    }

    try {
      const formData = new FormData();

      // Append all fields
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // 🔥 Append userId separately
      formData.append("userId", userId);

      const response = await axios.post(
        "https://citivision-backend.onrender.com/api/Comp/addComp",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAlert({
          open: true,
          message: "Complaint registered successfully!",
          severity: "success",
        });

        // Reset form
        setForm({
          name: "",
          category: "",
          location: "",
          pincode: "",
          description: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Complaint Error:", error);

      setAlert({
        open: true,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "90vh",
        mt: 6,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%" },
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: "white",
          p: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 3, fontWeight: 700 }}
        >
          Complaint Form
        </Typography>

        <TextField
          name="name"
          label="Your Name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          name="category"
          label="Complaint Category"
          select
          value={form.category}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="location"
          label="Location"
          value={form.location}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          name="pincode"
          label="Pincode"
          value={form.pincode}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1 }}>Upload Image</Typography>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </Box>

        <Button type="submit" variant="contained" fullWidth>
          Register Complaint
        </Button>

        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Complaint;