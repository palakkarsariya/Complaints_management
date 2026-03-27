import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { motion } from "framer-motion"; 

const Section = () => {
  const features = [
    {
      title: "Report Issues",
      desc: "Easily report civic problems with photos and location data for faster resolution.",
    },
    {
      title: "Track Progress",
      desc: "Stay updated with real-time status tracking of your submitted complaints.",
    },
    {
      title: "City Map",
      desc: "Explore the interactive map to view and monitor all reported issues across the city.",
    },
    {
      title: "Community Feedback",
      desc: "Share your thoughts, give feedback, and help improve city governance.",
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, sm: 6, md: 10 },
      }}
    >
      {/* Section Title */}
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
        Our Smart City Features
      </Typography>

      {/* Feature Cards */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {/* Animated Paper Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Paper
                elevation={5}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 25px rgba(30,136,229,0.3)",
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
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {item.desc}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;
