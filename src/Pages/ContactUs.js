import React from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ContactUs = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 3, md: 10 },
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          color: "#1E88E5",
          fontWeight: 700,
          textAlign: "center",
          mb: 6,
          letterSpacing: 1,
        }}
      >
        Contact Us
      </Typography>

      <Grid container spacing={5}>
        {/* 📍 Contact Info */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: "white",
              height: "100%",
              width:"183vh"
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#1E88E5", fontWeight: 600, mb: 2 }}
            >
              Get In Touch
            </Typography>

            <Typography sx={{ lineHeight: 1.8, mb: 3 }}>
              Have questions, suggestions, or need help with CityVision?  
              We’re here to assist you 24/7.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon sx={{ color: "#1E88E5", mr: 2 }} />
              <Typography>
                CityVision HQ, Smart City Office,
                <br /> Surat, Gujarat – 395001
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon sx={{ color: "#1E88E5", mr: 2 }} />
              <Typography>Helpline: 1934 (24x7)</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ color: "#1E88E5", mr: 2 }} />
              <Typography>
                Email:{" "}
                <Link
                  href="mailto:support@cityvision.in"
                  sx={{ color: "#00E5FF", textDecoration: "none" }}
                >
                  support@cityvision.in
                </Link>
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon sx={{ color: "#1E88E5", mr: 2 }} />
              <Typography>Working Hours: Mon - Sat, 9 AM - 7 PM</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 📝 Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#1E88E5", fontWeight: 600, mb: 3 }}
            >
              Send Us a Message
            </Typography>

            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1E88E5",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "25px",
                py: 1.5,
                fontSize: "16px",
                "&:hover": { backgroundColor: "#00E5FF", color: "black" },
              }}
              onClick={() => alert("Your message has been sent!")}
            >
              Send Message
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* 🌍 Google Map Section */}
      <Box
        sx={{
          mt: 8,
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        }}
      >
        <iframe
          title="CityVision Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3212218286494!2d72.83106131479747!3d21.170240885927404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e5a8d9d4a17%3A0x5a6d9c3ee99d31c4!2sSurat%20Municipal%20Corporation!5e0!3m2!1sen!2sin!4v1697025519553!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Box>
    </Box>
  );
};

export default ContactUs;
