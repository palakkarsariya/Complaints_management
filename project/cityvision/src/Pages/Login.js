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
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setAlert({ open: true, message: "Please fill in all fields", severity: "warning" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:1300/api/User/loginUser", formData);

      if (response.data.success) {
        // Save token for authenticated routes
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("email", response.data.user.email);
        setAlert({
          open: true,
          message: "✅ Login successful! Redirecting...",
          severity: "success",
        });

        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      setAlert({
        open: true,
        message:
          error.response?.data?.error || "❌ Invalid credentials. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        margin: "5% 0%",
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
          USER LOGIN
        </Typography>

        {/* Email */}
        <TextField
          id="email"
          label="Enter Email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          sx={{ margin: "2% 0% 3% 0%" }}
        />

        {/* Password */}
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
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        {/* Login Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            width: "100%",
            height: "50px",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            backgroundColor: "#1E88E5",
            borderRadius: "25px",
            "&:hover": { backgroundColor: "#1565C0" },
            mb: 2,
          }}
        >
          Login Now
        </Button>

        {/* Extra Options */}
        <Box
          sx={{
            textAlign: "center",
            fontSize: "14px",
            color: "#555",
            mt: 2,
          }}
        >
          <p>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#1E88E5", fontWeight: 600, cursor: "pointer" }}
            >
              Register here
            </span>
          </p>
          <span
            onClick={() => navigate("/forgot-password")}
            style={{ color: "#1E88E5", cursor: "pointer" }}
          >
            Forgot Password?
          </span>
        </Box>

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

export default Login;
