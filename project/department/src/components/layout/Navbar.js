import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (
    <AppBar position="static">

      <Toolbar>

        <Typography sx={{ flexGrow: 1 }}>
          CityVision Department Dashboard
        </Typography>

        <Button color="inherit" onClick={logout}>
          Logout
        </Button>

      </Toolbar>

    </AppBar>
  );
};

export default Navbar;