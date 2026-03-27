import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import BusinessIcon from "@mui/icons-material/Business";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:1300/api/auth/login",
        { email, password }
      );

      if (res.data.success) {

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("department", res.data.department);
        localStorage.setItem("zone", res.data.zone);
        
        navigate("/");

      }

    } catch (error) {

      alert("Login failed");

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2
      }}
    >

      <Paper
        elevation={10}
        sx={{
          padding: 5,
          width: { xs: "100%", sm: 400 },
          borderRadius: 4,
          boxShadow: "0 10px 35px rgba(0,0,0,0.25)"
        }}
      >

        {/* Icon */}

        <Box sx={{ textAlign: "center", mb: 2 }}>
          <BusinessIcon sx={{ fontSize: 60, color: "#1E88E5" }} />
        </Box>

        {/* Title */}

        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="#1E88E5"
          mb={1}
        >
          Department Login
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={4}
        >
          Access your department dashboard
        </Typography>

        {/* Form */}

        <form onSubmit={handleLogin}>

          <TextField
            label="Department Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: "25px",
              backgroundColor: "#1E88E5",
              "&:hover": {
                backgroundColor: "#00E5FF",
                color: "black"
              }
            }}
          >
            Login
          </Button>

        </form>

      </Paper>

    </Box>

  );

};

export default Login;