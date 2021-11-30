import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
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
        <BrowserRouter>
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
            <Main />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Box>
  );
}

export default App;
