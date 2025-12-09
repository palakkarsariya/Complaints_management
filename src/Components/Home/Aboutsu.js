import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Aboutsu = () => {
  return (
    <Box sx={{ py: 8, px: { xs: 3, md: 12 } }}>
      {/* Section Title */}
      <Typography
        variant="h4"
        sx={{
          color: "#1E88E5",
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          letterSpacing: 1,
        }}
      >
        About CityVision
      </Typography>

      {/* Content */}
      <Typography
        variant="body1"
        sx={{
          textAlign: "justify",
          fontSize: "18px",
          lineHeight: 1.8,
          color: "#333",
          mb: 4,
        }}
      >
        <b>CityVision</b> is a Smart City Citizen Portal designed to bridge the
        gap between citizens and the municipal authorities. Our mission is to
        make urban life more efficient, transparent, and citizen-centric by
        enabling people to report civic issues, monitor their resolution, and
        contribute actively to city improvement.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "justify",
          fontSize: "18px",
          lineHeight: 1.8,
          color: "#333",
          mb: 4,
        }}
      >
        With CityVision, citizens can easily report problems like potholes,
        broken streetlights, water leaks, or waste management issues through an
        interactive and user-friendly platform. Each report is mapped
        geographically, helping the city administration respond faster and plan
        more effectively.
      </Typography>

      {/* Key Objectives */}
      <Typography
        variant="h6"
        sx={{
          color: "#1E88E5",
          fontWeight: 600,
          mt: 4,
          mb: 2,
        }}
      >
        Our Key Objectives:
      </Typography>

      <ul style={{ fontSize: "17px", lineHeight: "2", color: "#444" }}>
        <li>Promote digital governance and citizen participation</li>
        <li>Enhance transparency in issue tracking and resolution</li>
        <li>Encourage cleaner, greener, and smarter urban environments</li>
        <li>Provide real-time communication between citizens and authorities</li>
        <li>Support sustainable development through data-driven insights</li>
      </ul>

      <Typography
        variant="body1"
        sx={{
          textAlign: "justify",
          fontSize: "18px",
          lineHeight: 1.8,
          color: "#333",
          mt: 4,
        }}
      >
        <b>CityVision</b> is more than just a reporting tool — it’s a step
        toward smarter urban living where citizens play an active role in
        shaping the city’s future. Together, we can build a connected,
        responsive, and sustainable city for everyone.
      </Typography>
    </Box>
  );
};

export default Aboutsu;
