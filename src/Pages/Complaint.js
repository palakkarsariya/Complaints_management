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

  // 🔐 Check login token
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    pincode: "",
    description: "",
    image: null,
  });

  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  const categories = [
    "Road Damage",
    "Street Light",
    "Garbage Issue",
    "Water Supply",
    "Electricity",
    "Public Safety",
  ];

  // ❌ If no token → block complaint page
  if (!token) {
    return (
      <Box sx={{ textAlign: "center", mt: 12 }}>
        <Typography variant="h5" color="error" fontWeight={700}>
          ⚠ You must login to submit a complaint.
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 3, backgroundColor: "#1E88E5" }}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.location || !form.pincode || !form.description || !form.image) {
      setAlert({ open: true, message: "Please fill all fields.", severity: "warning" });
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const response = await axios.post(
        "http://localhost:1300/api/Comp/addComp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
      setAlert({
        open: true,
        message:
          error.response?.data?.error ||
          "Something went wrong. Try again later.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", minHeight: "90vh", margin:"60px 0px"}}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%" },
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          borderRadius: "12px",
          backgroundColor: "white",
          padding: "40px 30px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "#1E88E5", mb: 3, fontWeight: 700 }}
        >
          COMPLAINT FORM
        </Typography>

        <TextField name="name" label="Your Name" value={form.name} onChange={handleChange} fullWidth sx={{ mb: 3 }} />

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

        <TextField name="location" label="Enter Location" value={form.location} onChange={handleChange} fullWidth sx={{ mb: 3 }} />
        <TextField name="pincode" label="Enter Pincode" value={form.pincode} onChange={handleChange} fullWidth sx={{ mb: 3 }} />

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
          <input accept="image/*" type="file" onChange={handleImageChange} />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            height: "50px",
            fontSize: "16px",
            fontWeight: 600,
            backgroundColor: "#1E88E5",
          }}
        >
          Register Complaint
        </Button>

        <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Complaint;
