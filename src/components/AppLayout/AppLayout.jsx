import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import AppBar from "./AppBar";
import MainRoutes from "../../routes/MainRoutes";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const fixedSidebar = useMediaQuery((theme) => theme.breakpoints.up("xl"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar
          open={open}
          handleDrawerClose={handleDrawerClose}
          drawerProps={{ variant: fixedSidebar ? "permanent" : "temporary" }}
        />
        <Box
          sx={{
            display: "flex",
            flex: "1",
            overflowY: "auto",
            flexDirection: "column",
          }}
        >
          {!fixedSidebar && <AppBar handleDrawerOpen={handleDrawerOpen} />}
          <Box
            component="main"
            sx={{
              display: "flex",
              flexGrow: 1,
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            <MainRoutes />
          </Box>
        </Box>
      </Box>
    </>
  );
}
