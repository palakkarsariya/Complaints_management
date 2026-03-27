import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
  Snackbar,
  Alert
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";

const ContactUs = () => {

  const [form,setForm] = useState({
    name:"",
    email:"",
    subject:"",
    message:""
  });

  const [alert,setAlert] = useState({
    open:false,
    message:"",
    severity:"success"
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async()=>{

    if(!form.name || !form.email || !form.subject || !form.message){
      setAlert({
        open:true,
        message:"Please fill all fields",
        severity:"warning"
      });
      return;
    }

    try{

      await axios.post(
        "http://localhost:1300/api/message/send",
        form
      );

      setAlert({
        open:true,
        message:"Message sent successfully!",
        severity:"success"
      });

      setForm({
        name:"",
        email:"",
        subject:"",
        message:""
      });

    }catch(error){

      setAlert({
        open:true,
        message:"Error sending message",
        severity:"error"
      });

    }

  };

  return (
    <Box sx={{ py:8, px:{xs:3, md:10} }}>

      {/* Title */}

      <Typography
        variant="h4"
        sx={{
          color:"#1E88E5",
          fontWeight:700,
          textAlign:"center",
          mb:6
        }}
      >
        Contact Us
      </Typography>

      <Grid container spacing={5}>

        {/* Contact Info */}

        <Grid item xs={12} md={5}>

          <Paper sx={{p:4,borderRadius:3,width:"170vh"}}>

            <Typography variant="h6" sx={{mb:3,color:"#1E88E5"}}>
              Get In Touch
            </Typography>

            <Typography sx={{mb:3}}>
              Have questions, suggestions, or need help with CityVision?
              We’re here to assist you.
            </Typography>

            <Box sx={{display:"flex",alignItems:"center",mb:2}}>
              <LocationOnIcon sx={{mr:2,color:"#1E88E5"}}/>
              <Typography>
                CityVision HQ, Surat, Gujarat – 395001
              </Typography>
            </Box>

            <Box sx={{display:"flex",alignItems:"center",mb:2}}>
              <PhoneIcon sx={{mr:2,color:"#1E88E5"}}/>
              <Typography>Helpline: 1934</Typography>
            </Box>

            <Box sx={{display:"flex",alignItems:"center",mb:2}}>
              <EmailIcon sx={{mr:2,color:"#1E88E5"}}/>
              <Typography>
                <Link
                  href="mailto:support@cityvision.in"
                  sx={{textDecoration:"none"}}
                >
                  support@cityvision.in
                </Link>
              </Typography>
            </Box>

            <Box sx={{display:"flex",alignItems:"center"}}>
              <AccessTimeIcon sx={{mr:2,color:"#1E88E5"}}/>
              <Typography>Mon - Sat : 9 AM - 7 PM</Typography>
            </Box>

          </Paper>

        </Grid>

        {/* Contact Form */}

        <Grid item xs={12} md={7}>

          <Paper sx={{p:4,borderRadius:3}}>

            <Typography variant="h6" sx={{mb:3,color:"#1E88E5"}}>
              Send Us a Message
            </Typography>

            <TextField
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              sx={{mb:3}}
            />

            <TextField
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              sx={{mb:3}}
            />

            <TextField
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              fullWidth
              sx={{mb:3}}
            />

            <TextField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              sx={{mb:3}}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                backgroundColor:"#1E88E5",
                borderRadius:"25px",
                py:1.5,
                fontSize:"16px",
                "&:hover":{
                  backgroundColor:"#00E5FF",
                  color:"black"
                }
              }}
            >
              Send Message
            </Button>

          </Paper>

        </Grid>

      </Grid>

      {/* Map */}

      <Box
        sx={{
          mt:8,
          borderRadius:"15px",
          overflow:"hidden"
        }}
      >
        <iframe
          title="CityVision Location"
          src="https://www.google.com/maps?q=surat&output=embed"
          width="100%"
          height="400"
          style={{border:0}}
          loading="lazy"
        />
      </Box>

      {/* Alert */}

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

export default ContactUs;