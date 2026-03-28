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
import axios from "axios";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  // ✅ Form data
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    address:"",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  // ✅ Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Alerts
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Submit handler
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setAlert({ open: true, message: "Please fill all fields.", severity: "warning" });
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setAlert({ open: true, message: "Passwords do not match!", severity: "error" });
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setAlert({ open: true, message: "Please enter a valid email address.", severity: "error" });
      return;
    }

    try{
      const response = await axios.post(
        "https://citivision-backend.onrender.com/api/User/addUser",
        formData,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      if(response.data.success){
         setAlert("✅ Registration successful! You can now login.");
        setTimeout(() => navigate("/login"), 1500);
      }
    }catch (error) {
      if (error.response && !error.response.data.success) {
        setAlert(`❌ ${error.response.data.error || "Email already registered!"}`);
      } else {
        setAlert("❌ Something went wrong. Try again later.");
      }
    }

  };

  // ✅ Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "#F4F8FB",
        py: 6,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "60%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          borderRadius: "10px",
          backgroundColor: "white",
          padding: "4% 3%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: "#1E88E5",
            fontWeight: 700,
            mb: 4,
            letterSpacing: 1,
          }}
        >
          USER REGISTRATION
        </Typography>

        {/* Name Field */}
        <TextField
          id="name"
          label="Enter name"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          value={formData.name}
          onChange={handleChange}
        />
        {/* Email Field */}
        <TextField
          id="email"
          label="Enter Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          value={formData.email}
          onChange={handleChange}
        />
        {/* address Field */}
        <TextField
          id="address"
          label="Enter address"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          value={formData.address}
          onChange={handleChange}
        />

        {/* Password Field */}
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        {/* Confirm Password Field */}
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                  aria-label="toggle confirm password visibility"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#1E88E5",
            color: "white",
            fontWeight: 600,
            borderRadius: "25px",
            py: 1.5,
            fontSize: "16px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#00E5FF", color: "black" },
          }}
        >
          Register Now
        </Button>

        {/* Snackbar Alert */}
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={alert.severity} onClose={handleCloseAlert}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Registration;
