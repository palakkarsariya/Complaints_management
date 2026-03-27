import React from "react";
import { Drawer, List, ListItemButton, ListItemText, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("department");
    localStorage.removeItem("zone");

    navigate("/login");
  };

  return (

    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 220,
          boxSizing: "border-box",
          background: "#0D47A1",
          color: "white",
          display: "flex",
          justifyContent: "space-between"
        }
      }}
    >

      {/* Top Menu */}

      <Box>

        <Box sx={{ p: 3, fontSize: "20px", fontWeight: "bold" }}>
          Department Panel
        </Box>

        <List>

          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/complaints")}>
            <ListItemText primary="Complaints" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/map")}>
            <ListItemText primary="Map Dashboard" />
          </ListItemButton>

        </List>

      </Box>

      {/* Logout Button */}

      <Box sx={{ p: 2 }}>

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogout}
          sx={{
            background: "#E53935",
            "&:hover": { background: "#C62828" }
          }}
        >
          Logout
        </Button>

      </Box>

    </Drawer>

  );

};

export default Sidebar;