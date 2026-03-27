import React from "react";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MapIcon from "@mui/icons-material/Map";
import PeopleIcon from "@mui/icons-material/People";
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from "@mui/icons-material/Logout";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Nav = () => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/dash" },
    { text: "Reported Issues", icon: <ReportProblemIcon />, link: "/report" },
    { text: "Map Overview", icon: <MapIcon />, link: "/map" },
    { text: "Department User", icon: <PeopleIcon />, link: "/depuser" },
    { text: "Users", icon: <PeopleIcon />, link: "/users" },
    { text: "Messages", icon: <MessageIcon />, link: "/messages" },
    { text: "Review", icon: <ReviewsIcon />, link: "/reviews" },
    { text: "Logout", icon: <LogoutIcon />, link: "/" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1E88E5",
          color: "white",
          border: "none",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, textAlign: "center", fontWeight: "bold" }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          CityVision Admin
        </Typography>
      </Box>

      {/* Menu List */}
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            component={Link}
            to={item.link}
            sx={{
              "&:hover": {
                backgroundColor: "#00E5FF",
                color: "black",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Nav;
