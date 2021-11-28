import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { lightThemeOptions } from "../styles/theme";
import Sidebar from "./base/Sidebar";
import AppBar from "./base/AppBar";
import Main from "./base/Main";

const theme = createTheme(lightThemeOptions);

function App() {
  const [open, setOpen] = useState(false);
  const fixedSidebar = useMediaQuery(theme.breakpoints.up("xl"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Sidebar
          open={open}
          handleDrawerClose={handleDrawerClose}
          drawerProps={{ variant: fixedSidebar ? "permanent" : "temporary" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            overflowY: "auto",
          }}
        >
          {!fixedSidebar && <AppBar handleDrawerOpen={handleDrawerOpen} />}
          <Main />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
