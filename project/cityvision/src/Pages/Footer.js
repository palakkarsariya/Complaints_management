import React from "react";
import { Box, Typography, Grid, Link, Divider } from "@mui/material";
import bg from ".././Assets/img/Footer/bg.jpg";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        pt: 8,
        pb: 4,
        px: { xs: 3, sm: 6, md: 10 },
      }}
    >
      <Grid container spacing={4}>
        {/* 🗺️ Locate Us */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            sx={{ color: "#00E5FF", fontWeight: 700, mb: 2 }}
          >
            Locate Us
          </Typography>
          <Typography sx={{ lineHeight: 1.8 }}>
            CityVision HQ – Smart City Office
            <br />
            Surat, Gujarat – 395001
            <br />
             Helpline: <b>1934</b> (24x7 Support)
            <br />
            Reach us for emergencies, feedback,<br/> or complaints.
          </Typography>
        </Grid>

        {/* 📱 Contact Us */}
        <Grid item xs={12} md={4} style={{margin:"0% 0% 0% 9%"}}>
          <Typography
            variant="h5"
            sx={{ color: "#00E5FF", fontWeight: 700, mb: 2 }}
          >
            Contact Us
          </Typography>
          <Typography sx={{ lineHeight: 1.8 }}>
            Connect with us on social media:
          </Typography>
          <Typography sx={{ lineHeight: 1.8, mt: 1 }}>
             Chatbot: <b>+91 8999 228 999</b> <br />
             Twitter:{" "}
            <Link
              href="#"
              underline="none"
              sx={{ color: "#00E5FF", fontWeight: 500 }}
            >
              @cityvision
            </Link>
            <br />
             Instagram:{" "}
            <Link
              href="#"
              underline="none"
              sx={{ color: "#00E5FF", fontWeight: 500 }}
            >
              @cityvision_in
            </Link>
            <br />
             Facebook:{" "}
            <Link
              href="#"
              underline="none"
              sx={{ color: "#00E5FF", fontWeight: 500 }}
            >
              @CityVisionOfficial
            </Link>
          </Typography>
        </Grid>

        {/* ℹ️ Information */}
        <Grid item xs={12} md={4} style={{margin:"0% 7%"}}>
          <Typography
            variant="h5"
            sx={{ color: "#00E5FF", fontWeight: 700, mb: 2 }}
          >
            Information
          </Typography>
          <Typography sx={{ lineHeight: 1.8 }}>
            Last updated on: <b>19 October, 2025</b>
            <br />
            Visitors Today:{" "}
            <span style={{ color: "#00E5FF", fontWeight: 600 }}>087,854</span>
            <br />
            Visitors Till Date:{" "}
            <span style={{ color: "#00E5FF", fontWeight: 600 }}>29,118,193</span>
            <br />
            Version: <b>v1.2.0</b>
          </Typography>
        </Grid>
      </Grid>

      {/* Divider line */}
      <Divider sx={{ my: 5, borderColor: "rgba(255,255,255,0.3)" }} />

      {/* Copyright Bar */}
      <Box
        sx={{
          textAlign: "center",
          color: "rgba(255,255,255,0.8)",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} <b>CityVision Smart City Portal</b>. All
        Rights Reserved. | Designed by Palak Karsaliya 💙
      </Box>
    </Box>
  );
};

export default Footer;
