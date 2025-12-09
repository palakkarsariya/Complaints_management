import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import logo1 from "../Assets/img/logo1.png";

const pages = [
  { name: "Home", path: "/" },
  { name: "About CityVision", path: "/about" },
  { name: "Report Issue", path: "/report" },
  { name: "Map Dashboard", path: "/map" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#F4F8FB",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        zIndex: 1000,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", alignItems: "center" }}>
          {/* ✅ Logo Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 3,
            }}
          >
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <img
                src={logo1}
                alt="CityVision Logo"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  marginRight: "10px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#1E88E5",
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                CityVision
              </Typography>
            </Link>
          </Box>

          {/* Mobile Menu (Hamburger) */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "#1E88E5" }} />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page.path}
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to="/login"
                  sx={{
                    fontWeight: 600,
                    color: "#1E88E5",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* ✅ Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 4,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "16px",
                  transition: "0.3s ease",
                  "&:hover": {
                    color: "#1E88E5",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* ✅ Login Button (Right End) */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{
                backgroundColor: "#1E88E5",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "10px",
                px: 4,
                py: 1,
                fontSize: "16px",
                boxShadow: "0 4px 10px rgba(30,136,229,0.3)",
                "&:hover": {
                  backgroundColor: "#00E5FF",
                  color: "black",
                  boxShadow: "0 6px 15px rgba(0,229,255,0.4)",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
