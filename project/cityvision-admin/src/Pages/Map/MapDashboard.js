import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapDashboard = () => {
  const [issues, setIssues] = useState([]);

  // Fetch Complaints from API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // Make sure backend returns ARRAY directly (not nested)
        const response = await axios.get("http://localhost:1300/api/Comp/getall");
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Dynamic marker color
  const getMarkerColor = (status) => {
    switch (status) {
      case "Resolved":
        return "28a745"; // green
      case "In Progress":
        return "ffa500"; // orange
      default:
        return "ff0000"; // red
    }
  };

  // Create category icon with emoji
  const getCategoryIcon = (category, color) => {
    const emojiMap = {
      Garbage: "🗑️",
      Pothole: "🕳️",
      "Water Leak": "💧",
      Streetlight: "💡",
      Traffic: "🚦",
      Drainage: "🚰",
      Tree: "🌳",
      Animal: "🐕",
      default: "📍",
    };

    const emoji = emojiMap[category] || emojiMap.default;

    return L.divIcon({
      html: `<div style="
        font-size: 26px;
        text-align: center;
        line-height: 24px;
        color: ${color};
        text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
      ">${emoji}</div>`,
      className: "",
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F4F8FB",
        py: 6,
        px: { xs: 2, md: 10 },
        marginLeft: "180px",
      }}
    >
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
        CityVision Map Dashboard
      </Typography>

      <Paper
        elevation={5}
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 25px rgba(30,136,229,0.2)",
        }}
      >
        <MapContainer
          center={[21.1702, 72.8311]} // Surat
          zoom={12}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render all complaint markers */}
          {issues.map(
            (issue) =>
              issue.latitude &&
              issue.longitude && (
                <Marker
                  key={issue._id}
                  position={[issue.latitude, issue.longitude]}
                  icon={getCategoryIcon(
                    issue.category,
                    getMarkerColor(issue.status)
                  )}
                >
                  <Popup>
                    <Box sx={{ width: "200px", textAlign: "center" }}>
                      {issue.image && (
                        <img
                          src={issue.image}
                          alt={issue.category}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            marginBottom: "10px",
                          }}
                        />
                      )}

                      <Typography
                        variant="h6"
                        sx={{ fontSize: "16px", fontWeight: 600, color: "#1E88E5" }}
                      >
                        {issue.category}
                      </Typography>

                      <Typography sx={{ fontSize: "14px", mb: 1 }}>
                        {issue.description}
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 700,
                          color:
                            issue.status === "Resolved"
                              ? "green"
                              : issue.status === "Pending"
                              ? "red"
                              : "#FF8C00",
                        }}
                      >
                        {issue.status}
                      </Typography>
                    </Box>
                  </Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </Paper>
    </Box>
  );
};

export default MapDashboard;
