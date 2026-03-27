import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LoginIcon from "@mui/icons-material/Login";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import TimelineIcon from "@mui/icons-material/Timeline";

const Howitwork = () => {
    const steps = [
    {
      icon: <LoginIcon sx={{ fontSize: 60, color: "#1E88E5" }} />,
      title: "Login or Sign Up",
      desc: "Create your citizen account or log in to start using CityVision.",
    },
    {
      icon: <ReportProblemIcon sx={{ fontSize: 60, color: "#1E88E5" }} />,
      title: "Report an Issue",
      desc: "Easily report any city issue with image, location, and description.",
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 60, color: "#1E88E5" }} />,
      title: "Track Progress",
      desc: "Check live status updates and resolution of your complaints anytime.",
    },
  ];
  return (
    <div>
        <Box
      sx={{
        py: 8,
        px: { xs: 2, sm: 6, md: 10 },
        backgroundColor: "#fff",
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
        How It Works
      </Typography>

      {/* Steps Grid */}
      <Grid container spacing={5} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 25px rgba(30,136,229,0.2)",
                  "&:hover": {
                    boxShadow: "0 8px 35px rgba(30,136,229,0.4)",
                  },
                }}
              >
                {/* Step Number */}
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "#1E88E5",
                    color: "white",
                    borderRadius: "50%",
                    width: 45,
                    height: 45,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    fontWeight: "bold",
                  }}
                >
                  {index + 1}
                </Typography>

                {/* Step Icon */}
                {step.icon}

                {/* Step Title */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1E88E5",
                    mt: 2,
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  {step.title}
                </Typography>

                {/* Step Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {step.desc}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  )
}

export default Howitwork