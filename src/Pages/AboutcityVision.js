import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import CityImage from "../Assets/img/home/herosec2.jpg"; // You can use any image that fits your theme

const AboutcityVision = () => {
  return (
    <Box sx={{ backgroundColor: "#F9FAFB", py: 8, px: { xs: 3, md: 10 } }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{
          color: "#1E88E5",
          fontWeight: 700,
          textAlign: "center",
          mb: 5,
          letterSpacing: 1,
        }}
      >
        About CityVision
      </Typography>

      {/* Intro Section */}
      <Grid
        container
        spacing={5}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 8 }}
      >
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            sx={{
              textAlign: "justify",
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#333",
            }}
          >
            <b>CityVision</b> is a Smart City Citizen Portal designed to connect
            people and government seamlessly. It empowers citizens to report
            urban issues, view them on a live map, and track their resolution in
            real-time. The platform bridges the gap between civic authorities
            and residents, ensuring transparency and faster responses.
            <br />
            <br />
            Through CityVision, you can be an active part of the city’s
            transformation — making your neighborhood cleaner, safer, and more
            efficient. Every complaint or suggestion you share helps shape a
            smarter and more sustainable Surat.
          </Typography>
        </Grid>

        <Grid item xs={12} md={5}>
          <img
            src={CityImage}
            alt="Smart City"
            style={{
              width: "100%",
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          />
        </Grid>
      </Grid>

      {/* Mission & Vision Section */}
      <Typography
        variant="h4"
        sx={{
          color: "#1E88E5",
          fontWeight: 700,
          textAlign: "center",
            margin:"10% auto 8% auto"
        }}
      >
        Our Mission & Vision
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
          fontSize: "18px",
          lineHeight: 1.8,
          color: "#444",
          mb: 8,
        }}
      >
        CityVision aims to create a smarter, more connected city where citizens
        can easily interact with municipal services. We envision a future where
        technology strengthens civic trust, promotes transparency, and
        encourages citizen-led innovation in urban governance.
      </Typography>

      {/* Key Goals Section */}
      <Typography
        variant="h4"
        sx={{
          color: "#1E88E5",
          fontWeight: 700,
          textAlign: "center",
          margin:"10% auto 8% auto"
        }}
      >
        Our Core Goals
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {[
          {
            title: "Digital Governance",
            desc: "Simplify public interaction with transparent, tech-enabled services.",
          },
          {
            title: "Citizen Engagement",
            desc: "Encourage active participation in improving local neighborhoods.",
          },
          {
            title: "Faster Resolution",
            desc: "Ensure quick response to civic issues through efficient management.",
          },
          {
            title: "Sustainable Growth",
            desc: "Promote eco-friendly solutions for a cleaner, greener city.",
          },
        ].map((goal, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: "15px",
                height: "100%",
                backgroundColor: "white",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 30px rgba(30,136,229,0.3)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#1E88E5",
                  fontWeight: 600,
                  mb: 2,
                  letterSpacing: 0.5,
                }}
              >
                {goal.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {goal.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Closing Message */}
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          fontSize: "18px",
          mt: 8,
          color: "#333",
          maxWidth: "800px",
          margin:"10% auto 5% auto"
        }}
      >
        CityVision represents the future of citizen-driven governance — a step
        towards cleaner, faster, and more responsible city management. Together,
        we can make our city not only smart but also sustainable for generations
        to come. 🌆
      </Typography>
    </Box>
  );
};

export default AboutcityVision;
