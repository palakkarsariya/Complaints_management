import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleClickShowPassword = () => setShowPass(!showPass);
  const handleClickShowConfirmPassword = () => setShowConfirmPass(!showConfirmPass);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPass || !confirmPass) {
      alert("Please fill all fields!");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:1300/api/reset-pass", {
        email,
        newPassword: newPass,
      });

      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F4F8FB",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: { xs: "100%", sm: "80%", md: "40%" },
          p: 5,
          borderRadius: 4,
          backgroundColor: "white",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <LockResetIcon sx={{ fontSize: 60, color: "#1E88E5" }} />
        </Box>

        <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: "#1E88E5" }}>
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <TextField
            label="Registered Email"
            fullWidth
            type="email"
            sx={{ mb: 3 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* New Password */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel>New Password</InputLabel>
            <OutlinedInput
              type={showPass ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>

          {/* Confirm Password */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              type={showConfirmPass ? "text" : "password"}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>

          {/* Update Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#1E88E5",
              py: 1.5,
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Update Password
          </Button>
        </form>

        <Typography sx={{ mt: 3, textAlign: "center" }}>
          <a href="/login" style={{ color: "#1E88E5", fontWeight: 600 }}>Back to Login</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
