import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function AppBar({ handleDrawerOpen }) {
  return (
    <MuiAppBar
      position="sticky"
      sx={{
        ".MuiTypography-root": {
          fontFamily: (theme) => theme.typography.titleFontFamily,
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="h1">
          GapFind
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
