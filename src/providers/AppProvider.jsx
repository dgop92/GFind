import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { lightThemeOptions } from "../styles/theme";

const theme = createTheme(lightThemeOptions);

export function AppProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
}
