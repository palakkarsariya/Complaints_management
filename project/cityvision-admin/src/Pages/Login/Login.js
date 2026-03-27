import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const [alert,setAlert] = useState({
    open:false,
    message:"",
    severity:"success"
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e)=>{

    e.preventDefault();

    if(!formData.email || !formData.password){
      setAlert({
        open:true,
        message:"Please fill all fields",
        severity:"warning"
      });
      return;
    }

    try{

      setLoading(true);

      const res = await axios.post(
        "http://localhost:1300/api/admin/login",
        formData
      );

      localStorage.setItem("adminToken",res.data.token);
      localStorage.setItem("adminName",res.data.admin.name);

      setAlert({
        open:true,
        message:"Login successful",
        severity:"success"
      });

      setTimeout(()=>{
        navigate("/dash");
      },1000);

    }catch(error){

      setAlert({
        open:true,
        message:error.response?.data?.message || "Invalid credentials",
        severity:"error"
      });

    }finally{
      setLoading(false);
    }

  };

  return (

    <Box
      sx={{
        background:"#F4F8FB",
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        px:2
      }}
    >

      <Paper
        elevation={6}
        sx={{
          width:{xs:"100%",sm:"80%",md:"40%"},
          p:5,
          borderRadius:4,
          boxShadow:"0 8px 25px rgba(30,136,229,0.2)"
        }}
      >

        {/* Icon */}

        <Box sx={{textAlign:"center",mb:2}}>
          <LoginIcon sx={{fontSize:60,color:"#1E88E5"}}/>
        </Box>

        {/* Title */}

        <Typography
          variant="h4"
          sx={{
            textAlign:"center",
            fontWeight:700,
            color:"#1E88E5",
            mb:1
          }}
        >
          Admin Login
        </Typography>

        <Typography
          sx={{
            textAlign:"center",
            color:"#666",
            mb:4
          }}
        >
          Login to access CityVision Admin Dashboard
        </Typography>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <TextField
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            sx={{mb:3}}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text":"password"}
            fullWidth
            value={formData.password}
            onChange={handleChange}
            sx={{mb:2}}

            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton
                    onClick={()=>setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {/* Forgot Password */}

          <Box sx={{textAlign:"right",mb:3}}>
            <Link
              to="/forgot-password"
              style={{
                textDecoration:"none",
                color:"#1E88E5",
                fontWeight:500
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          {/* Login Button */}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              background:"#1E88E5",
              borderRadius:"25px",
              py:1.5,
              fontSize:"16px",
              fontWeight:600,
              "&:hover":{
                background:"#00E5FF",
                color:"black"
              }
            }}
          >

            {loading ? <CircularProgress size={24} color="inherit"/> : "Login"}

          </Button>

        </form>

      </Paper>

      {/* Alerts */}

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={()=>setAlert({...alert,open:false})}
      >
        <Alert severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>

    </Box>

  );

};

export default Login;