import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // 🔹 Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // 🔹 Submit Form
  const handleSubmit = async (e) => {

    e.preventDefault();

    const { name, email, address, password, confirmPassword } = formData;

    // ✅ Validation
    if (!name || !email || !address || !password || !confirmPassword) {
      return setAlert({
        open: true,
        message: "Please fill all fields",
        severity: "warning"
      });
    }

    if (password !== confirmPassword) {
      return setAlert({
        open: true,
        message: "Passwords do not match",
        severity: "error"
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return setAlert({
        open: true,
        message: "Enter valid email",
        severity: "error"
      });
    }

    try {

      const res = await axios.post(
        "https://citivision-backend.onrender.com/api/User/addUser",
        formData
      );

      if (res.data.success) {

        setAlert({
          open: true,
          message: "Registration successful!",
          severity: "success"
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      }

    } catch (error) {

      setAlert({
        open: true,
        message:
          error.response?.data?.error ||
          "Email already registered or server error",
        severity: "error"
      });

    }

  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#F4F8FB",
        px: 2
      }}
    >

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "100%", md: "50%" },
          p: 4,
          borderRadius: 3,
          background: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}
      >

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#1E88E5",
            fontWeight: 700,
            mb: 4
          }}
        >
          User Registration
        </Typography>

        {/* Name */}
        <TextField
          id="name"
          label="Full Name"
          fullWidth
          sx={{ mb: 3 }}
          value={formData.name}
          onChange={handleChange}
        />

        {/* Email */}
        <TextField
          id="email"
          label="Email Address"
          fullWidth
          sx={{ mb: 3 }}
          value={formData.email}
          onChange={handleChange}
        />

        {/* Address */}
        <TextField
          id="address"
          label="Address"
          fullWidth
          sx={{ mb: 3 }}
          value={formData.address}
          onChange={handleChange}
        />

        {/* Password */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        {/* Confirm Password */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

        {/* Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            borderRadius: "25px",
            fontWeight: 600,
            background: "#1E88E5",
            "&:hover": {
              background: "#00E5FF",
              color: "black"
            }
          }}
        >
          Register
        </Button>

        {/* Alert */}
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

export default Registration;